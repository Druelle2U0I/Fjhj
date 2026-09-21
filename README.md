# ENMA Formation — Site vitrine

Site vitrine pour ENMA Formation, construit avec Next.js (App Router),
TypeScript, Tailwind CSS et Framer Motion pour les animations.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `content/site.json` — tout le contenu du site (secteurs, formations,
  équipe, coordonnées). C'est ce fichier qu'édite l'espace d'administration.
- `lib/data.ts` — charge `content/site.json` et calcule les adresses de page
- `app/page.tsx` — assemble les sections de la page d'accueil
- `app/formations/` — catalogue, pages secteur et fiches formation
- `app/admin/` + `components/admin/` — espace d'administration
- `app/api/contact/route.ts` — API qui envoie les messages du formulaire de
  contact par email via [Resend](https://resend.com)

## Espace d'administration

L'espace `/admin`, protégé par mot de passe, permet de modifier le contenu
sans toucher au code : coordonnées, secteurs et formations (ajout,
suppression, réordonnancement, textes, programme), équipe, financement,
page d'accueil, accessibilité, et envoi de photos.

Chaque publication écrit `content/site.json` dans le dépôt via l'API GitHub.
Ce commit déclenche un redéploiement : les modifications sont visibles en
ligne au bout d'une à deux minutes.

Deux variables d'environnement sont nécessaires :

- `ADMIN_PASSWORD` — le mot de passe d'accès à `/admin`
- `GITHUB_TOKEN` — un jeton GitHub à portée fine, limité à ce dépôt, avec la
  permission *Contents* en lecture et écriture

Facultatif : `GITHUB_REPOSITORY` (par défaut `Druelle2U0I/Fjhj`) et
`GITHUB_BRANCH` (par défaut `main`).

Après avoir ajouté ou modifié ces variables sur Vercel, il faut redéployer :
elles sont injectées au moment de la construction, pas lues en continu.

En développement local, aucun jeton n'est requis : les publications écrivent
directement le fichier sur le disque.

## Configurer l'envoi d'email du formulaire de contact

1. Créer un compte sur [resend.com](https://resend.com) et récupérer une clé
   API.
2. Copier `.env.example` vers `.env.local` et renseigner :
   - `RESEND_API_KEY` — la clé API Resend
   - `CONTACT_EMAIL` — l'adresse qui doit recevoir les messages
   - `CONTACT_FROM` (optionnel) — adresse d'expédition, doit appartenir à un
     domaine vérifié sur Resend (sinon garder `onboarding@resend.dev` pour
     les tests)
3. Redémarrer le serveur.

Tant que ces variables ne sont pas configurées, le formulaire affiche un
message d'erreur clair au lieu d'échouer silencieusement.

## Personnaliser le contenu

- Textes, formations, équipe, coordonnées : espace `/admin`, ou directement
  `content/site.json`
- Couleurs (palette de marque) : `app/globals.css`
- Métadonnées SEO (titre, description) : `app/layout.tsx`

## Déploiement

Hébergé sur [Vercel](https://vercel.com), déployé automatiquement à chaque
envoi sur `main`. Variables d'environnement à renseigner dans les réglages
du projet : `ADMIN_PASSWORD`, `GITHUB_TOKEN`, `RESEND_API_KEY`,
`CONTACT_EMAIL`, `CONTACT_FROM`.
