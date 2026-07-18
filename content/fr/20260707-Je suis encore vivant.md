---
title: "Se prendre des murs (et pourquoi c’est ça, le vrai métier de dev)"
image: "/images/Gemini_Generated_Image_oudr54oudr54oudr.jpeg"
createdAt: "2026-07-06"
description: "Une soirée où tout semblait vouloir casser... jusqu'à ce que tout finisse par rentrer dans l'ordre."
searchIntent: "Que révèle une série de bugs, de lenteurs et de problèmes de déploiement sur le vrai métier de développeur."
tags: ["développement", "coulisses", "programmation"]
---

# Se prendre des murs (et pourquoi c’est ça, le vrai métier de dev)

Se prendre mur sur mur, enchaîner les galères techniques, improviser des solutions dans l'urgence et avancer malgré tout : c’est ça, la réalité du terrain.

N’écoutez pas ceux qui vous soutiennent qu’il suffit d’un coup d'IA et de trois lignes de code pour que tout tourne tout seul. Ce sont soit des menteurs, soit des génies (et dans 99 % des cas, ce sont des menteurs). Ce métier est rythmé par ces fameuses journées où tout s’aligne comme si le projet avait décidé de tester vos nerfs. Lenteurs inexplicables, bugs fantômes, déploiements qui crashent au pire moment...

Retour sur 3 jours de run en 4 actes.

---

## Acte 1 — Mais pourquoi c’est aussi lent ?

**Jour 1 :** Comprendre pourquoi l'application mettait trois plombes à charger.

En creusant un peu, le verdict tombe : elle passait son temps à faire du travail inutile en téléchargeant à nouveau des fichiers massifs à chaque mise à jour. Imaginez quelqu'un qui déménagerait l'intégralité de sa maison juste pour changer une ampoule.

Un bon coup de ménage et une correction de logique plus tard, les performances ont enfin recommencé à respirer.

## Acte 2 — La chasse aux bugs fantômes

**Jour 1 et 2 :** Place aux grands classiques. Ceux qui adorent poper quand vous n'avez pas le temps :

* Un nom qui change tout seul dans l'interface (merci au `localStorage` un peu trop persistant).
* Un message d'erreur aléatoire (le backend qui sature face à un pic de requêtes).
* Un calendrier qui refuse obstinément de s'aligner (un grand moment de solitude signé Tailwind CSS... que je méprise de plus en plus à force de l’utiliser).

À chaque fois, une cause différente. Et toujours cette même question en boucle : *« Comment ça a pu tourner comme ça aussi longtemps sans que personne ne remarque rien ? »* Un par un, ils sont tous tombés.

## Acte 3 — L'effet papillon : harmonisation de l'UI

**Jour 2 :** Une fois les gros incendies éteints (et Tailwind temporairement dompté), autant en profiter pour ranger la maison. Harmonisation des textes, retouches de couleurs, suppression des boutons inutiles et ajustements d'interface.

Pris séparément, ces ajustements n'ont rien de spectaculaire. Mis bout à bout, l'application devient enfin fluide, cohérente et agréable.

## Acte 4 — Le syndrome du "Franglais"

**Jour 3 :** Celui-là traînait dans les tiroirs depuis des semaines. Une moitié de l'application parlait français, l'autre répondait en anglais. Un joyeux bazar.

On s'attendait à une usine à gaz technique. La réalité ? Un simple mauvais réglage de configuration, planté là depuis le premier jour du projet.

* **Temps pour corriger :** 3 minutes.
* **Temps passé à chercher l'origine du problème au fil des semaines :** Trop long pour mon amour-propre. Classique.

---

## Interlude — Sampler pendant que les conteneurs chauffent

Un déploiement, ça prend du temps. Face à la barre de progression, deux écoles : la fixer comme un zombie, ou optimiser le temps mort.

J'ai relancé Koala Sampler, délaissé ces derniers temps. Quelques samples bien choisis, une ambiance très Wu-Tang, et deux instrumentaux ont vu le jour pendant que les serveurs transpiraient en arrière-plan. Comme quoi, la frustration technique peut nourrir la créativité.

---

## Clou du spectacle : Le Mur de 22 h 41

En parlant de musique...violons stridents, s'il vous plaît. Le moment où tout semblait vouloir se casser la figure. Le boss de fin est arrivé.

**22 h 41 : Plus rien ne se déploie.** Le couperet tombe : quota de déploiements atteint sur la plateforme. Évidemment, la limite tombe au pire moment possible, alors qu'une pile de correctifs cruciaux attend de passer en production.

Pas le temps d'attendre le lendemain. Je sors la carte prépayée pour basculer sur l'offre payante et débloquer la situation. Et là, surprise : impossible de faire accepter mes cartes locales dans le pays de l'oncle Sam. Le système refuse la transaction, me laissant bloqué à la porte.

Il a fallu improviser une solution de secours dans l'urgence absolue : bascule sur Cloudflare Pages et GitHub Actions, le tout configuré en 15 minutes chrono avec l’aide de Claude. Une chose est sûre : pour mes prochains projets, la gestion de ces barrières de paiement géographiques sera un critère d'exclusion direct.

---

## Le bilan

Ces derniers jours ont été longs, intenses, et m'ont coûté quelques cheveux (et spoiler : il ne m'en restait déjà plus beaucoup). Mais le code est enfin en ligne.

Et là, je vois beaucoup se dire : *« Tu dois être soulagé. »*
Eh bien non. Pas vraiment.

Je sais pertinemment que demain, à peine levé, il y aura peut-être une panne serveur ou un bug critique à résoudre en urgence. 
C'est un métier que j'ai choisi, ce n'est pas le pire du monde, mais surtout des gens comptent sur moi.

Sur ce, je dois aller dormir. Demain, il y aura encore des murs à se prendre, et je compte bien les affronter.

**Jean-Luc Houédanou**
