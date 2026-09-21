import { writeFile } from "node:fs/promises";
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

/**
 * En production le contenu vit dans le dépôt : chaque enregistrement est un
 * commit, qui déclenche un redéploiement Vercel. En développement local il
 * n'y a pas de jeton, on écrit donc directement le fichier.
 */
export async function commitFile(
  filePath: string,
  content: Buffer,
  message: string,
) {
  if (process.env.NODE_ENV !== "production") {
    await writeFile(path.join(process.cwd(), filePath), content);
    return { mode: "local" as const };
  }

  const config = githubConfig();
  if (!config) {
    throw new Error(
      "GITHUB_TOKEN absent : impossible d'enregistrer les modifications.",
    );
  }

  const sha = await currentSha(config, filePath);
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

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub a refusé l'enregistrement (${res.status}) ${detail.slice(0, 200)}`);
  }

  return { mode: "github" as const };
}
