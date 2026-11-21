---
title: "L'IA va remplacer les développeurs ? Pas moi"
createdAt: "2026-10-16T01:00:00Z"
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "L'IA va-t-elle remplacer les développeurs ? J'ai longtemps refusé l'IA, puis un piratage nous a forcés à vibe coder une app avec Claude. La dette a suivi."
searchIntent: "L'IA va-t-elle remplacer les développeurs ? Retour d'expérience d'un développeur : vibe coding en urgence avec Claude, dette technique, et usages quotidiens de l'IA."
tags: ["IA", "développement", "opinion", "linux", "omarchy"]
---

L'IA va-t-elle remplacer les développeurs ? Moi, en tout cas, elle ne me remplacera pas. Mais avant de dire pourquoi, il faut dire ce qu'elle est.

## L'IA, c'est quoi ?

Claude, ChatGPT et Gemini sont des modèles de langage, des programmes qui ont lu énormément de textes : des livres, des sites web et beaucoup de code.

Quand on leur écrit, ils calculent la suite la plus probable, mot après mot.

Ils ne font que ça, mais comme ils ont presque tout lu, ils répondent souvent juste, ils écrivent du code qui marche et ils expliquent un message d'erreur mieux qu'un forum.

Mais un modèle de langage ne sait pas ce que vous voulez, il donne ce qui ressemble le plus à votre demande. Il ne connaît pas votre client, votre serveur ou votre projet, sauf si vous lui expliquez, et quand il se trompe, il a l'air aussi sûr de lui que quand il a raison.

Gardez ça en tête, parce que la suite va le montrer.

## J'étais réfractaire

Pendant longtemps, je ne voulais pas de l'IA, et à GitHub Copilot, Cursor ou Windsurf, je disais non merci.

J'avais peur qu'elle me rende mauvais et qu'elle fasse le travail à ma place, parce que j'ai mis des années à apprendre mon métier et que je ne voulais pas le perdre. Je l'ai raconté dans [mon bilan après un an d'IA](/fr/20250604-liaetmoi).

Puis j'ai essayé Claude. Je lui posais des questions précises, je m'en servais pour le debug, je gardais la main sur le code, et ça marchait bien.

Mais je refusais de lui confier une application entière, et [le vibe coding](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite), je le regardais de loin et j'en pensais tout le mal possible.

Puis la réalité m'a rattrapé.

## Le jour où on a dû vibe coder

Un ancien collègue a piraté notre GitLab et a supprimé la base de données d'une de nos applications.

On n'avait pas le temps de faire les choses bien, il nous fallait une application mobile, et vite. Alors on a fait ce que je refusais de faire, on a vibe codé dans l'urgence avec Claude Sonnet.

Sur le moment, ça nous a dépannés.

![Une personne en sweat à capuche, de dos, devant plusieurs écrans couverts de code](/images/articles/pexels-julio-lopez-34258667.webp)

## Ce que ça nous a coûté

Ensuite, la dette technique était énorme.

La dette technique, c'est le travail en plus que demandent demain les raccourcis pris aujourd'hui, et nous, on n'avait pris que des raccourcis. Le code avait été écrit vite, sans plan d'ensemble, et personne dans l'équipe ne l'avait vraiment pensé.

On a donc dû recoder une bonne partie de l'application.

On va me dire qu'avec Fable, le modèle le plus puissant qu'Anthropic propose au public, ça aurait été mieux. Peut-être qu'il aurait fait mieux que Sonnet, mais rien ne le garantit. Un meilleur modèle écrit du meilleur code, mais il ne devine pas mieux ce qu'on veut, et dans l'urgence, nous-mêmes, on ne savait pas ce qu'on voulait.

## L'IA est utile

Je ne vais pas mentir, je m'en sers tous les jours.

**Pour ma nièce.** Je prépare ses guides de révision avec l'IA, qui explique souvent mieux que moi. Je l'avais déjà dit l'année de son CEPE, en parlant de [l'IA et de ses devoirs de mathématiques](/fr/20250604-liaetmoi).

**Pour le debug.** Je colle le message d'erreur, j'explique le contexte et on cherche ensemble. L'IA ne trouve pas toujours, mais ça va plus vite que de lire des réponses de 2014 sur un forum.

**Pour les tâches pénibles.** Remplir le frontmatter de mes articles, chercher des images sur Pexels comme celles de ce billet ou reformuler un mail pour un collaborateur difficile, ce n'est pas passionnant. L'IA le fait, je vérifie, et je passe à autre chose.

![Une écolière fait ses devoirs à une table, à côté d'un réveil](/images/articles/pexels-gabby-k-5200784.webp)

## Linux avec Omarchy et Claude

Et puis il y a Omarchy, la distribution Linux de DHH, que j'ai [installée sur mon vieux MacBook Pro de 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Oui, après avoir [juré que je ne toucherais pas à Omarchy](/fr/20261008-omarchy-dhh-homme-dotfiles), je sais.

Je n'ai jamais été aussi heureux sous Linux, ce que des années de forums n'avaient jamais réussi à faire. Linux n'est pas devenu plus simple pour autant, mais Claude résout tous mes problèmes. Quand je n'ai pas de son, il trouve le bon pilote, quand le Bluetooth ne marche pas bien, il me donne les commandes à tester, et un thème Matrix jusqu'à l'écran de démarrage, on l'a fait ensemble.

Avant, un bug sous Linux, c'était une soirée perdue, alors que maintenant je colle le message d'erreur dans le terminal et c'est souvent réglé en quelques minutes.

![Un autocollant de Tux, la mascotte de Linux, posé sur un bac à glaçons](/images/articles/pexels-realtoughcandy-11034131.webp)

## Alors, l'IA va-t-elle remplacer les développeurs ?

Peut-être qu'un jour une IA saura écrire une application entière, propre, sans dette technique, et je ne vais pas faire de prédiction là-dessus.

Mais regardez ce qui nous a coûté cher. Le code, Sonnet l'a écrit vite, et ce qui coûte cher, c'est le reste :

- savoir ce qu'on veut construire ;
- vérifier ce que l'IA a écrit ;
- comprendre le code six mois plus tard ;
- [être là quand ça casse](/fr/20260707-je-suis-encore-vivant), y compris quand un ancien collègue décide de tout supprimer.

Un jour, une IA saura peut-être décider quoi construire, dire non à un client et réparer la dette qu'elle a créée. Ce jour-là, on n'aura peut-être plus besoin de développeurs, mais on aura toujours besoin de quelqu'un qui comprend le code, qu'on l'appelle développeur ou autrement.

En attendant, l'IA me rend plus rapide sans me remplacer, et le développeur qui risque sa place, c'est celui qui refuse l'IA. J'en sais quelque chose, c'était moi.

_Photos : [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} et [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, sur Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
