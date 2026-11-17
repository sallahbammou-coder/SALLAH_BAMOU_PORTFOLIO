# Portfolio — Sallah Bamou

## Ouvrir le site

Décompresser l’archive. Sous Windows, double-cliquer sur **Ouvrir-portfolio.cmd** (Node.js 22 ou plus récent requis). L’aperçu ouvre le navigateur. Il fonctionne sans connexion Internet et sans installation de bibliothèques. Fermer la fenêtre de l’aperçu quand la visite est terminée.

Sur macOS ou Linux, exécuter `node preview.mjs`, puis ouvrir l’adresse indiquée dans le terminal. Le dossier `site/` contient le site déjà compilé, avec l’original du CV.

## Personnaliser ou reconstruire

- `content/profile.ts` : coordonnées, expériences, formation et compétences, vérifiées dans le CV.
- `content/projects.ts` : cinq études, contributions et étapes, d’après le brief. Les schémas illustrent les méthodes, à partir de dossiers anonymisés et sans données financières réelles.
- `components/Portfolio.tsx` : textes éditoriaux et interactions, en français et en anglais.
- `components/Scene.tsx`, `Schema.tsx` et `diagrams.ts` : scènes Three.js chargées à la demande et schémas équivalents sans WebGL. Les commandes des schémas restent accessibles au clavier. Une commande arrête les animations et la préférence système de mouvement réduit est prise en compte.
- `public/Sallah-Bamou-CV.pdf` : PDF original.

Avec Node.js 22 ou ultérieur, exécuter `npm ci`, puis `npm run dev` pour modifier le site (ouvrir le chemin `/fr/`). Exécuter `npm run build` pour régénérer la version statique dans `out/`. L’archive ne contient pas les dépendances de développement.

## Héberger

Déployer le **contenu** du dossier `site/` (ou de `out/` après reconstruction) à la racine d’un hébergement HTTPS pour sites statiques. Les deux versions se trouvent à `/fr/` et `/en/`. Configurer l’hébergeur pour servir l’index des sous-dossiers et rediriger `/` vers `/fr/` en HTTP si possible. Le fichier d’accueil inclus fournit une redirection de secours. Pour utiliser les URL canoniques et les liens de langue dans les métadonnées, définir `SITE_URL` à l’URL de production avant la compilation.

Le formulaire vérifie les champs et prépare un brouillon dans la messagerie du visiteur. Il ne collecte ni ne stocke les messages. Les liens directs vers l’e-mail et le téléphone sont également disponibles. Pour proposer un envoi depuis le site, il faudrait choisir et autoriser un service d’envoi et configurer ses protections contre le spam. Aucun lien LinkedIn n’est affiché : le CV ne fournit pas d’URL de profil.

## Publier sur GitHub Pages

Le dépôt contient le workflow `.github/workflows/deploy.yml`. Dans **Settings → Pages**, sélectionnez **GitHub Actions** comme source. Le workflow compile et publie automatiquement le site à chaque mise à jour de la branche `main`. L’adresse de l’aperçu apparaît dans **Settings → Pages** une fois le premier déploiement terminé. Le dépôt public et l’adresse publiée rendent le CV et les coordonnées visibles à tous. L’utilisation de Pages avec un dépôt privé dépend du forfait GitHub.

## Parcours de visite

| Section | Ce que le visiteur peut explorer |
| --- | --- |
| Accueil | Gyroscope Financial Core : orientation au survol et au défilement ; rendu fixe en mode sans animation. |
| The Audit Lab | Cinq dossiers : chaîne comptable, audit comparatif, trois exercices, note de synthèse, architecture de données. |
| Parcours | Repères de Tanger à Pau, détail des trois expériences et cinq étapes de formation. |
| Compétences | Carte de cinq domaines avec renvois vers les études ou expériences correspondantes. |
| Alternance et contact | Disponibilité, rythme et mobilité, CV PDF, téléphone et brouillon e-mail. |
