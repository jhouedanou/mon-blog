---
title: "Sharp : transformer un vieil iMac en écran secondaire, sans câble coûteux ni prise de tête"
createdAt: "2026-09-29T20:30:00Z"
image: "/images/articles/sharp-imac-ecran-secondaire.webp"
description: "Sharp est une application gratuite et open source qui transforme un ancien iMac en deuxième écran pour un Mac récent, même Apple Silicon. Il suffit d'un câble Ethernet. Ce qu'il faut, comment l'installer en cinq étapes, et ses limites."
searchIntent: "Comment utiliser un vieil iMac comme écran secondaire d'un MacBook ou d'un Mac Apple Silicon, sans Target Display Mode et sans acheter de câble ou d'adaptateur cher ?"
tags: ["tutoriel", "apple", "macos", "mac", "open-source", "matériel", "productivité"]
---

# Sharp : transformer un vieil iMac en écran secondaire, sans câble coûteux ni prise de tête

Beaucoup d'entre nous ont un vieil iMac dans un coin. L'écran est encore très beau. L'ordinateur derrière, lui, est devenu lent, et macOS ne le met plus à jour.

L'idée est simple : garder l'écran et s'en servir comme deuxième moniteur pour un Mac plus récent. En pratique, c'était compliqué. Jusqu'à **Sharp**, une application gratuite et open source repérée sur [Reddit (r/iMac)](https://www.reddit.com/r/iMac/comments/1wsm7f8/use_your_imac_as_a_highresolution_display_over/). Elle fait le travail avec un simple câble Ethernet.

![Un MacBook et un iMac affichent la même image grâce à Sharp, en mode recopie](/images/articles/sharp-imac-ecran-secondaire.webp)

## Pourquoi c'était compliqué avant

Apple proposait le **mode d'affichage cible** (*Target Display Mode*). Il permettait d'utiliser un iMac comme écran. Mais il a trois gros défauts :

- il marche seulement avec **certains iMac de 2009 à 2014** ;
- il ne marche **pas avec les Mac Apple Silicon** (M1, M2, M3…) ;
- les iMac Retina 5K n'ont **jamais** été compatibles.

Autre piste : **AirPlay vers Mac**. Mais l'iMac doit dater de 2019 ou après. Les plus anciens ne peuvent pas recevoir.

Il restait donc des solutions avec du matériel dédié (comme le boîtier Luna Display), des logiciels payants, ou des bricolages longs à mettre en place.

## Ce que fait Sharp

Sharp a été créé par le développeur **Amine Rostane**. La version 1.0 est sortie fin septembre 2026. Voici ce qu'elle propose :

