# Le Blog de Jean-Luc Houédanou

Ce projet est un blog personnel construit avec Nuxt 3, utilisant le système de gestion de contenu Nuxt Content pour les articles.

## Technologies utilisées

- Nuxt 3
- Nuxt Content
- Vue.js 3
- SCSS pour le styling
- i18n pour l'internationalisation
- nuxt-feedme pour la génération du flux RSS

## Structure du projet

- `content/`: Contient les articles du blog en format Markdown
- `pages/`: Les pages du site, y compris la page d'accueil et le template d'article
- `components/`: Composants Vue réutilisables
- `layouts/`: Layouts pour les différentes pages
- `assets/`: Fichiers statiques comme les images et les styles globaux
- `lang/`: Fichiers de traduction pour l'internationalisation

## Fonctionnalités

- Articles de blog écrits en Markdown
- Support multilingue (Français et Anglais)
- Génération automatique du flux RSS
- Optimisation SEO
- Intégration de Google Analytics
- Boutons de partage social

## Comment démarrer

1. Cloner le repository
2. Installer les dépendances : `yarn install`
3. Lancer le serveur de développement : `yarn dev`

## Ajouter un nouvel article

1. Créer deux fichiers au même nom, `content/fr/AAAAMMJJ-slug.md` et `content/en/AAAAMMJJ-slug.md` (dossiers à plat, le nom de fichier devient l'URL `/fr/AAAAMMJJ-slug`)
2. Ajouter le frontmatter avec le titre, la date, l'image de couverture, une description naturelle et une intention de recherche formulée comme une question ou un besoin réel
3. Écrire le contenu de l'article en Markdown, **sans `# Titre` en tête** : le template affiche déjà le titre en H1. Le corps commence à `##`.

### Métadonnées éditoriales

Les articles utilisent désormais `searchIntent` au lieu de l'ancien champ `keywords`. Ce champ doit décrire la recherche à laquelle l'article répond, par exemple :

```yaml
description: "Guide pratique pour migrer une boutique PrestaShop vers un nouveau domaine."
searchIntent: "Comment changer le nom de domaine d'une boutique PrestaShop sans perdre son référencement ?"
tags: ["tutoriel", "dev"]
```

Rôle de chaque champ :

- `description` : **120 à 160 caractères**. C'est la meta description (Google, og, Twitter, JSON-LD), le résumé du flux RSS et l'encadré « Résumé ».
- `searchIntent` : la question à laquelle le billet répond. Sert au classement éditorial et aux extraits des listes, pas à la meta description.
- `updatedAt` (optionnel) : à renseigner uniquement quand le fond du billet change (fait corrigé, procédure mise à jour). Alimente `dateModified` et le sitemap.
- Liens internes : `[texte](/fr/slug)` ou `[text](/en/slug)`. Liens externes à ouvrir dans un nouvel onglet : `[texte](https://…){target="_blank" rel="noopener"}`.

Les skills Claude Code `claude-blog` et `claude-seo` sont installés dans `.claude/skills` (voir `.claude/skills/VENDORED.md`) : `/blog analyze`, `/blog seo-check`, `/seo technical`, etc.

Les tags servent à relier les articles entre eux. Les pages thématiques disponibles sont `/themes/tutoriels`, `/themes/apple`, `/themes/developpement`, `/themes/afrique-numerique` et `/themes/opinions`.

## Déploiement

Le site est entièrement pré-généré (`yarn build`, soit `nuxt generate`) et
servi comme assets statiques Cloudflare depuis `dist/` (`wrangler.toml`, sans
`main`) : aucun Worker n'est invoqué, donc pas de limite de CPU. Les
redirections (`redirects.js` → `dist/_redirects`), les en-têtes
(`dist/_headers`) et la page 404 (`not_found_handling`) sont gérés au bord.

Conséquence : pas de code serveur au runtime. Tout ce qui se calcule (temps de
lecture, cartes OG, flux RSS, sitemap, robots.txt) se calcule au build. Les
règles WAF de `docs/cloudflare-waf.md` restent utiles pour filtrer les
scanners et les aspirateurs.

## Maintenance

- Mettre à jour les dépendances régulièrement avec `yarn upgrade`
- Vérifier les performances et l'accessibilité du site
- Maintenir les traductions à jour dans les fichiers de langue
