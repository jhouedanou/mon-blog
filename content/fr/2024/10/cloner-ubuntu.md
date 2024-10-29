
# 🚀 Comment cloner Ubuntu sans perdre ses données et son âme

Quand votre SSD de votre ordinateur sous Ubuntu commence à tousser et que les messages "espace disque insuffisant" deviennent la notification la plus fréquente, il est temps d'agir. Dans mon cas, passer à un SSD de 256 Go va me permettre de respirer un peu (et à mon HP Pro X2 aussi).

### 🎯 Ce Dont Vous Aurez Besoin

- Un nouveau SSD (dans mon cas, 256 Go)
- Votre Ubuntu actuel fonctionnel
- Une clé USB bootable (au cas où)
- 30 minutes de votre temps (plus le temps du café)

### 🛠 La Procédure Étape par Étape

#### 1. Identification des Disques

Première étape cruciale, identifier qui est qui dans notre joyeux système :

*sudo fdisk -l*

Dans mon cas avec le HP Pro X2, le disque source est /dev/sda et le nouveau SSD est /dev/sdb.


#### 2. Le Script de Clonage

Créez un fichier [clone-ubuntu.sh](https://clone-ubuntu.sh) :

```
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

# Clonage
echo "Clonage en cours... Parfait moment pour un café ☕"
dd if=$DISQUE_SOURCE of=$DISQUE_DESTINATION bs=64K conv=noerror,sync status=progress

# Extension de la partition
echo "Extension de la partition..."
parted $DISQUE_DESTINATION resizepart 2 100%
resize2fs "${DISQUE_DESTINATION}2"

echo "Clonage terminé ! 🎉"
```


#### 3. Exécution

sudo bash [clone-ubuntu.sh](https://clone-ubuntu.sh)

#### 4. Vérification


Une fois le clonage terminé :

sudo fdisk -l

Vérifiez que la nouvelle partition utilise bien tout l'espace disponible.

### 🎯 Points Importants

* Vérifiez les lettres correspondants à chaque disque dur;
* Sauvegarde : Même si je fais confiance à mon script, j'ai toutefois fait une sauvegarde avant. On n'est jamais trop prudent !
* Vérification des noms de disques : Je répète .\
C’est LA partie où il ne faut pas se tromper
* Patience : Le clonage peut prendre un certain temps, selon la taille de vos données