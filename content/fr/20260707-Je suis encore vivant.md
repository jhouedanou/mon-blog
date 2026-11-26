---
title: "Le vrai métier de dev ? Se prendre des murs"
image: "/images/Gemini_Generated_Image_oudr54oudr54oudr.jpeg"
createdAt: "2026-07-07"
description: "Le vrai métier de développeur, en trois jours et quatre actes : lenteurs, bugs fantômes, franglais et quota de déploiement atteint à 22 h 41. Sans filtre."
searchIntent: "Que révèle une série de bugs, de lenteurs et de problèmes de déploiement sur le vrai métier de développeur."
tags: ["développement", "coulisses", "programmation"]
---

Se prendre mur sur mur, enchaîner les galères techniques, improviser des solutions dans l'urgence et avancer malgré tout, c'est ça la réalité du métier de développeur.

N'écoutez pas ceux qui vous soutiennent qu'il suffit [d'un coup d'IA et de trois lignes de code](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite) pour que tout tourne tout seul. Ce sont soit des menteurs, soit des génies (et dans 99 % des cas, ce sont des menteurs). Ce métier est rythmé par ces fameuses journées où tout arrive en même temps, les lenteurs inexplicables, les bugs fantômes et les déploiements qui crashent au pire moment.

Retour sur 3 jours de run en 4 actes.

---

## Acte 1 : Mais pourquoi c'est aussi lent ?

**Jour 1 :** Comprendre pourquoi l'application mettait trois plombes à charger.

En creusant un peu, j'ai compris qu'elle passait son temps à faire du travail inutile en téléchargeant à nouveau des fichiers massifs à chaque mise à jour.

Un nettoyage et une correction de logique plus tard, les performances sont enfin redevenues correctes.

## Acte 2 : La chasse aux bugs fantômes

**Jour 1 et 2 :** Place aux grands classiques, ceux qui adorent poper quand vous n'avez pas le temps :

* Un nom qui change tout seul dans l'interface (merci au `localStorage` un peu trop persistant).
* Un message d'erreur aléatoire (le backend qui sature face à un pic de requêtes).
* Un calendrier qui refuse obstinément de s'aligner (un grand moment de solitude signé Tailwind CSS... que je méprise de plus en plus à force de l'utiliser).

À chaque fois, la cause était différente, et la même question revenait en boucle : *« Comment ça a pu tourner comme ça aussi longtemps sans que personne ne remarque rien ? »* Je les ai tous corrigés, un par un.

## Acte 3 : Harmonisation de l'UI

**Jour 2 :** Une fois les gros bugs corrigés (et Tailwind temporairement maîtrisé), autant en profiter pour faire du rangement, avec l'harmonisation des textes, des retouches de couleurs, la suppression des boutons inutiles et des ajustements d'interface.

Pris séparément, ces ajustements n'ont rien de spectaculaire, mais mis bout à bout, ils rendent enfin l'application fluide et cohérente.

## Acte 4 : Le syndrome du « Franglais »

**Jour 3 :** Celui-là traînait depuis des semaines. Une moitié de l'application était en français et l'autre en anglais, un joyeux bazar.

On s'attendait à un problème technique compliqué, alors que c'était un mauvais réglage de configuration, présent depuis le premier jour du projet.

* **Temps pour corriger :** 3 minutes.
* **Temps passé à chercher l'origine du problème au fil des semaines :** Trop long pour mon amour-propre. Classique.

---

## Interlude : sampler pendant que les conteneurs chauffent

Un déploiement, ça prend du temps, et face à la barre de progression, on peut soit la fixer sans rien faire, soit utiliser le temps mort.

J'ai relancé [Koala Sampler](/fr/20260822-koala-sampler-gratuit-mac-boom-bap), délaissé ces derniers temps. Quelques samples bien choisis, une ambiance très Wu-Tang, et deux instrumentaux ont vu le jour pendant que les serveurs travaillaient en arrière-plan.

---

## Le mur de 22 h 41

Puis est arrivé le moment où tout semblait vouloir se casser la figure.

**22 h 41 : Plus rien ne se déploie.** Le quota de déploiements est atteint sur la plateforme, évidemment au pire moment possible, alors qu'une pile de correctifs cruciaux attend de passer en production.

Pas le temps d'attendre le lendemain, je sors la carte prépayée pour basculer sur l'offre payante et débloquer la situation. Sauf qu'il est [impossible de faire accepter mes cartes locales](/fr/20260327-cpanel-cyberpanel-migration) aux États-Unis, et le système refuse la transaction.

Il a fallu improviser une solution de secours dans l'urgence, une bascule sur [Cloudflare Pages](/fr/20260402-vercel-cloudflare-pages-migration) et GitHub Actions, le tout configuré en 15 minutes chrono avec l'aide de Claude. Pour mes prochains projets, la gestion de ces barrières de paiement géographiques sera un critère d'exclusion direct.

---

## Le bilan

Ces derniers jours ont été longs, intenses, et m'ont coûté quelques cheveux (et spoiler : il ne m'en restait déjà plus beaucoup). Mais le code est enfin en ligne.

Et là, j'en vois beaucoup se dire : *« Tu dois être soulagé. »*
Eh bien non, pas vraiment.

Je sais pertinemment que demain, à peine levé, il y aura peut-être une panne serveur ou un bug critique à résoudre en urgence. 
C'est un métier que j'ai choisi, ce n'est pas le pire du monde, mais surtout des gens comptent sur moi.

Sur ce, je dois aller dormir. Demain, il y aura encore des murs à se prendre, et je compte bien les affronter.

---
**[Jean-Luc Houédanou](https://houedanou.com)**
