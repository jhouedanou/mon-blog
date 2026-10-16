---
title: "Pourquoi l'IA ne me remplacera pas (et pourquoi je ne peux plus m'en passer)"
createdAt: "2026-10-16T01:00:00Z"
draft: true
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "J'ai longtemps refusé l'IA. Puis un piratage nous a forcés à vibe coder une app avec Claude. La dette technique a suivi. Pourquoi l'IA ne me remplacera pas."
searchIntent: "L'IA va-t-elle remplacer les développeurs ? Retour d'expérience d'un développeur : vibe coding en urgence avec Claude, dette technique, et usages quotidiens de l'IA."
tags: ["IA", "développement", "opinion", "linux", "omarchy"]
---

Avant de dire pourquoi l'IA ne me remplacera pas, il faut dire ce qu'elle est.

## L'IA, c'est quoi ?

Claude, ChatGPT et Gemini sont des modèles de langage. Ce sont des programmes. Ils ont lu énormément de textes : des livres, des sites web et beaucoup de code.

Quand on leur écrit, ils calculent la suite la plus probable. Mot après mot.

C'est tout. Et c'est déjà beaucoup. Comme ils ont presque tout lu, ils répondent souvent juste. Ils écrivent du code qui marche. Ils expliquent un message d'erreur mieux qu'un forum.

Mais un modèle de langage ne sait pas ce que vous voulez. Il donne ce qui ressemble le plus à votre demande. Il ne connaît pas votre client. Il ne connaît pas votre serveur. Il ne connaît pas votre projet, sauf si vous lui expliquez. Et quand il se trompe, il a l'air aussi sûr de lui que quand il a raison.

Gardez ça en tête. La suite va le montrer.

## J'étais réfractaire

Pendant longtemps, je ne voulais pas de l'IA. GitHub Copilot, Cursor, Windsurf : non merci.

J'avais peur qu'elle me rende mauvais. J'avais peur qu'elle fasse le travail à ma place. J'ai mis des années à apprendre mon métier. Je ne voulais pas le perdre. Je l'ai raconté dans [mon bilan après un an d'IA](/fr/20250604-liaetmoi).

Puis j'ai essayé Claude. Je lui posais des questions précises. Je m'en servais pour le debug. Je gardais la main sur le code. Ça marchait bien.

Mais je refusais de lui confier une application entière. Le vibe coding, je le regardais de loin. Et j'en pensais [tout le mal possible](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

Puis la réalité m'a rattrapé.

## Le jour où on a dû vibe coder

Un ancien collègue a piraté notre GitLab. Il a supprimé la base de données d'une de nos applications.

On n'avait pas le temps de faire les choses bien. Il nous fallait une application mobile, et vite. Alors on a fait ce que je refusais de faire. On a vibe codé, dans l'urgence, avec Claude Sonnet.

Sur le moment, ça nous a dépannés.

![Une personne en sweat à capuche, de dos, devant plusieurs écrans couverts de code](/images/articles/pexels-julio-lopez-34258667.webp)

## La facture est arrivée après

Ensuite, la dette technique était énorme.

La dette technique, c'est le prix des raccourcis. Une solution rapide aujourd'hui, c'est du travail en plus demain. Et nous, on n'avait pris que des raccourcis. Le code avait été écrit vite. Il n'y avait pas de plan d'ensemble. Personne dans l'équipe ne l'avait vraiment pensé.

Résultat : on a dû recoder une bonne partie de l'application.

On va me dire : avec Fable, ça aurait été mieux. Fable, c'est le modèle le plus puissant qu'Anthropic propose au public. Peut-être qu'il aurait fait mieux que Sonnet. Mais rien ne le garantit. Un meilleur modèle écrit du meilleur code. Mais il ne devine pas mieux ce qu'on veut. Et dans l'urgence, nous-mêmes, on ne savait pas ce qu'on voulait.

## L'IA est utile. Vraiment.

Je ne vais pas mentir : je m'en sers tous les jours.

**Pour ma nièce.** Je prépare ses guides de révision avec l'IA. Elle explique souvent mieux que moi. [Je l'avais déjà dit](/fr/20250604-liaetmoi) l'année de son CEPE.

**Pour le debug.** Je colle le message d'erreur. J'explique le contexte. Et on cherche ensemble. L'IA ne trouve pas toujours. Mais ça va plus vite que de lire des réponses de 2014 sur un forum.

**Pour les tâches pénibles.** Remplir le frontmatter de mes articles. Chercher des images sur Pexels, comme celles de ce billet. Reformuler un mail pour un collaborateur difficile. Ce n'est pas passionnant. L'IA le fait, je vérifie, et je passe à autre chose.

![Une écolière fait ses devoirs à une table, à côté d'un réveil](/images/articles/pexels-gabby-k-5200784.webp)

## Omarchy : je n'ai jamais été aussi heureux sous Linux

Et puis il y a Omarchy, la distribution Linux de DHH. Je l'ai [installée sur mon vieux MacBook Pro de 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Oui, après avoir juré que je n'y toucherais pas. [Je sais](/fr/20261008-omarchy-dhh-homme-dotfiles).

Je n'ai jamais été aussi heureux sous Linux. Linux n'est pas devenu plus simple. C'est Claude qui résout tous mes problèmes. Pas de son ? Claude trouve le bon pilote. Le Bluetooth ne marche pas bien ? Claude me donne les commandes à tester. Un thème Matrix jusqu'à l'écran de démarrage ? On l'a fait ensemble.

Avant, un bug sous Linux, c'était une soirée perdue. Maintenant, je colle le message d'erreur dans le terminal. Et souvent, en quelques minutes, c'est réglé.

L'IA ne m'a pas remplacé. Elle m'a rendu heureux sous Linux. Des années de forums n'y étaient jamais arrivées.

![Un autocollant de Tux, la mascotte de Linux, posé sur un bac à glaçons](/images/articles/pexels-realtoughcandy-11034131.webp)

## Alors, l'IA va-t-elle remplacer les développeurs ?

Peut-être. Un jour, une IA saura peut-être écrire une application entière, propre, sans dette technique. Je ne vais pas jouer les devins.

Mais regardez ce qui nous a coûté cher. Ce n'est pas d'écrire le code. Sonnet l'a écrit vite. Ce qui coûte cher, c'est le reste :

- savoir ce qu'on veut construire ;
- vérifier ce que l'IA a écrit ;
- comprendre le code six mois plus tard ;
- être là quand ça casse.

Même quand un ancien collègue décide de tout supprimer.

Une IA calcule la suite la plus probable. Un jour, elle saura peut-être décider quoi construire. Elle saura dire non à un client. Elle saura réparer la dette qu'elle a créée. Ce jour-là, on n'aura peut-être plus besoin de développeurs. Mais on aura toujours besoin de quelqu'un qui comprend le code. On l'appellera développeur ou autrement.

En attendant, l'IA ne me remplace pas. Elle me rend plus rapide. Le développeur qui risque sa place, c'est celui qui refuse l'IA. J'en sais quelque chose : c'était moi.

_Photos : [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} et [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, sur Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com) — ancien réfractaire, pas encore remplacé*
