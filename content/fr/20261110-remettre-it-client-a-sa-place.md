---
title: "Pourquoi il faut parfois remettre les IT des clients à leur place"
createdAt: "2026-11-10T18:00:00Z"
draft: true
image: "/images/articles/it-client-en-copie.webp"
description: "Recette validée, puis l'IT du client crée sa propre base de données. Ma méthode pour le recadrer : pas de WhatsApp, tout le monde en copie, des faits."
searchIntent: "Comment gérer l'informaticien d'un client qui complique une mise en production, et comment le recadrer sans conflit ?"
tags: ["opinion", "gestion de projet", "développement", "méthode"]
---

Il faut parfois remettre l'IT d'un client à sa place, et ça se fait par mail, avec tout le monde en copie et avec des faits, sans crier.

On a un projet à déployer chez un client et tout se passe bien, la recette est validée, le client est content et il ne reste que la mise en ligne. C'est à ce moment qu'arrive le dernier obstacle, l'IT du client.

## L'IT junior du client

J'ai une règle, tirée de l'expérience : plus il est junior, moins il connaît, et plus il est chiant.

L'IT expérimenté pose deux questions, lit le README et déploie, alors que le junior doit montrer qu'il existe et fait donc des choses que personne ne lui a demandées.

Voici un exemple récent, dont j'ai retiré les noms et changé les détails qui permettraient de reconnaître le projet, mais le déroulé est vrai.

J'envoie le mail de mise en production. Tout ce qui pouvait être préparé l'est déjà, les variables d'environnement sont dans un lien sécurisé et mes collègues sont en copie.

La réponse tient en deux points. D'abord une variable est vide, ensuite il a créé sa propre base de données de son côté, et il demande s'il doit changer cela.

Relisez la phrase. L'application est livrée avec sa base, déjà sécurisée, et personne n'a demandé une deuxième base, mais il en a créé une, il l'a branchée, et ensuite il demande s'il fallait.

## Ce que cette base a coûté

Voici la suite, dans l'ordre.

- **La variable vide.** C'était normal, parce que cette valeur ne peut être générée qu'après le déploiement. J'ai répondu avec ce qui fonctionne, ce qui ne fonctionne pas, et le fichier et la ligne où ça bloque.
- **La base.** Retour à la base prévue. L'application redémarre en boucle, parce que l'installation avait été faite pour l'autre base.
- **La configuration.** D'autres réglages ne sont pas ceux prévus, et une valeur de test est restée en place.
- **Les comptes.** Une fois le site en ligne, les comptes administrateur ne fonctionnent plus, le sien compris. C'est normal aussi, puisque ces comptes avaient été créés dans la base qu'il avait inventée.

Il a fallu plus d'une dizaine de messages au total, alors qu'à mon avis, sans la base surprise, quatre suffisaient.

## Mes trois règles

Je ne me fâche pas, j'applique trois règles, toujours les mêmes.

### 1. Je ne réponds pas sur WhatsApp

Une question technique sur WhatsApp n'a ni témoin ni archive, et trois semaines plus tard personne ne la retrouve. Si la question arrive là, la réponse part par mail. J'ai expliqué ailleurs [pourquoi WhatsApp n'est pas un outil de travail](/fr/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel).

### 2. Je mets tout le monde en copie

Je le fais pour que le chef de projet, le commercial et la direction lisent la même version que lui, et non pour l'humilier.

En privé, « j'ai créé une autre base » devient un mois plus tard « le prestataire a livré quelque chose qui ne marchait pas ». En copie, la phrase reste ce qu'elle est, avec sa date et son auteur.

### 3. Je pointe des faits

Au lieu d'écrire « vous n'auriez pas dû », j'écris « La base de production est celle du mail. Il n'y en a pas d'autre. »

Ensuite vient la preuve, un contrôle fait directement sur la base, étape par étape, avec la capture d'écran jointe, puis les actions, numérotées, une par ligne.

Quand il m'a écrit que des comptes ne fonctionnaient plus, ma réponse faisait une ligne, je lui ai demandé la liste des comptes à recréer, sans commentaire sur la cause, puisqu'elle est déjà écrite plus haut dans le fil et que tout le monde l'a lue.

J'utilise la même méthode pour [vérifier un livrable annoncé comme terminé](/fr/20260908-cest-integre-dans-la-maquette), parce qu'un numéro de ligne ne se discute pas.

### Et ça marche

Au milieu du fil, il a lu la documentation et il a alors posé deux bonnes questions, précises, sur l'état de la base. J'ai répondu point par point, et le site était en ligne peu après.

Le but est de l'amener sur les faits, parce que sur les faits il travaille bien.

## Canibus, LL Cool J et le micro

En 1997, LL Cool J a plus de dix ans de carrière et il invite quatre rappeurs sur le morceau « 4, 3, 2, 1 » : Method Man, Redman, DMX, et un nouveau, Canibus.

LL a un micro tatoué sur le bras, et Canibus écrit dans son couplet : « L, is that a mic on your arm? Let me borrow that. » En français : c'est un micro sur ton bras ? Prête-le-moi.

LL le prend pour un défi, il écrit une réponse dans son propre couplet et il demande à Canibus de changer sa phrase. Canibus la change, mais LL garde sa réponse sur le disque.

En 1998, Canibus sort « Second Round K.O. », avec Mike Tyson, et beaucoup disent qu'il a gagné ce round. LL répond avec « The Ripper Strikes Back », puis le premier album de Canibus déçoit, et on parle encore de lui surtout pour cette histoire, alors que LL Cool J est entré au Rock and Roll Hall of Fame en 2021.

L'IT junior fait la même chose que Canibus, puisqu'on l'invite sur le projet d'un autre et qu'il veut y mettre sa base à lui, son domaine à lui.

De LL, je garde l'endroit de la réponse. Il a répondu sur le disque, là où tout le monde écoute, plutôt que dans le couloir du studio, et mon mail avec tout le monde en copie fait la même chose.

Par contre, je lui laisse l'ego. LL a répondu à une phrase qu'il avait lui-même fait effacer, et c'est ce qui a lancé la guerre. Moi, je réponds avec un numéro de ligne et une capture d'écran.

Canibus avait du talent, et le junior en a peut-être aussi. Il lui reste à apprendre que sur le morceau d'un autre, on pose son couplet et on rend le micro.

---
*[Jean-Luc Houédanou](https://houedanou.com)*
