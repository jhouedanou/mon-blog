---
title: "Vue Mastery Black Friday 2026, 70 % de réduction sur Vue.js"
createdAt: "2026-11-26T09:00:00Z"
image: "/images/articles/vue-mastery-black-friday-2026.webp"
description: "Black Friday 2026 chez Vue Mastery : 70 % de réduction sur un an de cours Vue.js. Pourquoi je m'en sers, et comment Claude s'est mis co-auteur de mes commits."
searchIntent: "Quelle est l'offre Black Friday 2026 de Vue Mastery, que contient l'abonnement, et comment retirer la ligne Co-Authored-By de Claude Code dans les commits ?"
tags: ["dev", "vue", "black friday", "Claude Code", "ia"]
---

C'est le Black Friday chez Vue Mastery, et l'offre est déjà en ligne avec [70 % de réduction sur un an d'abonnement](https://www.vuemastery.com/black-friday). Le bouton de la page annonce une économie de 210 dollars sur l'abonnement annuel.

J'en parle parce que c'est la plateforme que j'utilise pour perfectionner mon Vue.js, et parce que je ne suis pas un vibe codeur.

## L'offre Black Friday 2026 de Vue Mastery

La page de l'offre affiche 70 % de réduction sur un an, soit 210 dollars de moins sur la facture annuelle. Elle propose aussi deux lots plus chers, à 399 et 999 dollars, avec des cours avancés et des certifications sur Nuxt et Pinia.

Par contre, la page ne donne pas de date de fin. Si l'offre vous intéresse, je ne compterais pas sur la semaine prochaine.

Vue Mastery précise aussi sur [sa page de tarifs](https://www.vuemastery.com/pricing) qu'on peut demander un remboursement dans les 14 premiers jours, et qu'il existe une réduction pour les étudiants, à demander par mail.

## Ce que contient l'abonnement

D'après la page de l'offre, l'abonnement donne accès à 21 cours, 143 conférences et 73 heures de vidéo. Les cours couvrent Vue 3, la Composition API, les composables, Pinia, Vue Router, Nuxt, TypeScript, Vite et Vitest.

Deux cours sont donnés par Evan You, le créateur de Vue et de Vite, dont « Vue 3 Deep Dive with Evan You ». La plateforme indique aussi qu'une partie de l'abonnement est reversée au projet Vue.js.

Et pour ceux qui ne veulent pas payer, il y a des cours gratuits, comme « Intro to Vue 3 », « What is Pinia? » ou « What is a Composable? », et des antisèches à télécharger sur Vue 3, Nuxt, Pinia et Vue Router avec un compte gratuit.

## Pourquoi je préfère apprendre Vue

Ce blog tourne sous Nuxt, donc sous Vue, depuis que j'ai [quitté WordPress](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere). Je veux comprendre le code que je mets en ligne, et c'est pour ça que je suis des cours au lieu de demander à une IA d'écrire le site à ma place.

J'avais déjà écrit ce que je pense des [limites du vibe coding](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite). Générer du code qu'on ne sait pas lire, ça marche jusqu'au premier bug sérieux, et ce jour-là il faut bien quelqu'un qui connaît Vue.

Alors oui, je sais, j'utilise Claude moi aussi.

## Comment j'utilise Claude

Mon usage de Claude, c'est Opus, dans VS Code, et pour deux choses. Je lui donne du code qui ne marche pas pour qu'il trouve le bug, et je le laisse faire les commits automatiquement, avec le message qui va avec.

Le code, je l'écris et je le relis. Claude débogue et range l'historique Git.

## La surprise du co-auteur

C'est en relisant cet historique que j'ai eu une surprise. Au bas de mes commits, il y avait une ligne `Co-Authored-By`, avec le nom du modèle et l'adresse `noreply@anthropic.com`. Claude s'était mis en co-auteur de mon code, et sur GitHub il apparaît à côté de moi dans la liste des auteurs du commit.

Je ne lui avais rien demandé. C'est le comportement par défaut de Claude Code, et [la documentation des réglages](https://code.claude.com/docs/en/settings) le décrit avec un réglage nommé `attribution`, qui permet de changer ou de cacher cette ligne.

## Retirer Claude des co-auteurs

Pour ceux qui veulent retirer la ligne, il faut ouvrir le fichier `~/.claude/settings.json` et y ajouter ceci.

```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

La valeur vide de `commit` retire la ligne des commits, et celle de `pr` retire la mention « Generated with Claude Code » des pull requests. L'ancien réglage `includeCoAuthoredBy` existe encore, mais la documentation le marque comme obsolète.

Les commits déjà faits gardent leur co-auteur, le réglage ne vaut que pour les suivants.

## Je garde les deux

Donc voilà, je garde Vue Mastery pour apprendre et Claude pour déboguer et faire mes commits. Si vous faites du Vue ou du Nuxt et que vous voulez comprendre ce que vous déployez, [l'offre Black Friday de Vue Mastery](https://www.vuemastery.com/black-friday) est le bon moment pour vous y mettre, et les cours gratuits suffisent pour vérifier que le format vous convient avant de payer.

---
*[Jean-Luc Houédanou](https://houedanou.com)*
