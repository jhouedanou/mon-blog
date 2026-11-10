---
title: "Pourquoi il faut parfois remettre les IT des clients à leur place"
createdAt: "2026-11-10T18:00:00Z"
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

Exemple de cette semaine. J'ai retiré les noms, le reste est exact.

Lundi, 16 h 51. J'envoie le mail de mise en production. Le domaine d'envoi des e-mails est déjà vérifié, il n'y a rien à faire côté DNS. Les variables d'environnement sont dans un lien sécurisé. Quatre collègues sont en copie.

La réponse tient en deux points. Le premier : une variable est vide. Le second, je le cite : « j'ai créé une propre base de données de notre côté pour ça, dois-je changer cela ? »

Relisez la phrase. L'application est livrée avec sa base, sécurisée, avec authentification multifacteur. Personne n'a demandé une deuxième base. Il en a créé une, il l'a branchée, et ensuite il demande s'il fallait.

## Ce que cette base a coûté

Voici la suite, dans l'ordre.

- **La variable vide.** C'était normal. Ce secret se génère à la création du webhook, et le webhook a besoin de l'URL finale de production. Il fallait donc attendre le déploiement. J'ai répondu avec ce qui fonctionne, ce qui ne fonctionne pas, et le fichier et la ligne où ça bloque.
- **La base.** Retour à la base prévue. Le conteneur redémarre en boucle : la migration échoue parce que le schéma existe déjà.
- **Le domaine.** L'application est servie sur un autre domaine que celui prévu. Et un secret de test est resté en place.
- **Les comptes.** Une fois le site en ligne : « les anciens comptes admin, y compris moi-même, ne peuvent plus se connecter ». C'est normal aussi : ces comptes avaient été créés dans la base qu'il avait inventée.

Treize messages au total, du lundi au mardi. À mon avis, sans la base surprise, quatre suffisaient.

## La pédagogie : trois règles

Je ne me fâche pas. J'applique trois règles, toujours les mêmes.

### 1. Je ne réponds pas sur WhatsApp

Une question technique sur WhatsApp n'a pas de témoin et pas d'archive. Trois semaines plus tard, personne ne la retrouve. Si la question arrive là, la réponse part par mail. J'ai expliqué ailleurs [pourquoi WhatsApp n'est pas un outil de travail](/fr/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel).

### 2. Je mets tout le monde en copie

Ce n'est pas pour humilier. C'est pour que le chef de projet, le commercial et la direction lisent la même version que lui.

En privé, « j'ai créé une autre base » devient un mois plus tard « le prestataire a livré quelque chose qui ne marchait pas ». En copie, la phrase reste ce qu'elle est, avec sa date et son auteur.

### 3. Je pointe des faits

Je n'écris pas « vous n'auriez pas dû ». J'écris : « C'est la base de production. Il n'y en a pas d'autre. »

Ensuite vient la preuve : un contrôle fait directement sur la base, un objet témoin par migration, les quatorze présents, capture d'écran jointe. Ensuite viennent les actions, numérotées, une par ligne.

Quand il m'a écrit que des comptes ne fonctionnaient plus, ma réponse faisait une ligne : « Merci d'indiquer directement la liste des comptes et adresses e-mail à recréer. » Pas de commentaire sur la cause. La cause est déjà écrite plus haut dans le fil, et tout le monde l'a lue.

J'utilise la même méthode pour [vérifier un livrable annoncé comme terminé](/fr/20260908-cest-integre-dans-la-maquette) : un numéro de ligne ne se discute pas.

### Et ça marche

Au milieu du fil, il a lu le README. Il a alors posé deux bonnes questions : est-ce bien la base de production, et jusqu'à quelle migration est-elle à jour ? J'ai répondu point par point, et le site était en ligne peu après.

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
