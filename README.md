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

- `app/page.tsx` — assemble les sections de la page d'accueil
- `components/` — Header, Hero, About, Services, Team, Contact, Footer
- `lib/data.ts` — contenu du site (formations, équipe, coordonnées) à
  personnaliser
- `app/api/contact/route.ts` — API qui envoie les messages du formulaire de
  contact par email via [Resend](https://resend.com)

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

- Textes, formations, équipe, coordonnées : `lib/data.ts`
- Couleurs (palette, accent, mode sombre) : `app/globals.css`
- Métadonnées SEO (titre, description) : `app/layout.tsx`

## Déploiement

Le plus simple est [Vercel](https://vercel.com/new) : connecter le dépôt
GitHub, renseigner les variables d'environnement (`RESEND_API_KEY`,
`CONTACT_EMAIL`, `CONTACT_FROM`) dans les réglages du projet, puis déployer.
