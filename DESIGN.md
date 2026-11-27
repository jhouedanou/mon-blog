---
name: Le Blog de Jean-Luc Houédanou
description: Identité du CV en ligne (jhouedanou.github.io/Curriculum-vitae) appliquée au blog — bleu nuit, cuivre et lavande, Figtree serré, labels de données en monospace, angles de 4 px
colors:
  bg: "#111522"
  bg-secondary: "#161d2e"
  card: "#192236"
  elevated: "#202b43"
  ink: "#f3eee5"
  text: "#ccd0da"
  muted: "#a8adbb"
  faded: "#7c8296"
  copper-text: "#e0a083"
  copper-fill: "#c27a5b"
  copper-contrast: "#1b1420"
  lavender: "#8994e4"
  lavender-text: "#b8beff"
  light-bg: "#f3f4f8"
  light-ink: "#111522"
  light-copper-text: "#984c28"
  light-lavender-text: "#3f4aab"
typography:
  wordmark:
    fontFamily: "Caprasimo, Georgia, serif"
    fontSize: "1.12rem"
    fontWeight: 400
  title-home:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 2.2vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title-article:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.2vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  h2:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body-article:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.78
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  data-label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  base: "4px"
  hero-image: "12px 44px 12px 44px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  wrap: "1240px"
  header: "72px"
  reading-column: "640px"
components:
  button-primary:
    backgroundColor: "{colors.copper-fill}"
    textColor: "{colors.copper-contrast}"
    rounded: "{rounded.base}"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid rgba(243, 238, 229, 0.28)"
    rounded: "{rounded.base}"
    height: "44px"
  chip:
    fontFamily: "{typography.data-label.fontFamily}"
    border: "1px solid rgba(243, 238, 229, 0.14)"
    rounded: "{rounded.base}"
    height: "32px"
  card:
    background: "linear-gradient(135deg, {colors.card}, {colors.bg-secondary})"
    border: "1px solid rgba(243, 238, 229, 0.14)"
    rounded: "{rounded.base}"
  panel-copper:
    backgroundColor: "rgba(194, 122, 91, 0.16)"
    border: "1px solid rgba(194, 122, 91, 0.42)"
  panel-lavender:
    backgroundColor: "rgba(137, 148, 228, 0.14)"
    border: "1px solid rgba(137, 148, 228, 0.42)"
  site-header:
    backgroundColor: "rgba(17, 21, 34, 0.86)"
    height: "72px"
---

# Design System : Le Blog de Jean-Luc Houédanou

## Overview

