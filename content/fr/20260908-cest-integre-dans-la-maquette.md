---
title: "« C'est intégré dans la maquette. » (Non.)"
createdAt: "2026-09-08"
image: "/images/articles/maquette-integree-non.webp"
description: "Une semaine à vérifier, fichier par fichier, ce qu'on m'annonçait comme fait. Bilan : deux écrans sur quatre, un grep de trente secondes, et cinq pièges du handoff qu'on paie toujours en jours. Avec, en cousine germaine, la réunion « pour en parler »."
searchIntent: "Comment vérifier un livrable de handoff annoncé comme terminé, et comment éviter les pièges classiques d'un projet web : lots de retours, contenus non finalisés, validation sans délai, accès DNS refusé, secrets partagés dans un Drive."
tags: ["gestion de projet", "développement", "handoff", "méthode", "opinion"]
---

# « C'est intégré dans la maquette. » (Non.)

Il y a des phrases qui devraient déclencher un réflexe. Comme « fais-moi confiance », « ça prend deux minutes » ou « on peut faire un call pour en parler ? ».

« C'est intégré » en fait partie.

Je récupère un dossier de handoff pour un projet client. Cahier des charges, matrice de scoring, maquettes HTML, design system, kit graphique, plan de tracking. Le pack a l'air sérieux. Il a même une table des matières. Neuf jours pour livrer.

Je liste huit manques. Réponse deux jours plus tard, sur un ton de mission accomplie : quatre points corrigés, la maquette intègre désormais la politique de confidentialité, les mentions légales, le bandeau cookies et le consentement dans les formulaires.

Parfait.

Sauf que non.

## Trente secondes de vérification

Avant d'ouvrir un éditeur, j'ouvre un terminal. Ce n'est pas de la méfiance, c'est de l'hygiène. Comme se laver les mains avant de manger ce qu'on vous a annoncé comme « prêt ».

```bash
grep -n -i -E "confidentialit|mentions l|cookie|consentement|RGPD" *.dc.html
```

Dix lignes remontent. « Politique de confidentialité » et « Mentions légales », en pied de page, sur trois planches. Rien d'autre.

Deuxième passe, plus large, au cas où le bandeau cookies se serait caché sous un autre nom, par pudeur :

```bash
grep -n -i -o -E ".{0,90}(cookie|consent|données personnelles|j'accepte).{0,90}" *.dc.html
```

Un seul résultat, et c'est un interrupteur d'administration : « Autoriser l'export de données personnelles ». Aucun bandeau cookies. Aucune case de consentement. Le mot « cookie » n'apparaît nulle part dans les fichiers de maquette. Pas même sous forme de biscuit.

Deux points sur quatre. Cinquante pour cent. Dans certaines écoles, ça passe. Pas ici.

J'ai envoyé le constat avec les numéros de ligne et les noms de planches. C'est fou comme un numéro de ligne coupe court aux débats. On ne peut pas faire un call pour en parler avec `grep`.

## Le vrai coût n'est pas celui qu'on croit

Deux écrans manquants, ça se rattrape. Une journée, peut-être deux.

Ce qui coûte, c'est ce qui change après. Avant, quand on me disait « c'est fait », j'intégrais. Maintenant j'ouvre les fichiers. À chaque annonce. Même quand on me dit « c'est vraiment fait cette fois ». Surtout quand on me dit « c'est vraiment fait cette fois ».

Ce temps-là, personne ne l'a chiffré. Il n'apparaît dans aucun planning, aucun devis, aucune ligne Excel. Et il est désormais permanent sur ce projet, comme un abonnement qu'on n'a pas souscrit.

C'est le prix d'une seule annonce non vérifiée. Elle ne coûte pas les deux écrans. Elle coûte la confiance, et la confiance est un accélérateur qu'on ne remplace par rien. Pas même par un emoji pouce levé.

## Cinq pièges, et comment les désamorcer

Ce projet me les a tous servis en une semaine, comme un menu dégustation. Ils ne sont pas propres à mon client, je les ai croisés partout. Vous les reconnaîtrez.

**1. « Pour éviter les allers-retours, je te fais des lots de retour. »**

L'intention est bonne, le résultat est l'inverse. Un lot fonctionne quand les éléments sont indépendants. Ici, les écrans de consentement touchent les mêmes formulaires et les mêmes pages que le reste : les livrer en trois fois, c'est refaire l'intégration trois fois. C'est comme repeindre une pièce en trois lots parce que « le pot est arrivé en plusieurs fois ».

La bonne réponse n'est pas « je refuse ». C'est de reformuler en dépendances : voici ce qui bloque quoi, et voici ce qui peut avancer en parallèle. Un lot d'éléments indépendants, oui. Un lot de prérequis, non. Ce sont des prérequis, pas des incréments. On ne livre pas un escalier marche par marche en commençant par la cinquième.

**2. « Les contenus ne sont pas finalisés. »**

Réponse fréquente quand tu demandes une arborescence. Elle est de bonne foi : ton interlocuteur entend « contenu », tu demandais « structure ». Vous n'avez pas eu la même conversation, mais vous l'avez eue ensemble.

Le problème vient de ta demande, pas de la sienne. « La liste des chapitres et les notions abordées » se lit comme une commande de contenu rédactionnel, donc comme trois semaines de travail, donc comme « on verra ». Nomme l'objet exact que tu veux recevoir : un tableau, une ligne par chapitre, avec les colonnes que tu listes, et une ligne d'exemple remplie. Provisoire accepté, dis-le explicitement. Là, il n'y a plus de lecture possible.

