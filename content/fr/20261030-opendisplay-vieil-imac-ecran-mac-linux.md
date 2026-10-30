---
title: "OpenDisplay : un vieil iMac comme écran pour un Mac ou un PC Linux, gratuitement"
createdAt: "2026-10-30T15:00:00Z"
image: "/images/articles/opendisplay-macbook-omarchy-imac.webp"
description: "OpenDisplay, gratuit et open source, fait d'un vieil iMac l'écran d'un Mac ou d'un PC Linux. Installation pas à pas, et ce qu'on perd en qualité."
searchIntent: "Comment utiliser gratuitement un vieil iMac comme deuxième écran d'un Mac ou d'un PC sous Linux avec OpenDisplay, et quelle qualité d'image attendre ?"
tags: ["tutoriel", "apple", "macos", "mac", "linux", "omarchy", "open-source", "matériel"]
---

**Réponse courte.** OpenDisplay est une application gratuite et open source. Elle fait d'un vieil iMac le deuxième écran d'un Mac récent ou d'un PC sous Linux. On installe un récepteur sur l'iMac, un émetteur sur l'autre machine, et c'est tout. Mais l'image voyage en vidéo compressée : elle est moins nette et moins fluide qu'un vrai écran branché en câble. Les chiffres sont plus bas.

Je l'ai fait avec mon MacBook Pro 2017 sous Omarchy : l'iMac affiche bien son bureau étendu.

