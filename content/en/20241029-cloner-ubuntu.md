---
title: "How to clone Ubuntu without losing your data or your soul"
image: "/images/articles/pingui.webp"
createdAt: "2024-10-29"
updatedAt: "2026-10-08T12:00:00Z"
id: 2024-10-29
description: "Cloning Ubuntu to a bigger SSD with dd: identify the disks, run the script, grow the partition and avoid the mistakes that wipe everything out."
searchIntent: "How to clone Ubuntu to a bigger SSD without losing data or breaking the installation."
tags: ["tutorial", "dev", "tech"]
summary: "A step-by-step tutorial for cloning your Ubuntu system to a new, roomier SSD. This guide covers identifying the disks, a complete cloning script using dd, extending the partitions and the checks needed to make sure the migration succeeds."
---

When the SSD in your Ubuntu machine starts coughing and "insufficient disk space" messages become your most frequent notification, it is time to act. In my case, moving to a 256 GB SSD will let me breathe a little (and my HP Pro x2 too).

## 🎯 What You Will Need

- A new SSD (in my case, 256 GB)
- Your current, working Ubuntu
- A bootable USB stick (just in case)
- 30 minutes of your time (plus coffee time)

## 🛠 The Step by Step Procedure

### 1. Identifying the Disks

First crucial step: figuring out who is who in our merry system:

```bash
sudo fdisk -l
```

In my case, with the HP Pro x2, the source disk is `/dev/sda` and the new SSD is `/dev/sdb`.

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

Ideally, run the script from a live session (that bootable USB stick) rather than from the Ubuntu you are currently using: the [Arch Linux documentation on dd](https://wiki.archlinux.org/title/Dd#Disk_cloning_and_restore) recommends cloning from a live environment, which avoids copying a system that keeps changing during the copy.

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
  This is THE part where you must not get it wrong;
- Patience: cloning can take a while, depending on how much data you have;
- Tired disk: if the source disk has read errors, do not rely on the script's `conv=noerror,sync` option. The [Arch Linux documentation](https://wiki.archlinux.org/title/Dd#Cloning_an_entire_hard_disk) advises against these options in that case and recommends ddrescue;
- Duplicate identifiers: dd copies everything, partition UUIDs included ([same source](https://wiki.archlinux.org/title/Dd#Cloning_an_entire_hard_disk)). Unplug the old disk before rebooting on the new one, so the system does not mix the two up.

*Updated October 8, 2026: added sourced precautions (cloning from a live session, source disk with read errors, identical UUIDs after cloning).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — cloner of penguins*
