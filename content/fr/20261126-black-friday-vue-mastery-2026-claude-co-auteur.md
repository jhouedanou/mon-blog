---
title: "Vue Mastery Black Friday 2026, 70 % de réduction sur Vue.js"
createdAt: "2026-11-26T09:00:00Z"
image: "/images/articles/vue-mastery-black-friday-2026.webp"
description: "Black Friday 2026 chez Vue Mastery : 70 % de réduction sur un an de cours Vue.js. Pourquoi je m'en sers, et comment Claude s'est mis co-auteur de mes commits."
searchIntent: "Quelle est l'offre Black Friday 2026 de Vue Mastery, que contient l'abonnement, et comment retirer la ligne Co-Authored-By de Claude Code dans les commits ?"
tags: ["dev", "vue", "black friday", "Claude Code", "ia"]
---

C'est le Black Friday, et dans le lot il y a une promotion qui me concerne. Vue Mastery, la plateforme que j'utilise pour perfectionner mon Vue.js, affiche [70 % de réduction sur un an d'abonnement](https://www.vuemastery.com/black-friday), soit 210 dollars de moins d'après le bouton de la page.

J'en parle parce que ce blog tourne sous Nuxt, donc sous Vue, et parce que je ne suis pas un vibe codeur. Je parle aussi de Claude plus bas, puisqu'il s'est mis co-auteur de mes commits sans me demander mon avis.

## L'offre Black Friday 2026 de Vue Mastery

L'offre est déjà en ligne, avec 70 % de réduction sur l'abonnement annuel. La page propose aussi deux lots plus chers, à 399 et 999 dollars, avec des cours avancés et des certifications sur Nuxt et Pinia.

Par contre, elle ne donne aucune date de fin, donc si l'offre vous intéresse, je ne compterais pas sur la semaine prochaine.

Vue Mastery indique aussi sur [sa page de tarifs](https://www.vuemastery.com/pricing) qu'on peut demander un remboursement dans les 14 premiers jours, et qu'il existe une réduction pour les étudiants, à demander par mail.

## Ce qu'il y a dans l'abonnement

La page annonce 21 cours, 143 conférences et 73 heures de vidéo, sur Vue 3, la Composition API, les composables, Pinia, Vue Router, Nuxt, TypeScript, Vite et Vitest. Deux cours sont donnés par Evan You, le créateur de Vue et de Vite, dont « Vue 3 Deep Dive with Evan You », et la plateforme précise qu'une partie de l'abonnement est reversée au projet Vue.js.

Et si vous ne voulez pas payer, il y a des cours gratuits comme « Intro to Vue 3 », « What is Pinia? » ou « What is a Composable? », et avec un compte gratuit on peut télécharger des antisèches sur Vue 3, Nuxt, Pinia et Vue Router.

## Pourquoi je préfère apprendre Vue

Pendant longtemps, [je ne voulais pas de l'IA](/fr/20261016-pourquoi-lia-ne-me-remplacera-pas), parce que j'avais peur qu'elle fasse le travail à ma place et que je perde un métier que j'ai mis des années à apprendre. Je m'en sers aujourd'hui, mais je veux toujours comprendre le code que je mets en ligne.

Ce blog tourne sous Nuxt depuis que j'ai [quitté WordPress](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere), et c'est pour ça que je suis des cours au lieu de demander à une IA d'écrire le site à ma place. J'ai déjà dit ce que je pense des [limites du vibe coding](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite), générer du code qu'on ne sait pas lire, ça marche jusqu'au premier bug sérieux, et ce jour-là il faut bien quelqu'un qui connaît Vue.

## Ce que je vis en ce moment avec le vibe coding

Et ce problème, je le vis en ce moment au travail. Des gens qui ne codent pas mettent toutes leurs specs dans Claude, sortent une application, et ne peuvent ensuite expliquer ni le code ni les fonctionnalités.

Voici un exemple récent, dont j'ai retiré les noms et les détails qui permettraient de reconnaître le projet. Quelqu'un qui ne code pas, biberonné à Claude Code, m'envoie un ticket de recette sur un projet que je développe. Il veut savoir pourquoi une liste ne propose que quelques profils et pourquoi certains contenus n'apparaissent pas dans un menu, et il termine en me demandant de lui confirmer, sujet par sujet, ce qui demande une correction et ce qui relève d'un simple paramétrage.

Aucun de ces points n'était un bug. À chaque fois, la réponse était une règle de gestion du projet, du genre « un profil apparaît dans la liste quand il a un contenu publié ». Et au passage, le ticket contenait de nouvelles demandes, introduites par des « il faudrait également », que j'ai renvoyées à un cahier des charges additionnel, pour une version 2 après la livraison.

Il y a aussi celui qui fournit les écrans et l'architecture et qui, une fois le site déployé en bêta sur la base de sa maquette, me demande de vérifier si ça fonctionne.

Non monsieur, ça s'appelle faire une recette.

Celui qui a écrit une règle peut l'expliquer, alors que celui qui l'a obtenue avec un prompt doit demander à quelqu'un d'autre ce que fait sa propre application, et c'est pour ça que je continue d'apprendre.

## Le rap a connu la même chose

Le hip-hop a connu la dextérité lyricale de Treach, les manipulations de samples de RZA et de DJ Premier, l'excellence du mixage de Dr. Dre, les folies créatives de Timbaland, la polyvalence et la capacité d'adaptation de Just Blaze. Tous ont en commun la passion et le talent.

Puis [FL Studio](/fr/20261026-lemon-studio-clone-fl-studio), Auto-Tune et les boucles MIDI se sont démocratisés, et on a eu des copies de sous-copies de Shawty Redd, des Sexyy Red, bref des sous-merdes qui ne sont là que pour l'argent et qui se créent des niches.

Le vibe coding pose le même problème. Ça produit vite, et ça cherche l'argent.

## Comment j'utilise Claude

Alors oui, je sais, j'utilise Claude moi aussi. Mais mon usage, c'est Opus, dans VS Code, et pour deux choses. Je lui donne le code qui ne marche pas pour qu'il trouve le bug, et je le laisse faire les commits automatiquement, avec le message qui va avec.

## Claude s'est mis co-auteur

Et c'est là que j'ai eu la surprise de trouver, au bas de mes commits, une ligne `Co-Authored-By` avec le nom du modèle et l'adresse `noreply@anthropic.com`, ce qui fait que sur GitHub, Claude apparaît à côté de moi dans la liste des auteurs.

Je ne lui avais rien demandé. C'est le comportement par défaut de Claude Code, et [la documentation des réglages](https://code.claude.com/docs/en/settings) prévoit un réglage nommé `attribution` pour changer ou cacher cette ligne.

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

La valeur vide de `commit` retire la ligne des commits, et celle de `pr` retire la mention « Generated with Claude Code » des pull requests. L'ancien réglage `includeCoAuthoredBy` existe encore, mais la documentation le marque comme obsolète, et les commits déjà faits gardent leur co-auteur, puisque le réglage ne vaut que pour les suivants.

Dans mon cas, cette ligne ne me gêne plus tant que ça, parce que je comprends mon code.

## Je garde les deux

Donc voilà, je garde Vue Mastery pour apprendre et Claude pour déboguer et faire mes commits. Si vous faites du Vue ou du Nuxt et que vous voulez comprendre ce que vous déployez, [l'offre Black Friday de Vue Mastery](https://www.vuemastery.com/black-friday) est le bon moment pour vous y mettre, et les cours gratuits suffisent pour vérifier que le format vous convient avant de payer.

Quant à ceux qui disent que développer ne sert à rien, ils vont au-devant de lendemains difficiles.

---
*[Jean-Luc Houédanou](https://houedanou.com), auteur principal de ses commits*
