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
2. Ajouter le frontmatter avec le titre, la date, l'image de couverture, une description naturelle et une intention de recherche formulée comme une question ou un besoin réel
3. Écrire le contenu de l'article en Markdown

### Métadonnées éditoriales

Les articles utilisent désormais `searchIntent` au lieu de l'ancien champ `keywords`. Ce champ doit décrire la recherche à laquelle l'article répond, par exemple :

```yaml
description: "Guide pratique pour migrer une boutique PrestaShop vers un nouveau domaine."
searchIntent: "Comment changer le nom de domaine d'une boutique PrestaShop sans perdre son référencement ?"
tags: ["tutoriel", "dev"]
```

Les tags servent à relier les articles entre eux. Les pages thématiques disponibles sont `/themes/tutoriels`, `/themes/apple`, `/themes/developpement`, `/themes/afrique-numerique` et `/themes/opinions`.

## Déploiement

Le site est configuré pour être déployé sur Vercel. Chaque push sur la branche principale déclenche un nouveau déploiement.

## Maintenance

- Mettre à jour les dépendances régulièrement avec `yarn upgrade`
- Vérifier les performances et l'accessibilité du site
- Maintenir les traductions à jour dans les fichiers de langue
