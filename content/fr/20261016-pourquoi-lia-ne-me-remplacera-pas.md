---
title: "Pourquoi l'IA ne me remplacera pas (et pourquoi je ne peux plus m'en passer)"
createdAt: "2026-10-16T01:00:00Z"
draft: true
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "J'ai longtemps refusé l'IA. Puis un piratage nous a forcés à vibe coder une app avec Claude, et la dette technique a suivi. Pourquoi l'IA ne me remplacera pas."
searchIntent: "L'IA va-t-elle remplacer les développeurs ? Retour d'expérience d'un développeur : vibe coding en urgence avec Claude, dette technique, et usages quotidiens de l'IA."
tags: ["IA", "développement", "opinion", "linux", "omarchy"]
---

Avant d'expliquer pourquoi l'IA ne me remplacera pas, il faut dire ce qu'elle est.

## L'IA, c'est quoi ?

Claude, ChatGPT ou Gemini sont des modèles de langage. Ce sont des programmes entraînés sur des quantités énormes de textes : des livres, des sites web, et beaucoup, beaucoup de code. À partir de ce qu'on leur écrit, ils calculent la suite la plus probable. Mot après mot.

C'est tout. Et c'est déjà énorme. À force d'avoir lu presque tout ce qui s'écrit, ils répondent juste la plupart du temps. Ils écrivent du code qui tourne, et ils expliquent un message d'erreur mieux qu'un forum.

Mais un modèle de langage ne sait pas ce que vous voulez. Il sait ce qui ressemble le plus à ce que vous avez demandé. Il ne connaît ni votre client, ni votre serveur, ni l'historique de votre projet, sauf si vous les lui donnez. Et quand il se trompe, il se trompe avec la même assurance que quand il a raison.

Gardez ça en tête. La suite va le montrer.

## J'étais réfractaire

Longtemps, je n'en ai pas voulu. GitHub Copilot, Cursor, Windsurf : très peu pour moi. J'avais peur que l'IA me rende mauvais, qu'elle me mâche le travail et m'éloigne d'un métier que j'ai mis des années à apprendre. Je l'ai raconté dans [mon bilan après un an d'IA](/fr/20250604-liaetmoi).

Puis j'ai essayé Claude. Pour des questions précises, pour du debug, en gardant la main sur le code. Ça marchait bien. Mais je refusais toujours de lui confier une application entière. Le vibe coding, je le regardais de loin, et j'en pensais [tout le mal possible](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

Puis la réalité m'a rattrapé.

## Le jour où on a dû vibe coder

Un ancien collègue a piraté notre GitLab. Il a supprimé la base de données liée à une de nos applications.

Pas le temps de faire les choses proprement. Il nous fallait une application mobile, et vite. Alors on a fait ce que je refusais de faire : du vibe coding, dans l'urgence, avec Claude Sonnet.

Sur le moment, ça nous a sortis de l'impasse.

![Une personne en sweat à capuche, de dos, devant plusieurs écrans couverts de code](/images/articles/pexels-julio-lopez-34258667.webp)

## La facture est arrivée après

Derrière, la dette technique était énorme.

Pour ceux qui ne sont pas du métier, la dette technique, c'est le prix des raccourcis. Chaque solution rapide qu'on prend aujourd'hui, on la rembourse demain, avec les intérêts. Et là, on n'avait pris que des raccourcis : du code écrit vite, sans plan d'ensemble, que personne dans l'équipe n'avait vraiment pensé.

Résultat : on a dû recoder une bonne partie de l'application.

Et avant qu'on me le dise : peut-être que Fable, le modèle le plus puissant qu'Anthropic propose au public, aurait fait mieux que Sonnet. Rien ne le garantit. Un meilleur modèle écrit du meilleur code, mais il ne devine pas mieux ce qu'on veut quand on ne le sait pas nous-mêmes. Et dans l'urgence, on ne le savait pas.

## L'IA est utile. Vraiment.

Je ne vais pas faire semblant : je m'en sers tous les jours.

**Pour ma nièce.** Ses guides de révision, je les prépare maintenant avec l'IA. Elle explique souvent mieux que moi, [je l'avais déjà reconnu](/fr/20250604-liaetmoi) à l'époque de son CEPE.

**Pour le debug.** Je colle le message d'erreur, j'explique le contexte, et on cherche ensemble. Ça ne trouve pas toujours, mais ça va plus vite que de lire des réponses de 2014 sur un forum.

**Pour les tâches pénibles.** Remplir le frontmatter de mes articles, chercher les images sur Pexels (comme celles de ce billet), reformuler un mail pour un collaborateur difficile. Rien de tout ça n'est passionnant. L'IA le fait, je vérifie, je passe à autre chose.

![Une écolière fait ses devoirs à une table, à côté d'un réveil](/images/articles/pexels-gabby-k-5200784.webp)

## Omarchy : je n'ai jamais été aussi heureux sous Linux

Et puis il y a Omarchy, la distribution Linux de DHH, que j'ai [installée sur mon vieux MacBook Pro de 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Après avoir juré que je n'y toucherais pas, [je sais](/fr/20261008-omarchy-dhh-homme-dotfiles).

Je n'ai jamais été aussi heureux de travailler sous Linux. Pas parce que Linux est devenu plus simple. Parce que Claude résout littéralement tous mes problèmes. Pas de son ? Claude trouve le bon pilote. Le Bluetooth fait des siennes ? Claude propose les commandes à tester. Un thème Matrix jusqu'à l'écran de démarrage ? Claude l'a monté avec moi.

Avant, un bug sous Linux, c'était une soirée perdue. Maintenant, c'est un message d'erreur collé dans le terminal et quelques minutes de discussion.

L'IA ne m'a pas remplacé. Elle a fait de moi un utilisateur de Linux heureux. Des années de forums n'y étaient jamais arrivées.

![Un autocollant de Tux, la mascotte de Linux, posé sur un bac à glaçons](/images/articles/pexels-realtoughcandy-11034131.webp)

## Alors, l'IA remplacera-t-elle les développeurs ?

Peut-être. Peut-être que dans quelques versions, une IA saura écrire une application entière, propre, sans dette technique. Je ne vais pas jouer les devins.

Mais regardez ce qui nous a coûté cher. Ce n'est pas d'écrire le code : Sonnet l'a écrit vite. C'est tout le reste. Savoir ce qu'on veut construire. Vérifier ce qui sort. Comprendre le code six mois plus tard. Et être là quand ça casse, y compris quand un ancien collègue décide de tout supprimer.

Une IA calcule la suite la plus probable de ce qu'on lui demande. Le jour où elle saura aussi décider de ce qu'il faut demander, dire non à un client et assumer la dette qu'elle a créée, on en reparlera. Ce jour-là, on n'aura peut-être plus besoin de développeurs. Mais on aura toujours besoin de quelqu'un qui comprend le code, qu'on l'appelle développeur ou autrement.

En attendant, l'IA ne me remplace pas. Elle me rend plus rapide. Le développeur qui risque sa place, c'est celui qui fait le réfractaire. J'en sais quelque chose : c'était moi.

_Photos : [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} et [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, sur Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com) — ancien réfractaire, pas encore remplacé*
