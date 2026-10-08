---
title: "Comment cloner Ubuntu sans perdre ses données et son âme"
image: "/images/articles/pingui.webp"
createdAt: "2024-10-29"
updatedAt: "2026-10-08T12:00:00Z"
id: 2024-10-29
description: "Cloner Ubuntu vers un SSD plus grand avec dd : identifier les disques, lancer le script, agrandir la partition et éviter les erreurs qui effacent tout."
searchIntent: "Comment cloner Ubuntu vers un SSD plus grand sans perdre ses données ni casser son installation."
tags: ["tutoriel", "dev", "tech"]
summary: "Un tutoriel étape par étape pour cloner votre système Ubuntu vers un nouveau SSD plus spacieux. Ce guide inclut l'identification des disques, un script de clonage complet avec dd, l'extension des partitions et les vérifications nécessaires pour assurer une migration réussie."
---

Quand le SSD de votre ordinateur sous Ubuntu commence à tousser et que les messages « espace disque insuffisant » deviennent la notification la plus fréquente, il est temps d'agir. Dans mon cas, passer à un SSD de 256 Go va me permettre de respirer un peu (et à mon HP Pro x2 aussi).

## 🎯 Ce dont vous aurez besoin

- Un nouveau SSD (dans mon cas, 256 Go)
- Votre Ubuntu actuel fonctionnel
- Une clé USB bootable (au cas où)
- 30 minutes de votre temps (plus le temps du café)

## 🛠 La procédure étape par étape

### 1. Identification des disques

Première étape cruciale : identifier qui est qui dans notre joyeux système :

```bash
sudo fdisk -l
```

Dans mon cas, avec le HP Pro x2, le disque source est `/dev/sda` et le nouveau SSD est `/dev/sdb`.

### 2. Le script de clonage

Créez un fichier `clone-ubuntu.sh` :

```bash
#!/bin/bash

# Vérification des privilèges root
if [ "$EUID" -ne 0 ]; then
  echo "Ce script doit être exécuté en tant que root (utilisez sudo)"
  exit 1
fi

# Configurez ces variables selon vos disques
DISQUE_SOURCE="/dev/sda"
DISQUE_DESTINATION="/dev/sdb"

# Vérifications de sécurité
if [ ! -b "$DISQUE_SOURCE" ] || [ ! -b "$DISQUE_DESTINATION" ]; then
    echo "Erreur: Un des disques n'existe pas"
    exit 1
fi

echo "ATTENTION: Cette opération va effacer toutes les données sur $DISQUE_DESTINATION"
echo "Disque source: $DISQUE_SOURCE"
echo "Disque destination: $DISQUE_DESTINATION"
read -p "Êtes-vous sûr de vouloir continuer? (o/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    exit 1
fi

# Clonage
echo "Clonage en cours... Parfait moment pour un café ☕"
dd if=$DISQUE_SOURCE of=$DISQUE_DESTINATION bs=64K conv=noerror,sync status=progress

# Extension de la partition
echo "Extension de la partition..."
parted $DISQUE_DESTINATION resizepart 2 100%
resize2fs "${DISQUE_DESTINATION}2"

echo "Clonage terminé ! 🎉"
```

### 3. Exécution

Idéalement, lancez le script depuis une session live (la fameuse clé USB bootable) plutôt que depuis l'Ubuntu en cours d'utilisation : la [documentation d'Arch Linux sur dd](https://wiki.archlinux.org/title/Dd#Disk_cloning_and_restore) recommande de cloner depuis un environnement live, ce qui évite de copier un système qui se modifie pendant la copie.

```bash
sudo bash clone-ubuntu.sh
```

### 4. Vérification

Une fois le clonage terminé :

```bash
sudo fdisk -l
```

Vérifiez que la nouvelle partition utilise bien tout l'espace disponible.

## 🎯 Points importants

- Vérifiez les lettres correspondant à chaque disque dur ;
- Sauvegarde : même si je fais confiance à mon script, j'ai tout de même fait une sauvegarde avant. On n'est jamais trop prudent !
- Vérification des noms de disques : je répète.
  C'est LA partie où il ne faut pas se tromper ;
- Patience : le clonage peut prendre un certain temps, selon la taille de vos données ;
- Disque fatigué : si le disque source présente des erreurs de lecture, ne comptez pas sur l'option `conv=noerror,sync` du script. La [documentation d'Arch Linux](https://wiki.archlinux.org/title/Dd#Cloning_an_entire_hard_disk) déconseille ces options dans ce cas et recommande ddrescue ;
- Identifiants en double : dd copie tout, y compris les UUID des partitions ([même source](https://wiki.archlinux.org/title/Dd#Cloning_an_entire_hard_disk)). Débranchez l'ancien disque avant de redémarrer sur le nouveau, pour que le système ne confonde pas les deux.

*Mise à jour du 8 octobre 2026 : ajout de précautions sourcées (clonage depuis une session live, disque source avec erreurs de lecture, UUID identiques après le clonage).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — clonneur de manchots*