Depuis, j'envoie le fichier vide avec la demande. Ça a divisé mes allers-retours par trois. Le fichier vide est mon meilleur collaborateur.

**3. « Aucun délai de validation n'est imposé à ce stade. »**

Celui-là est vicieux, parce qu'il ressemble à de la souplesse. Il a même un petit air de cadeau.

Traduction : ta livraison a une date, la validation de ta livraison n'en a pas. Si la recette fonctionnelle traîne cinq jours, ces cinq jours sortent de ton temps de correction, et c'est toi qui rates l'échéance. Le calendrier, lui, n'a pas lu la clause.

Demande une fenêtre. Quarante-huit heures ouvrées à compter de la livraison, c'est raisonnable et personne ne peut le refuser sans s'expliquer. Et s'expliquer, on l'a vu, ce n'est pas le sport favori.

**4. « Aucun accès à notre zone DNS ne peut être communiqué. »**

Classique, et souvent légitime : le client ne veut pas ouvrir sa zone à un prestataire, et il a raison. Moi non plus je ne donnerais pas les clés de ma maison à quelqu'un que j'ai rencontré sur Teams.

Sauf que sans accès, chaque enregistrement devient un ticket. Validation du sous-domaine, certificat TLS, SPF, DKIM, DMARC : tu en as facilement une dizaine, chacun avec un aller-retour et une attente. Ça peut manger une semaine sur un projet qui en compte deux. On appelle ça de la sécurité. C'est surtout de la lenteur avec un badge.

La solution tient en une ligne dans leur zone : une **délégation NS du seul sous-domaine**. Ils gardent la maîtrise complète du domaine principal, ne te donnent aucun accès, et peuvent révoquer la délégation quand ils veulent. Toi, tu gères les enregistrements du sous-domaine sans demander la permission à chaque fois. C'est exactement leur exigence de contrôle, satisfaite autrement. Tout le monde gagne, ce qui rend la proposition suspecte, mais elle marche.

Propose-la avant d'accepter le mode ticket. Dans la moitié des cas, ça passe.

**5. Le secret qui voyage dans le Drive partagé.**

Dans le pack consolidé, on m'annonce que le jeton de l'API Conversions a été « renseigné dans le dossier de handoff ». C'est-à-dire posé dans un document Drive partagé avec une dizaine de personnes, dont le lien circule par mail depuis deux semaines. Autant l'imprimer sur les gobelets de la machine à café.

Un jeton d'API n'est pas une donnée de projet. Il ne se transmet pas dans un livrable, il ne se stocke pas à côté du cahier des charges, et une fois qu'il y est passé il est à considérer comme compromis. Demande sa régénération et un canal séparé. Sans drame, mais demande-le par écrit. Le drame, tu le gardes pour le jour où quelqu'un l'aura utilisé.

## La seule méthode qui tient

Sur ces dossiers, j'ai longtemps répondu par de l'analyse. Des mails argumentés, précis, avec des titres, des puces et des annexes, qui expliquaient pourquoi telle chose bloquait telle autre. Des petits chefs-d'œuvre. Personne ne les lisait.
\

En retour, j'avais droit au grand classique : « Je ne vois pas trop, on peut faire un call pour en parler ? » J'ai déjà consacré [un article entier à cette réunion « pour en parler »](/fr/20260326-lareunionpourenparler), la cousine germaine du « c'est intégré ». Les deux ont le même parent : la conviction, nue, qui préfère l'oral parce qu'à l'écrit on peut vérifier.

Ce qui marche, c'est plus court et moins fatigant : **des dépendances et des dates**.

- Ce qui est bloqué, et par quoi exactement.
- Ce qui est reçu, et quand.
- Le décompte démarre à réception, pas à l'annonce.

Ça ne se lit pas comme un reproche, donc ça ne se discute pas comme un reproche. Ça se lit comme un fait. Et on ne convoque pas de réunion contre un fait, on le subit.

Et surtout : tout par écrit, dans un canal visible par tout le monde. Pas de message privé sur les sujets qui engagent une date. Non par méfiance, mais parce que le jour où l'échéance saute, la seule chose qui te protège, c'est un historique daté que personne ne peut réécrire. La mémoire des gens, elle, est très créative après une échéance ratée.

## Ce que je fais maintenant, systématiquement

1. Je vérifie chaque annonce dans les fichiers, avant d'intégrer. Trente secondes.
2. J'envoie le gabarit vide avec la demande, au lieu de décrire ce que je veux.
3. Je demande une fenêtre de validation chiffrée, toujours.
4. Je propose la délégation de sous-domaine avant d'accepter le mode ticket.
5. Je réponds en dépendances et en dates. Jamais en analyse. Et jamais en call.

Rien de tout ça n'est de la défiance. C'est juste ce qui reste quand on a compris qu'un livrable annoncé n'est pas un livrable reçu, et qu'une maquette « intégrée » peut l'être exactement comme un rendez-vous est « dans l'agenda » : quelque part, en théorie, chez quelqu'un d'autre.

Vérifie. Ça prend trente secondes et ça sauve des semaines.

---
*Photo : [Ketut Subiyanto](https://www.pexels.com/photo/4584385/), Pexels.*
