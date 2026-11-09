---
title: "Sunshine et Moonlight : l'iMac 4K en écran"
createdAt: "2026-11-09T12:00:00Z"
draft: true
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "Pas de mode d'affichage cible sur l'iMac 4K 2017 ? Sunshine et Moonlight en font l'écran d'un PC sous Hyprland, par un câble Thunderbolt. Pas à pas."
summary: "L'iMac Retina 4K de 2017 n'a pas de mode d'affichage cible. Avec Sunshine sur un PC sous Hyprland, Moonlight sur l'iMac et un câble Thunderbolt, il devient quand même un deuxième écran, avec le son et son propre clavier."
searchIntent: "Comment utiliser un iMac Retina 4K 2017, qui n'a pas de mode d'affichage cible, comme écran d'un PC sous Linux (Hyprland, Omarchy) avec Sunshine et Moonlight et un câble Thunderbolt ?"
tags: ["tutoriel", "apple", "macos", "mac", "linux", "omarchy", "open-source", "matériel"]
---

Oui, je sais, j'insiste sur le sujet, mais je trouve juste que cet ordinateur est trop beau pour le laisser prendre la poussière.

Ce billet explique comment faire de mon iMac Retina 4K 21,5 pouces de 2017 l'écran de mon MacBook Pro 2017 sous [Omarchy](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Il faut deux logiciels gratuits, **Sunshine** sur le MacBook et **Moonlight** sur l'iMac, et un câble Thunderbolt entre les deux. On ne touche pas à l'iMac.

C'est mon quatrième billet sur cet iMac, après [Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), le [SSD externe](/fr/20261014-installer-macos-ssd-externe-imac-2017) et [OpenDisplay](/fr/20261030-opendisplay-vieil-imac-ecran-mac-linux).

## Pourquoi pas un simple câble vidéo

