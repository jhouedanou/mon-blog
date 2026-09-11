---
title: "« C'est intégré dans la maquette. » (Non.)"
createdAt: "2026-09-08"
image: "/images/articles/maquette-integree-non.webp"
description: "Une semaine à vérifier, fichier par fichier, ce qu'on m'annonçait comme fait dans un dossier de handoff. Deux écrans sur quatre étaient réellement là. J'en profite pour lister cinq pièges classiques des projets web, et la façon dont je les gère maintenant."
searchIntent: "Comment vérifier un livrable de handoff annoncé comme terminé, et comment éviter les pièges classiques d'un projet web : lots de retours, contenus non finalisés, validation sans délai, accès DNS refusé, secrets partagés dans un Drive."
tags: ["gestion de projet", "développement", "handoff", "méthode", "opinion"]
---

# « C'est intégré dans la maquette. » (Non.)

Il y a des phrases qui devraient nous faire tendre l'oreille. « Fais-moi confiance », « ça prend deux minutes », ou « on peut faire un call pour en parler ? ». Depuis la semaine dernière, j'ai ajouté « c'est intégré » à ma liste.

Je récupère un dossier de handoff pour un projet client. Cahier des charges, matrice de scoring, maquettes HTML, design system, kit graphique, plan de tracking. Le pack a l'air sérieux, il a même une table des matières, et j'ai neuf jours pour livrer.

Après une première lecture, je liste huit manques. La réponse arrive deux jours plus tard, sur un ton de mission accomplie : quatre points corrigés, la maquette intègre désormais la politique de confidentialité, les mentions légales, le bandeau cookies et le consentement dans les formulaires.

Parfait, me dis-je. Sauf que non.

## Trente secondes de vérification

Avant d'ouvrir un éditeur, j'ouvre un terminal. Ce n'est pas de la méfiance, c'est une habitude que j'ai prise avec le temps.

```bash
grep -n -i -E "confidentialit|mentions l|cookie|consentement|RGPD" *.dc.html
```

Dix lignes remontent. « Politique de confidentialité » et « Mentions légales », en pied de page, sur trois planches. Rien d'autre.

Je fais une deuxième passe, plus large, au cas où le bandeau cookies se serait caché sous un autre nom :

```bash
grep -n -i -o -E ".{0,90}(cookie|consent|données personnelles|j'accepte).{0,90}" *.dc.html
```

Un seul résultat, et c'est un interrupteur d'administration : « Autoriser l'export de données personnelles ». Aucun bandeau cookies, aucune case de consentement. Le mot « cookie » n'apparaît nulle part dans les fichiers de maquette.

Deux points sur quatre, donc. J'ai renvoyé le constat avec les numéros de ligne et les noms de planches. C'est fou comme un numéro de ligne coupe court aux débats : on ne peut pas faire un call pour en parler avec `grep`.

## Le vrai coût

Deux écrans manquants, ça se rattrape en une journée, peut-être deux. Ce qui coûte, c'est ce qui change après.

Avant, quand on me disait « c'est fait », j'intégrais. Maintenant j'ouvre les fichiers, à chaque annonce, même quand on me dit « c'est vraiment fait cette fois ». Ce temps-là, personne ne l'a chiffré. Il n'apparaît dans aucun planning, aucun devis, aucune ligne Excel, et il est désormais permanent sur ce projet.

C'est le prix d'une seule annonce non vérifiée. Elle ne coûte pas les deux écrans, elle coûte la confiance, et la confiance fait gagner un temps qu'on ne remplace par rien.

## Cinq pièges que ce projet m'a servis en une semaine

Ils ne sont pas propres à mon client, je les ai croisés partout. Vous les reconnaîtrez sûrement.

### 1. « Pour éviter les allers-retours, je te fais des lots de retour. »

L'intention est bonne, mais le résultat est l'inverse. Un lot fonctionne quand les éléments sont indépendants. Ici, les écrans de consentement touchent les mêmes formulaires et les mêmes pages que le reste : les livrer en trois fois, c'est refaire l'intégration trois fois.

La bonne réponse n'est pas de refuser, c'est de reformuler en dépendances : voici ce qui bloque quoi, et voici ce qui peut avancer en parallèle. Un lot d'éléments indépendants, oui. Un lot de prérequis, non.

### 2. « Les contenus ne sont pas finalisés. »

C'est la réponse classique quand on demande une arborescence, et elle est de bonne foi : votre interlocuteur entend « contenu », vous demandiez « structure ». Vous n'avez pas eu la même conversation, mais vous l'avez eue ensemble.

