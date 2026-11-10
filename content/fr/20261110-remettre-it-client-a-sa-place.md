---
title: "Pourquoi il faut parfois remettre les IT des clients à leur place"
createdAt: "2026-11-10T18:00:00Z"
draft: true
image: "/images/articles/it-client-en-copie.webp"
description: "Recette validée, puis l'IT du client crée sa propre base de données. Ma méthode pour le recadrer : pas de WhatsApp, tout le monde en copie, des faits."
searchIntent: "Comment gérer l'informaticien d'un client qui complique une mise en production, et comment le recadrer sans conflit ?"
tags: ["opinion", "gestion de projet", "développement", "méthode"]
---

Il faut parfois remettre l'IT d'un client à sa place. Pas en criant : par mail, avec tout le monde en copie, et avec des faits.

Le contexte est simple. Un projet à déployer chez un client. Tout se passe bien. La recette est validée, le client est content, il ne reste que la mise en ligne. Et là arrive le boss final du jeu : l'IT du client.

## Le boss final : l'IT du client

J'ai une règle, tirée de l'expérience : plus il est junior, moins il connaît, et plus il est chiant.

L'IT expérimenté pose deux questions, lit le README et déploie. Le junior, lui, doit montrer qu'il existe. Alors il fait des choses que personne ne lui a demandées.

Un exemple récent. J'ai retiré les noms et changé les détails qui permettraient de reconnaître le projet. Le déroulé, lui, est vrai.

J'envoie le mail de mise en production. Tout ce qui pouvait être préparé l'est déjà. Les variables d'environnement sont dans un lien sécurisé. Mes collègues sont en copie.

La réponse tient en deux points. Le premier : une variable est vide. Le second : il a créé sa propre base de données de son côté, et il demande s'il doit changer cela.

Relisez la phrase. L'application est livrée avec sa base, déjà sécurisée. Personne n'a demandé une deuxième base. Il en a créé une, il l'a branchée, et ensuite il demande s'il fallait.

## Ce que cette base a coûté

Voici la suite, dans l'ordre.

- **La variable vide.** C'était normal. Cette valeur ne peut être générée qu'après le déploiement. J'ai répondu avec ce qui fonctionne, ce qui ne fonctionne pas, et le fichier et la ligne où ça bloque.
- **La base.** Retour à la base prévue. L'application redémarre en boucle, parce que l'installation avait été faite pour l'autre base.
- **La configuration.** D'autres réglages ne sont pas ceux prévus, et une valeur de test est restée en place.
- **Les comptes.** Une fois le site en ligne, les comptes administrateur ne fonctionnent plus, le sien compris. C'est normal aussi : ces comptes avaient été créés dans la base qu'il avait inventée.

Plus d'une dizaine de messages au total. À mon avis, sans la base surprise, quatre suffisaient.

## La pédagogie : trois règles

Je ne me fâche pas. J'applique trois règles, toujours les mêmes.

### 1. Je ne réponds pas sur WhatsApp

Une question technique sur WhatsApp n'a pas de témoin et pas d'archive. Trois semaines plus tard, personne ne la retrouve. Si la question arrive là, la réponse part par mail. J'ai expliqué ailleurs [pourquoi WhatsApp n'est pas un outil de travail](/fr/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel).

### 2. Je mets tout le monde en copie

Ce n'est pas pour humilier. C'est pour que le chef de projet, le commercial et la direction lisent la même version que lui.

En privé, « j'ai créé une autre base » devient un mois plus tard « le prestataire a livré quelque chose qui ne marchait pas ». En copie, la phrase reste ce qu'elle est, avec sa date et son auteur.

### 3. Je pointe des faits

Je n'écris pas « vous n'auriez pas dû ». J'écris : « La base de production est celle du mail. Il n'y en a pas d'autre. »

Ensuite vient la preuve : un contrôle fait directement sur la base, étape par étape, avec la capture d'écran jointe. Ensuite viennent les actions, numérotées, une par ligne.

Quand il m'a écrit que des comptes ne fonctionnaient plus, ma réponse faisait une ligne : je lui ai demandé la liste des comptes à recréer. Pas de commentaire sur la cause. La cause est déjà écrite plus haut dans le fil, et tout le monde l'a lue.

J'utilise la même méthode pour [vérifier un livrable annoncé comme terminé](/fr/20260908-cest-integre-dans-la-maquette) : un numéro de ligne ne se discute pas.

### Et ça marche

Au milieu du fil, il a lu la documentation. Il a alors posé deux bonnes questions, précises, sur l'état de la base. J'ai répondu point par point, et le site était en ligne peu après.

C'est le but. Je ne cherche pas à l'écraser. Je cherche à l'amener sur les faits, parce que sur les faits il travaille bien.

## Canibus, LL Cool J et le micro

En 1997, LL Cool J a plus de dix ans de carrière. Il invite quatre rappeurs sur le morceau « 4, 3, 2, 1 » : Method Man, Redman, DMX, et un nouveau, Canibus.

LL a un micro tatoué sur le bras. Canibus écrit dans son couplet : « L, is that a mic on your arm? Let me borrow that. » Autrement dit : c'est un micro sur ton bras ? Prête-le-moi.

LL le prend pour un défi. Il écrit une réponse dans son propre couplet, et il demande à Canibus de changer sa phrase. Canibus la change. LL garde sa réponse sur le disque.

En 1998, Canibus sort « Second Round K.O. », avec Mike Tyson. Beaucoup disent qu'il a gagné ce round. LL répond avec « The Ripper Strikes Back ». Puis le premier album de Canibus déçoit, et on parle encore de lui surtout pour cette histoire. LL Cool J, lui, est entré au Rock and Roll Hall of Fame en 2021.

L'IT junior, c'est Canibus. On l'invite sur le morceau d'un autre, et il veut emprunter le micro : sa base à lui, son domaine à lui.

Je garde une chose de LL, et j'en laisse une.

Je garde l'endroit de la réponse. LL n'a pas réglé ça dans le couloir du studio. Il a répondu sur le disque, là où tout le monde écoute. C'est mon mail avec tout le monde en copie.

Je laisse l'ego. LL a répondu à une phrase qu'il avait lui-même fait effacer, et c'est ce qui a lancé la guerre. Moi, je réponds avec un numéro de ligne et une capture d'écran.

Canibus avait du talent. Le junior en a peut-être aussi. Il lui reste à apprendre une chose : sur le morceau d'un autre, on pose son couplet et on rend le micro.

---
*[Jean-Luc Houédanou](https://houedanou.com)*
