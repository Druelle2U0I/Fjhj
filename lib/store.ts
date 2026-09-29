import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://api.github.com";

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export function githubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY ?? "Druelle2U0I/Fjhj";
  if (!token) return null;
  const [owner, repo] = repository.split("/");
  if (!owner || !repo) return null;
  return {
    token,
    owner,
    repo,
    branch: process.env.GITHUB_BRANCH ?? "main",
  };
}

async function githubRequest(
  config: GitHubConfig,
  endpoint: string,
  init?: RequestInit,
) {
  return fetch(`${API}/repos/${config.owner}/${config.repo}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
    cache: "no-store",
  });
}

async function currentSha(config: GitHubConfig, filePath: string) {
  const res = await githubRequest(
    config,
    `/contents/${encodeURIComponent(filePath).replace(/%2F/g, "/")}?ref=${config.branch}`,
  );
  if (res.status === 404) return undefined;
  if (!res.ok) {
    throw new Error(`Lecture de ${filePath} impossible (${res.status})`);
  }
  const body = (await res.json()) as { sha?: string };
  return body.sha;
}

export class ConflictError extends Error {}

/**
 * Lit la version à jour d'un fichier du dépôt (et son identifiant de
 * version, « sha »). En local, ou sans jeton, renvoie null : l'appelant se
 * rabat alors sur le contenu embarqué dans le site.
 */
export async function readFile(filePath: string): Promise<{ text: string; sha: string } | null> {
  if (process.env.NODE_ENV !== "production") return null;
  const config = githubConfig();
  if (!config) return null;
  const res = await githubRequest(
    config,
    `/contents/${encodeURIComponent(filePath).replace(/%2F/g, "/")}?ref=${config.branch}`,
  );
  if (!res.ok) return null;
  const body = (await res.json()) as { sha?: string; content?: string; encoding?: string };
  if (!body.sha || !body.content) return null;
  return { text: Buffer.from(body.content, "base64").toString("utf8"), sha: body.sha };
}

/**
 * En production le contenu vit dans le dépôt : chaque enregistrement est un
 * commit, qui déclenche un redéploiement Vercel. En développement local il
 * n'y a pas de jeton, on écrit donc directement le fichier.
 */
export async function commitFile(
  filePath: string,
  content: Buffer,
  message: string,
  // Version sur laquelle s'appuie l'enregistrement : si le fichier a été
  // modifié depuis (autre onglet, autre personne, mise à jour du site),
  // GitHub refuse et on lève ConflictError au lieu d'écraser.
  baseSha?: string,
) {
  if (process.env.NODE_ENV !== "production") {
    const target = path.join(process.cwd(), filePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
    return { mode: "local" as const };
  }

  const config = githubConfig();
  if (!config) {
    throw new Error(
      "GITHUB_TOKEN absent : impossible d'enregistrer les modifications.",
    );
  }

  const sha = baseSha ?? (await currentSha(config, filePath));
  const res = await githubRequest(
    config,
    `/contents/${encodeURIComponent(filePath).replace(/%2F/g, "/")}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: content.toString("base64"),
        branch: config.branch,
        sha,
      }),
    },
  );

  if (baseSha && (res.status === 409 || res.status === 422)) {
    throw new ConflictError("Le site a été modifié depuis l'ouverture de cette page.");
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub a refusé l'enregistrement (${res.status}) ${detail.slice(0, 200)}`);
  }

  const body = (await res.json().catch(() => ({}))) as { content?: { sha?: string } };
  return { mode: "github" as const, sha: body.content?.sha };
}