Le problème vient de la demande. « La liste des chapitres et les notions abordées » se lit comme une commande de contenu rédactionnel, donc comme trois semaines de travail, donc comme « on verra ». Il vaut mieux nommer l'objet exact qu'on veut recevoir : un tableau, une ligne par chapitre, avec les colonnes listées et une ligne d'exemple remplie, provisoire accepté. Là, il n'y a plus d'interprétation possible.

Depuis, j'envoie le fichier vide avec la demande. Ça a divisé mes allers-retours par trois.

### 3. « Aucun délai de validation n'est imposé à ce stade. »

Celui-là est vicieux, parce qu'il ressemble à de la souplesse. En réalité, votre livraison a une date, mais la validation de votre livraison n'en a pas. Si la recette fonctionnelle traîne cinq jours, ces cinq jours sortent de votre temps de correction, et c'est vous qui ratez l'échéance.

Demandez une fenêtre. Quarante-huit heures ouvrées à compter de la livraison, c'est raisonnable, et personne ne peut le refuser sans s'expliquer.

### 4. « Aucun accès à notre zone DNS ne peut être communiqué. »

Classique, et souvent légitime : le client ne veut pas ouvrir sa zone à un prestataire, et il a raison. Moi non plus je ne donnerais pas les clés de ma maison à quelqu'un rencontré sur Teams.

Sauf que sans accès, chaque enregistrement devient un ticket. Validation du sous-domaine, certificat TLS, SPF, DKIM, DMARC : on en a facilement une dizaine, chacun avec un aller-retour et une attente. Ça peut manger une semaine sur un projet qui en compte deux.

La solution tient en une ligne dans leur zone : une délégation NS du seul sous-domaine. Ils gardent la maîtrise complète du domaine principal, ne donnent aucun accès, et peuvent révoquer la délégation quand ils veulent. Vous, vous gérez les enregistrements du sous-domaine sans demander la permission à chaque fois. C'est exactement leur exigence de contrôle, satisfaite autrement. Proposez-la avant d'accepter le mode ticket, dans la moitié des cas ça passe.

### 5. Le secret qui voyage dans le Drive partagé

Dans le pack consolidé, on m'annonce que le jeton de l'API Conversions a été « renseigné dans le dossier de handoff ». Autrement dit, posé dans un document Drive partagé avec une dizaine de personnes, dont le lien circule par mail depuis deux semaines.

Un jeton d'API n'est pas une donnée de projet. Il ne se transmet pas dans un livrable, il ne se stocke pas à côté du cahier des charges, et une fois qu'il y est passé, il est à considérer comme compromis. Demandez sa régénération et un canal séparé, sans drame, mais par écrit.

## La seule méthode qui tient

Sur ce genre de dossier, j'ai longtemps répondu par de l'analyse : des mails argumentés, précis, avec des titres, des puces et des annexes, qui expliquaient pourquoi telle chose bloquait telle autre. Personne ne les lisait. En retour, j'avais droit au grand classique : « Je ne vois pas trop, on peut faire un call pour en parler ? ». J'ai déjà consacré [un article entier à cette réunion « pour en parler »](/fr/20260326-lareunionpourenparler), qui est un peu la cousine de « c'est intégré » : dans les deux cas, on préfère l'oral parce qu'à l'écrit, on peut vérifier.

Ce qui marche est plus court et moins fatigant : des dépendances et des dates.

- Ce qui est bloqué, et par quoi exactement.
- Ce qui est reçu, et quand.
- Le décompte démarre à réception, pas à l'annonce.

Ça ne se lit pas comme un reproche, donc ça ne se discute pas comme un reproche. Ça se lit comme un fait.

Et surtout, tout par écrit, dans un canal visible par tout le monde. Pas de message privé sur les sujets qui engagent une date. Non par méfiance, mais parce que le jour où l'échéance saute, la seule chose qui vous protège, c'est un historique daté que personne ne peut réécrire. La mémoire des gens, elle, devient très créative après une échéance ratée.

## Ce que je fais maintenant, systématiquement

1. Je vérifie chaque annonce dans les fichiers avant d'intégrer. Trente secondes.
2. J'envoie le gabarit vide avec la demande, au lieu de décrire ce que je veux.
3. Je demande une fenêtre de validation chiffrée.
4. Je propose la délégation de sous-domaine avant d'accepter le mode ticket.
5. Je réponds en dépendances et en dates, jamais en analyse, et jamais en call.

Rien de tout ça n'est de la défiance. C'est simplement ce qui reste quand on a compris qu'un livrable annoncé n'est pas un livrable reçu. Vérifiez, ça prend trente secondes.

---
*Photo : [Ketut Subiyanto](https://www.pexels.com/photo/4584385/), Pexels.*