Sur cet iMac, il n'y a pas de **mode d'affichage cible** (*Target Display Mode*). Apple le réserve aux iMac de 2009 à mi-2014, sous macOS High Sierra ou plus ancien ([page Apple](https://support.apple.com/fr-fr/105126){target="_blank" rel="noopener"}). Aucun iMac Retina n'est sur la liste.

Les ports Thunderbolt 3 de l'iMac envoient l'image vers un écran. Ils ne la reçoivent pas. Aucun câble ni réglage ne change ça.

Il reste deux voies :

- **le logiciel** : la méthode de ce billet. Le câble sert de liaison réseau rapide, pas de câble vidéo ;
- **le matériel** : retirer la carte mère de l'iMac et la remplacer par une carte contrôleur faite pour sa dalle. Sur ce modèle, la dalle est une LG LM215UH1-SDB1, d'après le [démontage d'iFixit](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}. Vérifiez quand même l'étiquette au dos de la vôtre avant d'acheter. L'iMac devient un vrai écran 4K branché en direct, mais ce n'est plus un ordinateur.

Je commence par le logiciel : c'est gratuit, et c'est réversible.

## Sunshine et Moonlight en bref

- **Sunshine** est un serveur de streaming open source. Il filme un écran et l'envoie en vidéo sur le réseau. Il est fait pour le jeu, mais il marche avec n'importe quel bureau.
- **Moonlight** est le client. Sur l'iMac, il reçoit la vidéo et l'affiche en plein écran.
- **Hyprland**, le gestionnaire de fenêtres d'Omarchy, crée un **écran virtuel**. Le MacBook le voit comme un vrai écran en plus. Sunshine filme cet écran virtuel, et l'iMac l'affiche.
- **Le câble Thunderbolt** relie les deux machines en réseau direct, sans box ni Wi-Fi.
- **Dans l'autre sens**, le clavier et la souris de l'iMac pilotent le MacBook. Sunshine envoie aussi le son. Les trois sont activés par défaut ([configuration de Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}).

![Schéma du montage. Sur le MacBook Pro 2017 sous Omarchy, Hyprland crée un écran virtuel nommé imac, Sunshine le filme et le compresse en vidéo. La vidéo et le son passent par un câble Thunderbolt, qui sert de réseau direct entre le MacBook (10.0.0.1) et l'iMac (10.0.0.2). Sur l'iMac Retina 4K 2017, Moonlight affiche le bureau en 4096 × 2304. Dans l'autre sens, le clavier et la souris de l'iMac pilotent le MacBook. Il faut créer l'écran virtuel avant de lancer Sunshine.](/images/articles/sunshine-moonlight-schema.svg)

## Ce qu'il vous faut

| Élément | Détail |
| --- | --- |
| L'iMac | ici un iMac Retina 4K 21,5 pouces de 2017, sous macOS Ventura |
| Le PC qui envoie | ici un MacBook Pro 2017 sous Omarchy (Hyprland) |
| Le câble | un câble Thunderbolt 3, branché sur un port Thunderbolt de chaque machine |
| Les logiciels | Sunshine sur le PC, Moonlight sur l'iMac, tous les deux gratuits |

## Étape 1 : le câble Thunderbolt comme réseau

Branchez le câble entre les deux machines.

**Sur l'iMac** : **Réglages Système → Réseau → Pont Thunderbolt → Détails → TCP/IP**. Dans **Configurer IPv4**, choisissez **Manuellement**, puis :

- adresse IP : `10.0.0.2`
- masque de sous-réseau : `255.255.255.0`

**Sur le MacBook (Omarchy)** :

```bash
sudo modprobe thunderbolt-net
sudo ip addr add 10.0.0.1/24 dev thunderbolt0
sudo ip link set thunderbolt0 up
ping 10.0.0.2
```

Linux utilise le protocole réseau Thunderbolt d'Apple. Avec un Mac en face, le pilote `thunderbolt-net` se charge donc tout seul quand on branche le câble ([documentation du noyau Linux](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}). La commande `modprobe` ne sert qu'au cas où.

Si `ping` ne répond pas, lancez `boltctl list`. Si l'iMac y apparaît comme non autorisé, autorisez-le avec `sudo boltctl enroll --policy auto <uuid>`, en recopiant l'identifiant affiché.

Les commandes `ip` s'effacent au redémarrage. Pour garder l'adresse, Omarchy utilise systemd-networkd : créez le fichier `/etc/systemd/network/50-thunderbolt.network` :

```ini
[Match]
Name=thunderbolt0

[Network]
Address=10.0.0.1/24
```

Puis rechargez la configuration avec `sudo networkctl reload`.

## Étape 2 : l'écran virtuel dans Hyprland

Créez l'écran virtuel, que j'appelle `imac` :

```bash
hyprctl output create headless imac
```

Dans `~/.config/hypr/monitors.conf`, donnez-lui la définition de l'iMac :

```ini
monitor = imac, 4096x2304@60, auto, 2
```

- `4096x2304` est la définition de la dalle de l'iMac. Avec l'échelle `2`, le bureau fait 2048 × 1152 points, et le texte est net comme sur un écran Retina.
- Si l'image saccade, passez à `monitor = imac, 2048x1152@60, auto, 1`. C'est plus léger, mais moins net.

## Étape 3 : Sunshine sur le MacBook

Installez Sunshine depuis l'AUR :

```bash
yay -S sunshine-bin
```

Il arrive qu'une mise à jour d'Arch casse ce paquet. Dans ce cas, LizardByte, l'éditeur de Sunshine, a aussi son propre dépôt pour Arch : voir sa [documentation](https://docs.lizardbyte.dev/projects/sunshine/latest/){target="_blank" rel="noopener"}.

Dans `~/.config/sunshine/sunshine.conf`, dites à Sunshine quel écran filmer :

```ini
capture = wlr
output_name = imac
```

`wlr` est la méthode de capture des environnements Wayland comme Hyprland.

Le son part vers l'iMac par défaut. Si vous préférez l'entendre sur le MacBook, ajoutez `stream_audio = disabled`.

Lancez `sunshine`, ouvrez `https://localhost:47990` dans le navigateur et créez un identifiant.

⚠️ **Créez l'écran virtuel avant de lancer Sunshine.** Sunshine lit `output_name` une seule fois, au démarrage. Si l'écran `imac` n'existe pas encore, l'iMac affiche l'écran du MacBook, ou une image noire ([sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"}).

Pour que tout se lance dans le bon ordre à chaque démarrage, ajoutez cette ligne dans `~/.config/hypr/autostart.conf` :

```ini
exec-once = hyprctl output create headless imac && sunshine
```

## Étape 4 : Moonlight sur l'iMac

1. Installez Moonlight, depuis [moonlight-stream.org](https://moonlight-stream.org/){target="_blank" rel="noopener"} ou avec Homebrew :

   ```bash
   brew install --cask moonlight
   ```

2. Ouvrez Moonlight. Cliquez sur **+** et ajoutez l'hôte `10.0.0.1`.
3. Un code PIN s'affiche. Tapez-le dans l'onglet **PIN** de la page web de Sunshine, sur le MacBook.
4. Dans les réglages de Moonlight, choisissez :
   - résolution : la définition de l'iMac, 4096 × 2304 (« Native » si la liste la propose, sinon 4K) ;
   - images par seconde : 60 ;
   - codec vidéo : HEVC ;
   - débit : élevé. Le câble a de la marge.
5. Lancez **Desktop**.

## Étape 5 : utiliser l'écran

L'écran `imac` se comporte comme un écran externe. Faites glisser la souris du MacBook vers lui, ou envoyez-y un espace de travail :

```bash
hyprctl dispatch moveworkspacetomonitor 5 imac
```

Remplacez `5` par le numéro de l'espace de travail à déplacer.

## Si ça ne marche pas

- **Moonlight ne trouve pas le MacBook** : vérifiez d'abord que `ping 10.0.0.2` répond. Puis regardez le pare-feu avec `sudo ufw status`. S'il est actif, autorisez le câble : `sudo ufw allow in on thunderbolt0`.
- **L'iMac affiche l'écran du MacBook ou une image noire** : Sunshine a démarré avant l'écran virtuel. Quittez Sunshine, vérifiez que `imac` apparaît dans `hyprctl monitors`, puis relancez `sunshine`.
- **L'image est floue** : la résolution de Moonlight ne correspond pas à celle de l'écran virtuel. Mettez la même des deux côtés.

## Sunshine et Moonlight, ou OpenDisplay ?

J'ai déjà testé [OpenDisplay sur ce même MacBook sous Omarchy](/fr/20261030-opendisplay-vieil-imac-ecran-mac-linux), et il marche : l'iMac affiche bien le bureau étendu. Mais sous Linux, OpenDisplay compresse l'image avec le processeur seul. Sur mon MacBook, ses journaux montraient environ 24 ms pour compresser une image, et 60 à 100 ms entre la capture et l'envoi.

Sunshine, lui, peut compresser avec la puce graphique, par VA-API sur les puces Intel et AMD ([README de Sunshine](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"}). Pour la 4K, Sunshine conseille au moins une Intel HD Graphics 510. La puce du MacBook Pro 2017 est plus récente.

Les deux méthodes font le même travail : filmer un écran virtuel, le compresser en vidéo, l'afficher sur l'iMac. Les différences :

| | OpenDisplay | Sunshine et Moonlight |
| --- | --- | --- |
| Installation | deux applis, presque rien à régler | plus d'étapes (réseau, écran virtuel, configuration) |
| Compression vidéo sous Linux | par le processeur seul, en H.264 | par la puce graphique (VA-API), en HEVC si le pilote le permet |
| Son sur l'iMac | non | oui |
| Clavier et souris de l'iMac | ne pilotent pas le PC | pilotent le PC |
| Usage prévu | un écran en plus | le jeu à distance, adapté ici en écran |

Si OpenDisplay vous suffit, gardez-le : c'est plus simple. Si le processeur du MacBook peine, ou si vous voulez le son et le clavier de l'iMac, essayez Sunshine et Moonlight.

**Sources :**

- [Utiliser un iMac comme écran (mode d'affichage cible)](https://support.apple.com/fr-fr/105126){target="_blank" rel="noopener"}, assistance Apple
- [Démontage de l'iMac 21,5 pouces Retina 4K (2017)](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}, iFixit : référence de la dalle
- [Thunderbolt, section « Networking over Thunderbolt cable »](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}, documentation du noyau Linux
- [Configuration de Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"} : `capture`, `output_name`, `stream_audio`, clavier et souris
- [README de Sunshine](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"} : encodage par la puce graphique (VA-API)
- [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"} : Sunshine avec un écran virtuel Hyprland
- [Using hyprctl](https://wiki.hypr.land/0.49.0/Configuring/Using-hyprctl/){target="_blank" rel="noopener"}, wiki Hyprland : `hyprctl output create`
- [Moonlight](https://moonlight-stream.org/){target="_blank" rel="noopener"}, site officiel
- [Paquet sunshine-bin](https://aur.archlinux.org/packages/sunshine-bin){target="_blank" rel="noopener"}, AUR

---
*[Jean-Luc Houédanou](https://houedanou.com)*
