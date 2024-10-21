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

1. Créer un nouveau fichier Markdown dans le dossier `content/[langue]/[année]/[mois]/`
2. Ajouter le frontmatter avec le titre, la date, et l'image de couverture
3. Écrire le contenu de l'article en Markdown

## Déploiement

Le site est configuré pour être déployé sur Vercel. Chaque push sur la branche principale déclenche un nouveau déploiement.

## Maintenance

- Mettre à jour les dépendances régulièrement avec `yarn upgrade`
- Vérifier les performances et l'accessibilité du site
- Maintenir les traductions à jour dans les fichiers de langue