Le blog reprend le monde visuel du CV en ligne,
[jhouedanou.github.io/Curriculum-vitae](https://jhouedanou.github.io/Curriculum-vitae/).
Les deux sites se renvoient l'un à l'autre : l'encadré « Carnet de bord » du CV
mène au blog, le bouton « CV » de l'en-tête et l'encadré du pied de page du blog
mènent au CV.

- Mode impeccable : **Read** pour les billets (comprendre, lire longtemps),
  **Persuade** léger pour l'accueil (choisir un billet).
- Le logo (`/favicon-96x96.png`, monogramme JL) reste celui du blog. Il est
  incliné de -3°, comme le monogramme « JLH » du CV.
- Sombre par défaut, comme le CV. Le bouton de l'en-tête passe en clair pour
  la visite (sessionStorage, clé `theme-override` = `light`).

Sources : `assets/custom.scss` (jetons), `components/SiteHeader.vue`,
`layouts/default.vue`, `components/ArticleList.vue`, `pages/[...slug].vue`.

## Colors

Trois couleurs, comme sur le CV : bleu nuit (fond), cuivre (action et
emphase), lavande (données et repères). Les photos gardent leurs couleurs.

### Cuivre

- `--accent` : cuivre pour le texte et les filets (`#e0a083` en sombre, 8,2:1 ;
  `#984c28` en clair, 5,6:1).
- `--accent-fill` : aplat des boutons (`#c27a5b`), toujours avec
  `--accent-contrast` (`#1b1420`) dessus, 5,4:1.
- Ne jamais poser du texte sombre sur `--accent` : utiliser `--accent-fill`.

### Lavande

- `--accent-2-text` : dates, temps de lecture, labels, survols des étiquettes
  (`#b8beff` en sombre, 10,3:1 ; `#3f4aab` en clair, 6,9:1).
- `--accent-2` : pastilles, focus du champ de recherche, barre de défilement.

### Neutres

`--text-primary` (titres), `--text-secondary` (texte des billets, 11,2:1),
`--text-muted` (résumés, chapôs, 8,0:1). `--text-faded` ne sert jamais au texte.

### Named Rules

- **Priorité au contenu, pas à l'auteur.** Le nom de l'auteur n'est jamais
  mis en vedette (pas de nom géant en ouverture). Le titre de l'accueil garde
  le texte « Le blog de Jean-Luc Houédanou » pour le SEO, en petit : c'est le
  texte du h1 qui compte, pas sa taille.
- **Une seule action en cuivre plein par zone.** En-tête : « CV ↗ ». Pied de
  page : « Voir mon CV ». Le reste est en contour.
- **La lavande dit « donnée ».** Une date, une durée, un compteur, un label de
  section sont en mono lavande.

## Typography

- **Figtree** (400–700) pour tout : titres, texte, boutons.
- **Caprasimo** uniquement pour le nom « Jean-Luc Houédanou » dans l'en-tête et
  le pied de page, comme sur le CV.
- **JetBrains Mono** pour les données : dates, temps de lecture, étiquettes,
  compteurs, labels de colonnes.

### Hierarchy

| Rôle | Taille | Graisse | Interlettrage |
|---|---|---|---|
| Titre d'accueil | clamp(1.45rem, 2.2vw, 1.85rem) | 600 | -0.03em |
| Titre de billet | clamp(2.2rem, 4.2vw, 3.75rem) | 600 | -0.04em |
| H2 de billet | 1.85rem | 600 | -0.035em |
| Texte de billet | 1.1875rem / 1.78 | 400 | normal |
| Label de données | 0.72rem, capitales | 600 | 0.1em |

### Named Rules

- **Interlettrage plancher : -0.04em.** Le CV descend à -0.06em ; le blog
  s'arrête à -0.04em pour la lisibilité des longs titres.
- **Fer à gauche.** Plus de texte justifié dans les billets.
- **Colonne de lecture : 640 px**, soit 70 à 78 signes par ligne.
- **Espace fine insécable avant « : ; ! ? »** dans les titres français
  affichés (`utils/typography.js`). Le texte source n'est pas modifié.

## Layout

- Largeur max : 1240 px (`--wrap`), gouttière `--gutter`.
- Accueil : ouverture courte (titre du blog en petit, phrase de présentation,
  recherche, ligne de thèmes), puis billet à la une et grille de cartes (3, 2
  puis 1 colonne). Le premier billet est visible dès le premier écran. Un bouton « Afficher plus » remplace le
  défilement infini, pour que le pied de page reste atteignable.
- Billet : visuel à gauche et titre à droite, puis sommaire à gauche et texte
  à droite. Sous 1150 px, le sommaire devient un bouton flottant.

## Elevation & Depth

Bordures de 1 px plutôt qu'ombres. Une ombre douce seulement au survol des
cartes et sous le bouton cuivre. Pas de verre décoratif, sauf l'en-tête
(lisibilité au-dessus du contenu).

## Shapes

- 4 px partout (`--radius`).
- Exception : le visuel d'ouverture des billets a les coins asymétriques du
  portrait du CV (12 / 44 px) et un cadre cuivre décalé derrière lui.
- Fond : la grille de 72 px du CV, lignes lavande à 6 %.

## Components

- **Boutons** : `.btn.btn--primary` (aplat cuivre) et `.btn.btn--secondary`
  (contour), 44 px de haut.
- **Étiquettes** : `.chip` (neutre, survol lavande) et `.chip--copper`.
- **Cartes de billet** : vignette 16:10, filet, métadonnées mono, titre,
  extrait sur 3 lignes.
- **Encadrés** : cuivre (Résumé, encadré CV du pied de page), lavande
  (citations). Bordure complète, jamais de filet sur un seul côté.
- **Sommaire** : pastilles, comme le menu latéral du CV ; la pastille de la
  section lue est pleine.
- **Images** : toutes portent un `alt` et un `title` terminés par « - Le Blog de
  Jean-Luc Houédanou » (« - Jean-Luc Houédanou's Blog » sur les pages `/en`), via
  `useImageText()` (`composables/useImageText.js`, `utils/image-text.js`). Les vignettes
  sont de vraies `<img class="thumb-img">` (plus de `background-image`), pour porter
  ce texte. Choix de l'auteur, fait en connaissance du risque de répétition.
- **Modes immersifs** : `/vr` (galerie A-Frame adaptée de celle du CV, `utils/vr-gallery.js`)
  et `/blogvision` (tunnel en CSS 3D). Pages plein écran (`definePageMeta({ immersive: true })`),
  sans en-tête ni pied de page, avec leur barre `.mode-bar`. Un clic sur une miniature ouvre
  `ArticleSheet`. Elles sont en `noindex, follow` et hors sitemap : ce sont d'autres vues des
  mêmes articles. Boutons d'accès en contour lavande dans l'en-tête, avant « CV ».
- **Icônes** : Material Symbols, sous-ensemble chargé par `icon_names` dans
  `nuxt.config.js`. Ajouter toute nouvelle icône à cette liste triée ;
  `scripts/check-icons.mjs` bloque le build sinon.

## Do's and Don'ts

- Faire : garder les dates et les durées en mono lavande.
- Faire : vérifier le contraste dans les deux thèmes (4,5:1 pour le texte).
- Ne pas faire : un filet coloré sur un seul côté d'un bloc.
- Ne pas faire : du texte justifié, des titres en italique.
- Ne pas faire : un deuxième bouton cuivre plein dans la même zone.
- Ne pas faire : des emoji à la place d'icônes.
