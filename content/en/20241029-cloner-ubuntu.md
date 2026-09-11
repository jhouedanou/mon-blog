---
title: "How to clone Ubuntu without losing your data or your soul"
image: "/images/articles/pingui.webp"
createdAt: "2024-10-29"
id: 2024-10-29
description: "A practical guide to cloning your Ubuntu system to a new SSD without losing your data. Learn how to easily migrate your Linux installation with a simple and effective script."
searchIntent: "How to clone Ubuntu to a bigger SSD without losing data or breaking the installation."
tags: ["tutorial", "dev", "tech"]
summary: "Un tutoriel étape par étape pour cloner votre système Ubuntu vers un nouveau SSD plus spacieux. Ce guide inclut l'identification des disques, un script de clonage complet avec dd, l'extension des partitions et les vérifications nécessaires pour assurer une migration réussie."

# Open Graph Meta Tags
og:
  title: "Comment cloner Ubuntu sans perdre ses données et son âme"
  description: "Guide pratique pour cloner votre système Ubuntu vers un nouveau SSD sans perdre vos données. Un tutoriel complet avec script de clonage."
  image: "/images/articles/pingui.webp"
  url: "/fr/cloner-ubuntu"
  type: "article"
  site_name: "Jean-Luc Houédanou"
  locale: "fr_FR"

# Twitter Card Meta Tags
twitter:
  card: "summary_large_image"
  title: "Comment cloner Ubuntu sans perdre ses données et son âme"
  description: "Tutoriel complet pour migrer Ubuntu vers un nouveau SSD : identification des disques, script de clonage et extension des partitions."
  image: "/images/articles/pingui.webp"
  creator: "@jeanluchouedanou"

# Article Meta Tags
article:
  published_time: "2024-10-29T00:00:00Z"
  modified_time: "2024-10-29T00:00:00Z"
  author: "Jean-Luc Houédanou"
  section: "Linux"
  tag: ["cloner Ubuntu", "migration SSD Ubuntu", "dd Linux", "clone système Linux", "augmenter espace disque Ubuntu", "script clonage Linux", "sauvegarde Ubuntu", "resize partition Linux", "fdisk", "parted"]

# Schema.org structured data
schema:
  type: "Article"
  headline: "Comment cloner Ubuntu sans perdre ses données et son âme"
  description: "Guide pratique pour cloner votre système Ubuntu vers un nouveau SSD sans perdre vos données. Apprenez à migrer facilement votre installation Linux avec un script simple et efficace."
  image: "/images/articles/pingui.webp"
  datePublished: "2024-10-29"
  dateModified: "2024-10-29"
  author: "Jean-Luc Houédanou"
  publisher: "Jean-Luc Houédanou"
---

# 🚀 How to clone Ubuntu without losing your data or your soul

When the SSD in your Ubuntu machine starts coughing and "insufficient disk space" messages become your most frequent notification, it is time to act. In my case, moving to a 256 GB SSD will let me breathe a little (and my HP Pro X2 too).

## 🎯 What You Will Need

- A new SSD (in my case, 256 GB)
- Your current, working Ubuntu
- A bootable USB stick (just in case)
- 30 minutes of your time (plus coffee time)

## 🛠 The Step by Step Procedure

### 1. Identifying the Disks

First crucial step, figuring out who is who in our merry system:

```bash
sudo fdisk -l
```

In my case with the HP Pro X2, the source disk is /dev/sda and the new SSD is /dev/sdb.

### 2. The Cloning Script

Create a file called `clone-ubuntu.sh`:

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

### 3. Running It

```bash
sudo bash clone-ubuntu.sh
```

### 4. Checking

Once the cloning is finished:

```bash
sudo fdisk -l
```

Check that the new partition really uses all the available space.

## 🎯 Important Points

- Double-check the letters assigned to each hard drive;
- Backup: even though I trust my script, I still made a backup beforehand. You can never be too careful!
- Checking the disk names: I repeat. 
  This is THE part where you must not get it wrong
- Patience: cloning can take a while, depending on how much data you have

````

---
*[Jean Luc Houédanou](https://houedanou.com) — cloner of penguins*