- **deux Mac reliés par un câble Ethernet**, en direct, sans box ni routeur ;
- deux modes : **Mirror** (le même bureau sur les deux écrans) et **Extend** (l'iMac devient un écran en plus) ;
- le **son** peut sortir par les haut-parleurs de l'iMac ;
- **gratuit et open source** (licence GPLv3), avec le [code sur GitHub](https://github.com/amineross/sharp) ;
- un seul installateur pour les Mac **Intel et Apple Silicon**.

## Pourquoi le texte reste net

Le nom *Sharp* veut dire « net » en anglais. C'est le point fort de l'application.

Le problème de départ : un câble Ethernet classique (gigabit) est trop lent pour envoyer l'image brute. Une image 4K à 60 images par seconde demande environ **douze fois** plus de débit. Il faut donc compresser.

La compression vidéo (H.264) suffit pour un film. Mais sur du texte ou du code, elle rend les lettres floues et les bords baveux.

Sharp combine donc deux méthodes :

1. **Quand l'image bouge** (défilement, vidéo), il envoie une vidéo compressée. L'affichage reste fluide.
2. **Quand l'image s'arrête**, il envoie des petits carrés de 64 × 64 pixels **sans perte**. Ils remplacent la vidéo, morceau par morceau.

Résultat : vous faites défiler une page, c'est fluide. Vous arrêtez pour lire, le texte redevient net, pixel pour pixel.

Chaque carré porte un numéro de version. Sharp le compare à l'image affichée avant de le poser. Un vieux carré ne peut donc pas recouvrir une image plus récente.

## Ce qu'il vous faut

| Élément | Condition |
| --- | --- |
| Mac qui envoie l'image | macOS 12.3 (Monterey) ou plus récent |
| Son vers l'iMac | macOS 14.2 (Sonoma) ou plus récent sur le Mac qui envoie |
| iMac qui affiche | macOS 10.15 (Catalina) ou plus récent, soit un iMac de fin 2012 ou plus récent |
| Câble | un câble Ethernet ordinaire (RJ45) |
| Adaptateur | un adaptateur USB-C vers Ethernet **gigabit**, si votre Mac n'a pas de prise Ethernet |

Deux remarques :

- **Prenez un adaptateur gigabit** (1 Gbit/s). Les modèles à 100 Mbit/s, souvent les moins chers, sont trop lents.
- **Le câble Ethernet ne coûte presque rien.** Vous en avez peut-être déjà un, livré avec votre box. Au total, comptez le prix d'un câble et, au besoin, d'un adaptateur. On est loin des câbles Thunderbolt et des adaptateurs Apple du mode d'affichage cible.

## Installation en cinq étapes

L'application est en anglais. Les noms des boutons sont donc donnés tels qu'ils apparaissent.

### 1. Télécharger Sharp sur les deux Mac

Ouvrez [aminerostane.com/sharp](https://aminerostane.com/sharp) sur **chaque Mac** et téléchargez l'installateur. Il est aussi disponible dans les [versions publiées sur GitHub](https://github.com/amineross/sharp/releases).

### 2. Le mettre dans Applications

Ouvrez l'image disque. Glissez **Sharp** dans le dossier **Applications**, puis lancez-le depuis ce dossier. Faites-le sur les deux Mac.

C'est important : Sharp doit être dans Applications pour rester disponible après un redémarrage.

### 3. Autoriser l'ouverture

Si macOS bloque le premier lancement, allez dans **Réglages Système → Confidentialité et sécurité**, puis cliquez sur **Ouvrir quand même** pour Sharp.

Sur les anciennes versions de macOS, c'est dans **Préférences Système → Sécurité et confidentialité**.

### 4. Choisir le rôle de chaque Mac

**Sur le Mac récent**, choisissez **Send this Mac** (envoyer ce Mac). Autorisez :

- l'**Enregistrement de l'écran** (obligatoire) ;
- l'**Audio système** (seulement si vous voulez le son sur l'iMac).

Si macOS le demande, rouvrez Sharp. Cliquez ensuite sur **Done**.

**Sur l'iMac**, choisissez **Use as a display** (utiliser comme écran).

### 5. Brancher le câble

Reliez les deux Mac avec le câble Ethernet. Sharp trouve l'autre Mac tout seul et choisit la bonne connexion.

Ouvrez Sharp dans la barre des menus. Si vous voyez **Connected** au-dessus du nom de l'autre Mac, c'est bon : l'image passe.

## Recopie ou écran étendu

Sharp démarre en mode **Mirror** : le même bureau sur les deux écrans.

Pour avoir plus de place, choisissez **Extend**. Ensuite, dans **Réglages Système → Moniteurs**, placez les écrans comme sur votre bureau. Il ne reste plus qu'à glisser une fenêtre vers l'iMac.

## Les réglages utiles

Depuis la barre des menus :

- **Curseur** : deux curseurs règlent la taille et la couleur de la souris sur l'iMac.
- **Son** : l'icône de haut-parleur choisit où sort le son (Mac ou iMac).
- **Pause Sharp** : met le flux en pause. Vous reprenez au même endroit.

Dans la fenêtre des réglages (l'icône d'engrenage) :

- **Resolution** : les choix dépendent de l'écran de l'iMac. Par défaut, Sharp reste à une définition équivalente à **2560 × 1440**. Au-delà, les choix sont marqués **Experimental**. Un iMac 5K ne démarre donc pas en 5K par défaut.
- **Start Sharp when I log in** : lance Sharp à l'ouverture de session.
- **Advanced** : garde des réglages différents pour chaque Mac appairé, et permet de choisir la prise Ethernet si vous en avez plusieurs.
- **Reports → Create report** : crée un rapport à joindre à un signalement sur GitHub si quelque chose ne va pas.

## Les limites

Sharp est prometteur, mais il faut savoir ceci :

- **Pas de Wi-Fi.** Le câble Ethernet est obligatoire.
- **Mac vers Mac uniquement.** Pas de PC Windows, pas d'iPad.
- **Pas d'iMac d'avant fin 2012.** Ils ne peuvent pas installer macOS Catalina.
- **Le mode Extend est fragile.** Il utilise une fonction d'Apple qui n'est pas documentée. Une mise à jour de macOS peut le casser. Si ce mode échoue, Sharp repasse de lui-même en Mirror.
- **La 5K n'est pas garantie.** L'auteur n'a pas encore validé les performances à cette définition.
- **L'iMac reste un ordinateur allumé.** Il consomme plus qu'un simple écran. Si l'un des deux Mac se met en veille, le flux s'arrête. Il reprend au réveil.
- **C'est une version 1.0**, d'un seul développeur. Attendez-vous à quelques bugs.

## En résumé

Si un iMac de 2012 à 2020 dort chez vous, et que vous avez un Mac plus récent, Sharp vous donne un deuxième écran pour le prix d'un câble Ethernet. L'installation prend quelques minutes, et le texte reste net.

Pour travailler en déplacement, un iMac ne vous suivra pas. Dans ce cas, lisez mon retour sur [le double moniteur portable](/fr/20260810-double-moniteur-portable-blackview-dcm6).

**Sources :**

- [Article de présentation de Sharp](https://aminerostane.com/articles/sharp/), par Amine Rostane
- [Code source de Sharp sur GitHub](https://github.com/amineross/sharp)
- [Discussion sur Reddit (r/iMac)](https://www.reddit.com/r/iMac/comments/1wsm7f8/use_your_imac_as_a_highresolution_display_over/)

---
*[Jean-Luc Houédanou](https://houedanou.com)*
