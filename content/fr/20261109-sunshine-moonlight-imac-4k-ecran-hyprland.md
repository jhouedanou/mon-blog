---
title: "Sunshine et Moonlight : l'iMac 4K en écran"
createdAt: "2026-11-09T12:00:00Z"
draft: true
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "Pas de mode d'affichage cible sur l'iMac 4K 2017 ? Sunshine et Moonlight en font l'écran d'un PC sous Hyprland, par un câble Thunderbolt. Pas à pas."
summary: "L'iMac Retina 4K de 2017 n'a pas de mode d'affichage cible. Avec Sunshine sur un PC sous Omarchy, Moonlight sur l'iMac et un câble Thunderbolt, il devient quand même un deuxième écran. Il joue aussi le son, et son clavier et sa souris pilotent le PC."
searchIntent: "Comment utiliser un iMac Retina 4K 2017, qui n'a pas de mode d'affichage cible, comme écran d'un PC sous Linux (Hyprland, Omarchy) avec Sunshine et Moonlight et un câble Thunderbolt ?"
tags: ["tutoriel", "apple", "macos", "mac", "linux", "omarchy", "open-source", "matériel"]
---

Oui, je sais, j'insiste sur le sujet, mais je trouve juste que cet ordinateur est trop beau pour le laisser prendre la poussière.

Voici comment faire de mon iMac Retina 4K 21,5 pouces de 2017 l'écran de mon MacBook Pro 2017 sous [Omarchy](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Il faut deux logiciels gratuits, **Sunshine** sur le MacBook et **Moonlight** sur l'iMac, et un câble Thunderbolt entre les deux. Pas besoin d'ouvrir l'iMac.

C'est mon quatrième billet sur cet iMac, après [Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), le [SSD externe](/fr/20261014-installer-macos-ssd-externe-imac-2017) et [OpenDisplay](/fr/20261030-opendisplay-vieil-imac-ecran-mac-linux).

## Pourquoi pas un simple câble vidéo