![À gauche, le MacBook Pro 2017 sous Omarchy, avec l'installation et les journaux d'od-sender dans le terminal. À droite, l'iMac qui affiche le bureau étendu du MacBook](/images/articles/opendisplay-macbook-omarchy-imac.webp)

## OpenDisplay en bref

- **Gratuit** : pas d'abonnement, pas de compte, pas de boîtier à acheter. Le code est ouvert (licence GPL-3.0) [sur GitHub](https://github.com/peetzweg/opendisplay){target="_blank" rel="noopener"}.
- **Deux applis** : un émetteur (*sender*) sur la machine qui calcule l'image, un récepteur (*receiver*) sur l'iMac qui l'affiche.
- **Un vrai écran en plus** : l'ordinateur voit l'iMac comme un moniteur. Vous y glissez des fenêtres.
- **Wi-Fi ou câble** entre deux Mac (Thunderbolt, Ethernet ou USB-C). Depuis Linux, par le réseau uniquement.
- **Aucun serveur** : une seule connexion directe entre les deux machines.

OpenDisplay marche aussi avec un iPhone, un iPad ou une tablette Android. Ici, je parle seulement de l'iMac.

## Ce qu'il vous faut

| Élément | Condition |
| --- | --- |
| iMac qui affiche | macOS 12 Monterey ou plus récent, soit un iMac de fin 2015 ou après |
| Mac qui envoie | macOS 14 Sonoma ou plus récent, Intel ou Apple Silicon |
| PC Linux qui envoie | un bureau Wayland : Hyprland 0.55 ou plus (Omarchy), ou Sway, KDE Plasma, GNOME récents. Pas de X11 |
| Liaison | le même réseau (Wi-Fi ou box), ou un câble entre deux Mac |

Deux pièges :

- **Un iMac de 2012 à 2014 ne peut pas servir d'écran** : il ne reçoit pas macOS Monterey. Pour lui, voyez [Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet).
- **Un Mac trop ancien pour Sonoma ne peut pas envoyer l'image.** Mon MacBook Pro 2017, par exemple, s'arrête à macOS Ventura. Sous [Omarchy](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017), il peut par contre servir d'émetteur : c'est le montage de la photo. D'où le cas Linux plus bas.

## Sur l'iMac : installer le récepteur

Cette étape est la même dans les deux cas.

Sur l'iMac, téléchargez `OpenDisplayReceiver.dmg` depuis la [dernière version sur GitHub](https://github.com/peetzweg/opendisplay/releases/latest){target="_blank" rel="noopener"}. Glissez l'appli dans **Applications**. Ou, avec Homebrew :

```bash
brew install --cask opendisplay-receiver
```

Lancez **OpenDisplay Receiver**. Acceptez l'accès au **réseau local** quand macOS le demande. L'iMac attend alors une connexion.

L'appli est signée et vérifiée par Apple : pas d'alerte au premier lancement. Elle se met à jour toute seule.

## Cas 1 : d'un Mac à l'iMac

1. Sur le Mac récent, installez l'émetteur : `OpenDisplay.dmg`, sur la même page GitHub, ou :

   ```bash
   brew install --cask opendisplay
   ```

2. Lancez **OpenDisplay**. Dans **Réglages Système → Confidentialité et sécurité**, autorisez l'**Enregistrement de l'écran** et le **Réseau local**. Sans eux, l'iMac reste noir ou n'apparaît pas, sans message d'erreur.
3. L'iMac apparaît dans la liste des appareils de l'appli. Choisissez-le.
4. Glissez une fenêtre vers l'iMac. Placez les écrans dans **Réglages Système → Moniteurs**.

Pour passer au câble, reliez les deux Mac avec un câble Thunderbolt ou Ethernet. Un câble USB-C **de données** marche aussi si les deux Mac ont un macOS récent (un câble de charge seule ne marche pas). OpenDisplay bascule tout seul sur le câble, même en cours de route.

## Cas 2 : d'un PC Linux à l'iMac

L'émetteur Linux s'appelle `od-sender`. Il est **en bêta**.

**Sur Omarchy ou Arch**, on compile le paquet fourni dans le dépôt :

```bash
sudo pacman -S --needed base-devel git
git clone https://github.com/peetzweg/opendisplay
cd opendisplay/linux/packaging/arch/opendisplay-sender
./from-checkout.sh -si
```

La documentation officielle indique `makepkg -si` à la place. Le 30 octobre 2026, chez moi, cette commande échouait avec l'erreur `cd: opendisplay-1.25.0/linux: No such file or directory`. Le script `from-checkout.sh`, rangé dans le même dossier, compile la version actuelle du dépôt (la 1.30.1 chez moi), et lui marche.

Il installe aussi les outils de compilation (Rust, clang et, sur un PC Intel ou AMD, nasm). Il vous demande donc votre mot de passe. La compilation prend quelques minutes, plus sur une petite machine.

**Sur une autre distribution** (Ubuntu 24.04, Debian 13, Fedora 39 ou plus récentes), prenez l'archive toute prête sur la [page des versions](https://github.com/peetzweg/opendisplay/releases/latest){target="_blank" rel="noopener"}, puis :

```bash
tar xf od-sender-$(uname -m)-unknown-linux-gnu.tar.gz && cd od-sender-$(uname -m)-unknown-linux-gnu
./install.sh
```

Ensuite, avec le récepteur ouvert sur l'iMac :

```bash
od-sender doctor          # vérifie que votre bureau est compatible
od-sender list            # liste les écrans trouvés sur le réseau
od-sender run --to iMac   # étend le bureau sur l'iMac
```

Après `--to`, mettez une partie du nom que `list` affiche. Sur Omarchy, envoyez une fenêtre vers l'iMac avec **Super + Maj + →**. **Ctrl + C** arrête tout et retire l'écran virtuel.

## Les sacrifices qualité, sans enrober

OpenDisplay ne branche pas l'iMac comme un vrai écran. L'émetteur filme un écran virtuel, le compresse en vidéo et l'envoie. L'iMac décode cette vidéo et l'affiche. Chaque étape coûte quelque chose.

**1. L'image est très compressée.** Entre deux Mac, le flux monte au plus à 18 Mb/s. Une image 5K brute, à 30 images par seconde, demande environ 10 Gb/s. L'image est donc compressée plusieurs centaines de fois. Sur un texte qui ne bouge pas, ça passe bien. Quand l'image bouge, des détails disparaissent un instant.

**2. Les couleurs perdent en finesse.** La couleur voyage à un quart de la résolution (format 4:2:0). Le texte noir sur blanc reste net. Le texte en couleur, comme la coloration du code dans un éditeur, devient un peu flou sur les bords.

**3. Sur un iMac 5K, il faut choisir entre net et fluide.** Voici les mesures du développeur, d'un MacBook Pro M5 Pro vers un iMac 5K de 2017, en câble :

| Réglage de l'iMac | Qualité de l'émetteur | Bureau | Images par seconde | Délai |
| --- | --- | --- | --- | --- |
| Par défaut | Best | 2560 × 1440 | environ 30 | environ 30 ms |
| Par défaut | Fast | 2560 × 1440 | environ 58 | environ 12 ms |
| 1600 × 900 | Best | 1600 × 900 | environ 55 | environ 15 ms |

En clair : à pleine finesse, l'iMac 5K affiche 30 images par seconde. C'est bien pour lire et écrire, moins pour une vidéo. Pour avoir 60 images par seconde, il faut accepter une image plus floue (**Fast**) ou un bureau plus petit. Avec une puce plus ancienne, c'est moins : un M1 Pro tombe à environ 23 images par seconde en 5K.

**4. Un Mac Intel limite la définition.** Le format HEVC, le plus net, ne sert que si le Mac qui envoie a une puce Apple et que l'iMac décode le HEVC (la plupart des Mac de 2017 et après). Sinon, c'est le H.264, limité à 4096 × 2304 pixels. Sur un iMac 5K, le bureau passe alors de 2560 × 1440 à 2048 × 1152 points. À l'inverse, un iMac non Retina en 1920 × 1080 reçoit son image pixel pour pixel, à 60 images par seconde.

**5. Depuis Linux, c'est plus lent et plus lourd.** L'émetteur Linux n'utilise pas la carte graphique : le processeur fait tout le travail. Il n'a pas de HEVC. Vers un iMac 5K, comptez 55 à 70 ms de délai, contre environ 20 ms vers un iPhone, et un processeur bien occupé. Sur Hyprland, le curseur est dessiné dans la vidéo : il suit la souris avec du retard. Et la version Linux n'est testée officiellement que sur Omarchy pour Mac Apple Silicon (Asahi Linux). Sur un PC Intel ou AMD, elle « devrait marcher », selon le développeur. Sur mon MacBook Pro 2017, un Mac Intel, elle marche.

Sur ce MacBook, les journaux d'`od-sender` (visibles sur la photo) donnent environ 24 ms pour encoder une image, et de 60 à 100 ms environ entre la capture et l'envoi. Il faut encore ajouter le réseau et l'affichage sur l'iMac. Quand rien ne bouge à l'écran, l'émetteur n'envoie presque rien : moins d'une image par seconde.

Sur une machine modeste, baissez la cadence :

```bash
od-sender run --to iMac --max-fps 30
```

Choisir une définition plus petite sur l'iMac allège aussi le travail.

**6. Le Wi-Fi ajoute des à-coups.** Entre deux Mac, préférez le câble. En Wi-Fi, sur le Mac qui envoie, réglez AirDrop sur **Contacts uniquement** ou **Personne**. En mode **Tout le monde**, le Wi-Fi du Mac s'interrompt environ 75 ms deux fois par seconde pour chercher des appareils, et l'image saute à chaque fois.

**Ce qui manque encore :**

- **pas de son** sur les haut-parleurs de l'iMac ;
- **le clavier et la souris de l'iMac** ne pilotent pas l'autre machine (c'est prévu) ;
- **depuis Linux, le flux n'est pas chiffré** : utilisez-le seulement sur un réseau de confiance. Pas de mode recopie non plus ;
- **côté Mac, OpenDisplay utilise une fonction d'Apple non documentée** : une mise à jour de macOS peut le casser ;
- **un point violet** s'affiche dans la barre des menus du Mac qui envoie. C'est normal : macOS signale que l'écran est filmé ;
- **l'iMac reste un ordinateur allumé** : il consomme plus qu'un simple écran.

## Quel réglage choisir

- **Lire, écrire, coder** : laissez les réglages par défaut (**Best** sur l'émetteur, la définition par défaut sur l'iMac).
- **Net et fluide** : sur l'iMac, dans **Réglages Système → Moniteurs**, descendez d'un ou deux crans vers « Texte plus grand ».
- **Vidéo et animations** : choisissez **Fast** sur l'émetteur.

## OpenDisplay ou Sharp ?

J'ai déjà présenté [Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), qui fait le même travail entre deux Mac.

- **Sharp** envoie le texte immobile sans perte, donc parfaitement net. Il envoie le son. Il accepte les iMac dès fin 2012, et le Mac qui envoie peut tourner sous macOS 12.3. Mais il faut un câble, et il ne marche qu'entre deux Mac.
- **OpenDisplay** marche en Wi-Fi, accepte un PC Linux comme émetteur, et sert aussi pour un iPhone ou un iPad. Mais tout passe en vidéo compressée, sans son.

Pour lire et coder entre deux Mac reliés par un câble, Sharp donne un texte plus net. Pour un PC Linux ou une liaison en Wi-Fi, OpenDisplay est le seul des deux qui marche.

**Sources :**

- [Site d'OpenDisplay](https://opendisplay.app/){target="_blank" rel="noopener"}
- [README d'OpenDisplay sur GitHub](https://github.com/peetzweg/opendisplay){target="_blank" rel="noopener"} : FAQ, mesures et comparatif
- [Installation de l'émetteur Linux](https://opendisplay.app/docs/linux/install/){target="_blank" rel="noopener"}, documentation officielle
- [README de l'émetteur Linux](https://github.com/peetzweg/opendisplay/blob/main/linux/README.md){target="_blank" rel="noopener"} : bureaux pris en charge et limites connues
- [Script from-checkout.sh](https://github.com/peetzweg/opendisplay/blob/main/linux/packaging/arch/opendisplay-sender/from-checkout.sh){target="_blank" rel="noopener"}, dans le dépôt d'OpenDisplay

---
*[Jean-Luc Houédanou](https://houedanou.com)*