Sur cet iMac, il n'y a pas de **mode d'affichage cible** (*Target Display Mode*). Apple le réserve à certains iMac de 2009 à mi-2014, sous macOS High Sierra ou plus ancien ([page Apple](https://support.apple.com/fr-fr/105126){target="_blank" rel="noopener"}). Aucun iMac Retina n'est sur la liste.

Les ports Thunderbolt 3 de l'iMac envoient l'image vers un écran externe ([fiche technique Apple](https://support.apple.com/fr-fr/112026){target="_blank" rel="noopener"}). Ils ne la reçoivent pas. Aucun câble ni réglage ne change ça.

Il reste deux voies :

- **le logiciel** : la méthode de ce billet. Le câble sert de liaison réseau rapide, pas de câble vidéo ;
- **le matériel** : retirer la carte mère de l'iMac et la remplacer par une carte contrôleur faite pour sa dalle. Sur ce modèle, la dalle est une LG LM215UH1-SDB1, d'après le [démontage d'iFixit](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}. Vérifiez quand même l'étiquette au dos de la vôtre avant d'acheter. L'iMac devient un vrai écran 4K branché en direct, mais ce n'est plus un ordinateur.

Je commence par le logiciel : c'est gratuit, et c'est réversible.

## Sunshine et Moonlight en bref

- **Sunshine** est un serveur de streaming open source. Il filme un écran et l'envoie en vidéo sur le réseau. Il est fait pour le jeu, mais il peut aussi diffuser le bureau entier.
- **Moonlight** est le client. Sur l'iMac, il reçoit la vidéo et l'affiche en plein écran.
- **Hyprland**, le gestionnaire de fenêtres d'Omarchy, crée un **écran virtuel**. Le MacBook le voit comme un vrai écran en plus. Sunshine filme cet écran virtuel, et l'iMac l'affiche.
- **Le câble Thunderbolt** relie les deux machines en réseau direct, sans box ni Wi-Fi.
- **Le son** suit la vidéo vers l'iMac. **Dans l'autre sens**, le clavier et la souris de l'iMac pilotent le MacBook. Son, clavier et souris sont activés par défaut ([configuration de Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}).

![Schéma : Hyprland crée un écran virtuel sur le MacBook, Sunshine le compresse et l'envoie par le câble Thunderbolt (10.0.0.1 vers 10.0.0.2), Moonlight l'affiche sur l'iMac avec le son. Le clavier et la souris de l'iMac pilotent le MacBook. L'écran virtuel doit exister avant que Sunshine démarre.](/images/articles/sunshine-moonlight-schema.svg)

## Ce qu'il vous faut

| Élément | Détail |
| --- | --- |
| L'iMac | ici un iMac Retina 4K 21,5 pouces de 2017, sous macOS Ventura |
| Le PC qui envoie | ici un MacBook Pro 2017 sous Omarchy 4 (Hyprland) |
| Le câble | un câble Thunderbolt 3, branché sur un port Thunderbolt de chaque machine |
| Les logiciels | Sunshine sur le PC, Moonlight sur l'iMac, tous les deux gratuits |

Les commandes de ce billet sont écrites pour **Omarchy 4**. Cette version règle Hyprland dans des fichiers Lua (`~/.config/hypr/*.lua`) et gère le réseau avec NetworkManager ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/35-networking.md){target="_blank" rel="noopener"}). Sur une autre distribution, l'idée reste la même, mais les fichiers changent.

## Étape 1 : le câble Thunderbolt comme réseau

Branchez le câble entre les deux machines.

**Sur l'iMac** : **Réglages Système → Réseau → Pont Thunderbolt → Détails → TCP/IP**. Dans **Configurer IPv4**, choisissez **Manuellement**, puis :

- adresse IP : `10.0.0.2`
- masque de sous-réseau : `255.255.255.0`

**Sur le MacBook (Omarchy)**, créez une connexion fixe pour le câble avec NetworkManager :

```bash
nmcli connection add type ethernet ifname thunderbolt0 con-name imac ipv4.method manual ipv4.addresses 10.0.0.1/24
nmcli connection up imac
ping 10.0.0.2
```

NetworkManager garde cette connexion : elle revient toute seule à chaque branchement.

Si l'autre machine est un Mac, le pilote `thunderbolt-net` se charge tout seul quand on branche le câble ([documentation du noyau Linux](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}). Si `nmcli` ne trouve pas `thunderbolt0`, chargez-le à la main avec `sudo modprobe thunderbolt-net`, puis recommencez.

## Étape 2 : l'écran virtuel dans Hyprland

Dans `~/.config/hypr/monitors.lua`, ajoutez une ligne pour l'écran virtuel, que j'appelle `imac` :

```lua
hl.monitor({ output = "imac", mode = "3840x2160@60", position = "auto", scale = 2 })
```

C'est la même syntaxe que les exemples déjà présents dans ce fichier ([manuel d'Omarchy, écrans](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"}). Cette ligne ne fait rien tant que l'écran `imac` n'existe pas.

Puis créez l'écran virtuel :

```bash
hyprctl output create headless imac
```

Pourquoi 3840 × 2160, alors que la dalle de l'iMac fait 4096 × 2304 ?

- **3840 × 2160** est la 4K standard. Avec l'échelle `2`, le bureau fait 1920 × 1080 points, et le texte reste fin. L'iMac agrandit l'image d'environ 7 % pour remplir sa dalle : le texte est un peu moins net qu'en natif.
- **4096 × 2304** colle à la dalle, mais cette taille dépasse les limites courantes du HEVC (niveaux 5.x : 8 912 896 pixels par image au plus, contre 9 437 184 ici). Selon la puce, la compression ou l'affichage peut échouer ([niveaux du HEVC](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding_tiers_and_levels){target="_blank" rel="noopener"}). Essayez si vous voulez, avec la même résolution dans Moonlight.
- **Si l'image saccade**, passez à `mode = "1920x1080@60"` et `scale = 1`. C'est plus léger, mais moins net.

## Étape 3 : Sunshine sur le MacBook

Omarchy a une commande pour ça ([manuel d'Omarchy, jeux](https://github.com/omacom/omarchy/blob/v4.0.4/manual/26-gaming.md){target="_blank" rel="noopener"}) :

```bash
omarchy install service sunshine
```

D'après [son script](https://github.com/omacom/omarchy/blob/v4.0.4/bin/omarchy-install-service-sunshine){target="_blank" rel="noopener"}, elle :

- installe Sunshine et le lance à chaque ouverture de session ;
- ouvre dans le pare-feu les ports de Moonlight pour les réseaux privés, dont `10.0.0.0/8`. Notre câble est donc couvert. Sans ça, le pare-feu d'Omarchy bloque tout ce qui entre ;
- ajoute une appli **Sunshine Admin** : la page de réglages de Sunshine, à l'adresse `https://localhost:47990`.

Ouvrez **Sunshine Admin** et créez un identifiant. Si vous passez par un navigateur, il signale un certificat non reconnu : c'est normal, Sunshine signe le sien lui-même.

Ensuite, dans `~/.config/sunshine/sunshine.conf`, dites à Sunshine quel écran filmer :

```ini
capture = wlr
output_name = imac
```

- `capture = wlr` filme l'écran par le protocole wlr-screencopy ([configuration de Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}). Le projet [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"} utilise cette méthode avec Hyprland.
- `output_name` prend le nom de l'écran. La documentation de Sunshine conseille même le nom plutôt que le numéro, plus stable.
- Le son part vers l'iMac par défaut. Si vous préférez l'entendre sur le MacBook, ajoutez `stream_audio = disabled`.

Enfin, relancez Sunshine pour qu'il lise ces réglages :

```bash
systemctl --user restart sunshine
```

⚠️ **L'écran virtuel doit exister avant que Sunshine démarre.** D'après le projet sunshine-hyprland-virtual-display, Sunshine ne lit `output_name` qu'au démarrage. Si l'écran `imac` n'existe pas encore, l'iMac affiche l'écran du MacBook, ou une image noire.

## Étape 4 : Moonlight sur l'iMac

1. Installez Moonlight, depuis [moonlight-stream.org](https://moonlight-stream.org/){target="_blank" rel="noopener"} ou avec Homebrew :

   ```bash
   brew install --cask moonlight
   ```

2. Ouvrez Moonlight. Cliquez sur **+** et ajoutez l'hôte `10.0.0.1`.
3. Un code PIN s'affiche. Tapez-le dans l'onglet **PIN** de Sunshine Admin, sur le MacBook.
4. Dans les réglages de Moonlight, choisissez :
   - résolution : **4K** (3840 × 2160), la même que l'écran virtuel. Si vous avez choisi une autre résolution à l'étape 2, mettez la même ici ;
   - images par seconde : 60 ;
   - codec vidéo : HEVC ;
   - débit : vers le haut du curseur. Le câble Thunderbolt 3 monte à 40 Gbit/s ([fiche technique Apple](https://support.apple.com/fr-fr/112026){target="_blank" rel="noopener"}), bien au-delà de ce que Moonlight envoie.
5. Lancez **Desktop**.

## Étape 5 : utiliser l'écran

L'écran `imac` se comporte comme un écran externe. Faites glisser la souris du MacBook vers lui, ou envoyez-y un espace de travail :

```bash
hyprctl dispatch moveworkspacetomonitor 5 imac
```

Remplacez `5` par le numéro de l'espace de travail à déplacer.

**Les fois suivantes**, après un redémarrage du MacBook, l'écran virtuel n'existe plus, mais Sunshine, lui, redémarre tout seul. Recréez l'écran, puis relancez Sunshine :

```bash
hyprctl output create headless imac
systemctl --user restart sunshine
```

**Quand vous avez fini**, retirez l'écran virtuel. Sinon, des fenêtres peuvent s'y ouvrir sans que vous les voyiez :

```bash
hyprctl output remove imac
```

## Si ça ne marche pas

- **Moonlight ne trouve pas le MacBook** : vérifiez d'abord que `ping 10.0.0.2` répond. Puis lancez `sudo ufw status` : les règles de Sunshine portent la mention `omarchy-sunshine`. Si vous avez installé Sunshine autrement, ouvrez le câble à la main : `sudo ufw allow in on thunderbolt0`.
- **L'iMac affiche l'écran du MacBook ou une image noire** : Sunshine a démarré avant l'écran virtuel. Vérifiez que `imac` apparaît dans `hyprctl monitors`, puis lancez `systemctl --user restart sunshine`.
- **L'image est floue** : la résolution de Moonlight ne correspond pas à celle de l'écran virtuel. Mettez la même des deux côtés.
- **Rien ne s'affiche en 4096 × 2304** : revenez à 3840 × 2160, des deux côtés.

## Sunshine et Moonlight, ou OpenDisplay ?

J'ai déjà testé [OpenDisplay sur ce même MacBook sous Omarchy](/fr/20261030-opendisplay-vieil-imac-ecran-mac-linux), et il marche : l'iMac affiche bien le bureau étendu. Mais sous Linux, OpenDisplay compresse l'image avec le processeur seul. Sur mon MacBook, ses journaux montraient environ 24 ms pour compresser une image, et 60 à 100 ms entre la capture et l'envoi. Or, à 60 images par seconde, il faut en produire une toutes les 16,7 ms : le processeur ne suit pas à ce rythme.

Sunshine, lui, peut compresser avec la puce graphique, par VA-API sur les puces Intel et AMD ([README de Sunshine](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"}). Pour la 4K, Sunshine conseille au moins une Intel HD Graphics 510. Le MacBook Pro 2017 a une puce Intel de 7e génération (Kaby Lake), plus récente. Pour vérifier qu'elle sait compresser en HEVC, lancez `vainfo` (paquet `libva-utils`) et cherchez une ligne `VAProfileHEVCMain` suivie de `VAEntrypointEncSlice`.

Les deux méthodes font le même travail : filmer un écran virtuel, le compresser en vidéo, l'afficher sur l'iMac. Les différences :

| | OpenDisplay | Sunshine et Moonlight |
| --- | --- | --- |
| Installation | deux applis ; sous Linux, un émetteur en bêta à compiler | une commande Omarchy, plus le réseau et l'écran virtuel |
| Compression vidéo sous Linux | par le processeur seul, en H.264 | par la puce graphique (VA-API), en HEVC si le pilote le permet |
| Son sur l'iMac | non | oui |
| Clavier et souris de l'iMac | ne pilotent pas le PC | pilotent le PC |
| Usage prévu | un écran en plus | le jeu à distance, adapté ici en écran |

Si OpenDisplay vous suffit, gardez-le. Si le processeur du MacBook peine, ou si vous voulez le son et le clavier de l'iMac, essayez Sunshine et Moonlight.

**Sources :**

- [Utiliser un iMac comme écran (mode d'affichage cible)](https://support.apple.com/fr-fr/105126){target="_blank" rel="noopener"}, assistance Apple
- [iMac Retina 4K 21,5 pouces, 2017 : caractéristiques techniques](https://support.apple.com/fr-fr/112026){target="_blank" rel="noopener"}, assistance Apple
- [Démontage de l'iMac 21,5 pouces Retina 4K (2017)](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}, iFixit : référence de la dalle
- [Thunderbolt, section « Networking over Thunderbolt cable »](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}, documentation du noyau Linux
- Manuel d'Omarchy 4.0.4 : [réseau](https://github.com/omacom/omarchy/blob/v4.0.4/manual/35-networking.md){target="_blank" rel="noopener"}, [écrans](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"} et [jeux](https://github.com/omacom/omarchy/blob/v4.0.4/manual/26-gaming.md){target="_blank" rel="noopener"}
- [Script omarchy-install-service-sunshine](https://github.com/omacom/omarchy/blob/v4.0.4/bin/omarchy-install-service-sunshine){target="_blank" rel="noopener"}, Omarchy 4.0.4
- [Configuration de Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"} : `capture`, `output_name`, `stream_audio`, clavier et souris
- [README de Sunshine](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"} : compression par la puce graphique (VA-API)
- [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"} : Sunshine avec un écran virtuel Hyprland
- [Using hyprctl](https://wiki.hypr.land/0.49.0/Configuring/Using-hyprctl/){target="_blank" rel="noopener"}, wiki Hyprland : `hyprctl output create`
- [Niveaux et paliers du HEVC](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding_tiers_and_levels){target="_blank" rel="noopener"}, Wikipédia (en anglais)
- [Moonlight](https://moonlight-stream.org/){target="_blank" rel="noopener"}, site officiel

---
*[Jean-Luc Houédanou](https://houedanou.com)*
