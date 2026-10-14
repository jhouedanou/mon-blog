---
title: "Installer macOS sur un SSD externe pour relancer un iMac 2017"
createdAt: "2026-10-14T18:00:00Z"
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "Un iMac 2017 qui rame ? Installez macOS sur un SSD externe de 1 To branché en USB-C, sans ouvrir la machine. Ventura, OpenCore et limites."
searchIntent: "Comment installer macOS sur un disque SSD externe et démarrer dessus pour relancer un vieil iMac 2017 lent, sans ouvrir l'iMac pour changer le disque interne ?"
tags: ["tutoriel", "apple", "macos", "mac", "matériel", "ssd"]
---

J'avais un iMac 2017 abandonné dans un coin. Le genre de machine qu'on n'allume plus, parce qu'elle met une éternité à démarrer et qu'ouvrir Safari devient une épreuve.

Le coupable, presque toujours, c'est le disque interne. La bonne nouvelle : pas besoin d'ouvrir l'iMac pour le changer. Il suffit d'installer macOS sur un **SSD externe** et de démarrer dessus. Moi, j'ai pris un SSD Lexar de 1 To. Voici comment faire, étape par étape.

![Un iMac 2017 démarre sur un SSD externe de 1 To branché en USB-C](/images/articles/imac-2017-macos-ssd-externe.webp)

## Pourquoi l'iMac 2017 rame

Sauf si un SSD avait été choisi en option à l'achat, l'iMac 2017 sortait de l'usine avec l'un de ces disques (fiches techniques Apple du [21,5 pouces](https://support.apple.com/fr-fr/111921){target="_blank" rel="noopener"}, du [21,5 pouces 4K](https://support.apple.com/fr-fr/112026){target="_blank" rel="noopener"} et du [27 pouces 5K](https://support.apple.com/fr-fr/111969){target="_blank" rel="noopener"}) :

- un **disque dur de 1 To à 5 400 tr/min** sur le 21,5 pouces d'entrée de gamme et sur le 21,5 pouces 4K à 3,0 GHz ;
- un **Fusion Drive** (un petit SSD associé à un disque dur) sur le 21,5 pouces 4K à 3,4 GHz et sur tous les 27 pouces 5K.

Un disque dur à 5 400 tr/min est lent : Seagate annonce « jusqu'à 140 Mo/s » pour les siens, et c'est un maximum ([fiche Seagate](https://www.seagate.com/www-content/datasheets/pdfs/barracuda-2-5-DS1907-2-1907US-en_US.pdf){target="_blank" rel="noopener"}). En pratique, on tourne plutôt autour de 100 Mo/s. Mais le vrai problème est ailleurs : macOS lit et écrit en permanence des milliers de petits fichiers éparpillés. Pour ça, un disque dur est très lent, parce que sa tête de lecture doit se déplacer à chaque fois. Un SSD n'a aucune pièce mobile. C'est là qu'il fait toute la différence.

## Pourquoi un SSD externe plutôt qu'un SSD interne

Changer le disque interne d'un iMac 2017, c'est possible. Mais l'écran est **collé** sur le châssis. Il faut le décoller, le recoller, et on risque de le casser.

Le SSD externe a trois avantages :

- **on n'ouvre rien** : il suffit d'un câble ;
- **c'est réversible** : débranchez le SSD, l'iMac redémarre sur son disque d'origine (et pourra toujours servir d'[écran secondaire avec Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet)) ;
- **le SSD n'est pas perdu** : si l'iMac finit par lâcher, il vous restera comme disque de stockage.

Bonne nouvelle aussi : l'iMac 2017 n'a **pas de puce T2**. Il n'y a donc aucun réglage de sécurité à changer pour l'autoriser à démarrer sur un disque externe ([liste Apple des Mac avec puce T2](https://support.apple.com/fr-fr/HT208862){target="_blank" rel="noopener"}). Attention à ne pas le confondre avec l'iMac Pro de 2017, qui en a une.

## Ce qu'il vous faut

| Élément | Détail |
| --- | --- |
| Un iMac 2017 | 21,5 pouces, 21,5 pouces 4K ou 27 pouces 5K |
| Un SSD externe | 500 Go minimum conseillés, 1 To pour être tranquille |
| Le bon câble | USB-C vers USB-C, à brancher sur un port Thunderbolt 3 de l'iMac |
| Une connexion Internet | pour télécharger macOS, qui pèse plusieurs gigaoctets |
| Une heure devant vous | le téléchargement et l'installation prennent du temps |

### Quel SSD Lexar choisir

L'iMac 2017 a deux ports **Thunderbolt 3 (USB-C)**. En USB, ils montent à **10 Gbit/s** ([fiche technique Apple](https://support.apple.com/fr-fr/111969){target="_blank" rel="noopener"}), ce qui donne environ **1 000 Mo/s** en pratique. Sur les modèles à disque dur, c'est plusieurs fois plus rapide que le disque d'origine.

Il a aussi quatre ports USB-A. Ce sont des ports USB 3 à 5 Gbit/s, soit environ 400 Mo/s en pratique ([Tom's Hardware](https://www.tomshardware.com/reviews/usb-3-uas-turbo,3215-2.html){target="_blank" rel="noopener"}). Ça marche, mais branchez plutôt le SSD sur un port USB-C.

Conséquence : sur cet iMac, un SSD à 20 Gbit/s n'ira pas plus vite qu'un SSD à 10 Gbit/s. Voici quelques modèles Lexar de 1 To :

| Modèle | Interface | Débit annoncé (lecture) | Sur l'iMac 2017 |
| --- | --- | --- | --- |
| [Lexar ES3](https://americas.lexar.com/product/lexar-es3-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2 (10 Gbit/s) | 1 050 Mo/s | environ 1 000 Mo/s |
| [Lexar SL300](https://americas.lexar.com/product/lexar-sl300-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2 (10 Gbit/s) | 1 050 Mo/s | environ 1 000 Mo/s |
| [Lexar SL500](https://americas.lexar.com/product/lexar-sl500-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2x2 (20 Gbit/s) | 2 000 Mo/s | environ 1 000 Mo/s |
| [Lexar Armor 700](https://americas.lexar.com/product/lexar-armor-700-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2x2 (20 Gbit/s) | 2 000 Mo/s | environ 1 000 Mo/s |

Les modèles à 2 000 Mo/s utilisent une norme (USB 3.2 Gen 2x2) que les Mac ne gèrent pas. Lexar prévient d'ailleurs que les performances peuvent être plus faibles sur Mac ([fiche du SL500](https://americas.lexar.com/product/lexar-sl500-portable-ssd/){target="_blank" rel="noopener"}). Sur l'iMac 2017, ils retombent à 10 Gbit/s : le test de TechRadar mesure le SL500 à environ 1 000 Mo/s sur macOS ([TechRadar](https://www.techradar.com/pro/lexar-sl500-portable-ssd-review){target="_blank" rel="noopener"}). Si vous achetez un SSD rien que pour cet iMac, un modèle à 10 Gbit/s suffit.

## Quel macOS installer

| Version | Comment | Pour qui |
| --- | --- | --- |
| **macOS Ventura 13** | officiel, directement chez Apple | la solution simple et sûre |
| **macOS Sequoia 15** | avec OpenCore Legacy Patcher (non officiel) | ceux qui veulent un système plus récent |
| **macOS Tahoe 26** | OpenCore Legacy Patcher en préversion | expérimental, à éviter sur une machine de tous les jours |
| **macOS 27 Golden Gate** | impossible | réservé aux Mac Apple Silicon |

Apple s'est arrêté à **Ventura** pour l'iMac 2017 ([compatibilité Ventura](https://support.apple.com/fr-fr/102861){target="_blank" rel="noopener"}). Sonoma ne le prend plus en charge. La dernière version est **Ventura 13.7.8**, sortie le 20 août 2025 ([Apple](https://support.apple.com/fr-fr/124929){target="_blank" rel="noopener"}). Depuis, aucune mise à jour. Apple ne l'a pas annoncé officiellement, mais Ventura n'est probablement plus maintenu.

Je commence donc par Ventura, la méthode officielle. Je parle de Sequoia plus bas.

## Installer macOS Ventura sur le SSD externe en cinq étapes

Ces étapes suivent la méthode d'Apple pour [démarrer un Mac sur un disque externe](https://support.apple.com/fr-fr/111336){target="_blank" rel="noopener"}. On les fait depuis l'iMac lui-même, démarré sur son disque d'origine.

### 1. Brancher le SSD

Branchez le SSD sur l'un des deux ports **USB-C** (Thunderbolt 3) à l'arrière de l'iMac, avec un câble USB-C vers USB-C (souvent fourni avec le SSD).

### 2. Effacer et formater le SSD

**Attention : cette étape efface tout le contenu du SSD.** Sauvegardez ce qu'il contient avant.

1. Ouvrez **Utilitaire de disque** (dans Applications → Utilitaires).
2. Menu **Présentation → Afficher tous les appareils**.
3. Dans la colonne de gauche, sélectionnez le SSD Lexar, **tout en haut** de sa hiérarchie (le disque lui-même, pas le volume en dessous). Vérifiez qu'il est rangé sous **Externe** et que sa taille est d'environ 1 To. En cas de doute, débranchez-le : le disque qui disparaît de la liste, c'est lui.
4. Cliquez sur **Effacer**, puis choisissez :
   - **Nom** : ce que vous voulez, par exemple « Lexar » ;
   - **Format** : **APFS** ;
   - **Schéma** : **Table de partition GUID**.
5. Cliquez sur **Effacer**, puis sur **Terminé**.

Apple recommande l'APFS, surtout pour un SSD ([Utilitaire de disque](https://support.apple.com/fr-fr/guide/disk-utility/dskutl14079/mac){target="_blank" rel="noopener"}). Le schéma GUID est indispensable pour que le Mac puisse démarrer dessus.

### 3. Télécharger macOS Ventura

Le plus simple : ouvrez [Ventura dans l'App Store](https://apps.apple.com/app/macos-ventura/id1638787999?mt=12){target="_blank" rel="noopener"} et cliquez sur **Obtenir**. Si c'est **Mise à jour de logiciels** qui s'ouvre, cliquez sur **Télécharger**. Si l'installateur se lance tout seul à la fin, passez directement à l'étape 4. Le lien vient de la page d'Apple [Télécharger et installer macOS](https://support.apple.com/fr-fr/102662){target="_blank" rel="noopener"}.

Si l'App Store fait des siennes, passez par le Terminal (il faut macOS Catalina ou plus récent sur le disque interne). Cette commande liste les versions disponibles :

```bash
softwareupdate --list-full-installers
```

Et celle-ci télécharge Ventura 13.7.8 dans le dossier Applications :

```bash
softwareupdate --fetch-full-installer --full-installer-version 13.7.8
```

Dans les deux cas, vous obtenez **Installer macOS Ventura** dans Applications.

### 4. Installer Ventura sur le SSD

1. Lancez **Installer macOS Ventura**.
2. Acceptez la licence.
3. Quand l'installateur demande où installer macOS, il propose le disque interne. Cliquez sur **Afficher tous les disques**, puis choisissez le **SSD Lexar**.
4. Cliquez sur **Continuer** et laissez faire.

L'iMac redémarre plusieurs fois. **Ne débranchez surtout pas le SSD pendant l'installation.** À la fin, l'assistant de configuration de macOS s'ouvre : langue, compte, Wi-Fi… Vous êtes sur le SSD.

### 5. Faire du SSD le disque de démarrage

Pour que l'iMac démarre toujours sur le SSD :

1. Ouvrez **Réglages Système → Général → Disque de démarrage**.
2. Choisissez le SSD Lexar, puis cliquez sur **Redémarrer**.

Pour choisir le disque au cas par cas, il y a le **gestionnaire de démarrage** : allumez l'iMac en maintenant la touche **Option (⌥, Alt)** enfoncée, puis choisissez le disque ([Apple](https://support.apple.com/fr-fr/102603){target="_blank" rel="noopener"}). Si ça ne marche pas après un redémarrage, éteignez complètement l'iMac et réessayez.

## Autre méthode : installer depuis la récupération macOS

Si l'iMac ne démarre plus du tout sur son disque interne, passez par la **récupération macOS**, qui télécharge le système depuis Internet ([Apple](https://support.apple.com/fr-fr/102655){target="_blank" rel="noopener"}) :

- **⌘ + R** au démarrage : réinstalle la dernière version de macOS installée sur ce Mac ;
- **Option + ⌘ + R** : installe la version la plus récente compatible, donc Ventura ici ;
- **Maj + Option + ⌘ + R** : installe la version livrée avec le Mac, ou la plus proche encore disponible.

Prenez **Option + ⌘ + R**. Dans la récupération, ouvrez d'abord **Utilitaire de disque** pour formater le SSD (étape 2), puis choisissez **Réinstaller macOS Ventura** et sélectionnez le SSD comme destination.

Il faut une connexion Internet classique. Les réseaux Wi-Fi avec page de connexion (hôtel, gare) ne marchent pas. Un câble Ethernet branché sur la box, c'est l'idéal.

## Aller plus loin : Sequoia avec OpenCore Legacy Patcher

Pour dépasser Ventura, il existe **OpenCore Legacy Patcher** (OCLP). Cet outil gratuit et open source fait croire à macOS qu'il tourne sur un Mac compatible, puis il ajoute les pilotes manquants. Il prend en charge les trois iMac 2017 ([modèles pris en charge](https://dortania.github.io/OpenCore-Legacy-Patcher/MODELS.html){target="_blank" rel="noopener"}), depuis la [version 1.0.0](https://github.com/dortania/OpenCore-Legacy-Patcher/releases/1.0.0){target="_blank" rel="noopener"} d'octobre 2023.

Où en est-on au 14 octobre 2026 ?

- La version stable, **OCLP 2.5.1** (19 septembre 2026), gère **Sequoia** ([GitHub](https://github.com/dortania/OpenCore-Legacy-Patcher/releases){target="_blank" rel="noopener"}).
- **Tahoe** n'est géré que par la préversion **3.0.0-rc.3** (8 octobre 2026). GitHub prévient : attendez-vous à de l'instabilité et à des pertes de données ([notes de version](https://github.com/dortania/OpenCore-Legacy-Patcher/releases/tag/3.0.0-rc.3){target="_blank" rel="noopener"}).
- **macOS 27 Golden Gate** ne tourne que sur les Mac Apple Silicon. Aucun outil ne l'installera sur un iMac Intel ([MacRumors](https://www.macrumors.com/2026/06/08/macs-compatible-macos-golden-gate/){target="_blank" rel="noopener"}).

Le principe, avec un SSD externe :

1. Démarrez sur Ventura (sur le SSD) et installez OCLP.
2. Dans OCLP, cliquez sur **Build and Install OpenCore**. L'outil liste les disques sur lesquels il peut installer OpenCore : choisissez le **SSD Lexar**. Le disque interne reste intact.
3. Redémarrez en maintenant **Option**, puis choisissez **EFI Boot**, l'entrée avec l'icône d'OpenCore. Maintenez **Ctrl** en cliquant dessus pour en faire l'entrée par défaut ([guide de démarrage](https://dortania.github.io/OpenCore-Legacy-Patcher/BOOT.html){target="_blank" rel="noopener"}).
4. Une fois démarré par **EFI Boot**, ouvrez **Réglages Système → Général → Mise à jour de logiciels** : Sequoia y apparaît et s'installe sur le SSD, comme une mise à jour normale. Sinon, OCLP sait aussi créer un installateur (**Create macOS Installer**, voir le [guide de Dortania](https://dortania.github.io/OpenCore-Legacy-Patcher/INSTALLER.html){target="_blank" rel="noopener"}) ; choisissez alors le SSD avec **Afficher tous les disques**, comme à l'étape 4 plus haut. Les particularités de Sequoia sont détaillées [ici](https://dortania.github.io/OpenCore-Legacy-Patcher/SEQUOIA-DROP.html){target="_blank" rel="noopener"}.
5. Une fois sur Sequoia, OCLP propose des **correctifs système** (*Post-Install Root Patch*), notamment pour le Wi-Fi. Branchez l'iMac en Ethernet avant : sans Internet, OCLP peut n'installer que le pilote Wi-Fi au premier passage ([après l'installation](https://dortania.github.io/OpenCore-Legacy-Patcher/POST-INSTALL.html){target="_blank" rel="noopener"}).

Trois choses à savoir :

- **Chaque mise à jour de macOS efface les correctifs.** Il faut les réappliquer avec OCLP après chaque mise à jour.
- **Pas d'Apple Intelligence ni de recopie de l'iPhone.** Ces fonctions demandent un Mac Apple Silicon (ou une puce T2 pour la recopie), patché ou pas.
- **C'est non officiel.** Si quelque chose casse, Apple ne vous aidera pas. Gardez une sauvegarde.

Mon conseil : commencez par Ventura. Si l'iMac vous rend service et que vous voulez un système plus récent, passez à Sequoia avec OCLP 2.5.1. Tahoe, seulement pour jouer.

## Après l'installation

### Vérifier le TRIM

Le **TRIM** permet au SSD de garder ses performances dans le temps. Sur un SSD externe en USB, il ne marche pas toujours : ça dépend de la puce qui fait le pont entre le SSD et l'USB ([The Eclectic Light Company](https://eclecticlight.co/2024/04/09/which-external-drives-have-trim-and-smart-support/){target="_blank" rel="noopener"}).

Pour savoir si le vôtre en profite, regardez dans **Informations système** (Applications → Utilitaires), à la fiche du SSD : selon la façon dont il est branché, une ligne **Prise en charge TRIM** peut apparaître. Si elle n'apparaît pas, l'article d'Eclectic Light cité plus haut détaille d'autres façons de vérifier. Et si le TRIM ne marche pas, pas de panique : le SSD fonctionne quand même. Il peut juste ralentir un peu avec les années.

### Que faire du disque interne

Rien ne presse. Tant que vous ne l'effacez pas, c'est votre plan B : débranchez le SSD, et l'iMac redémarre comme avant.

Une fois que tout marche bien, vous pouvez l'effacer dans Utilitaire de disque et vous en servir comme stockage pour les gros fichiers, ou comme disque **Time Machine** pour sauvegarder le SSD. Time Machine m'a déjà tiré d'affaire [quand iCloud a bloqué mes dépôts GitHub](/fr/20260925-retrouver-dossier-github-icloud-time-machine). Une sauvegarde sur le même ordinateur ne remplace pas une vraie sauvegarde externe, mais c'est mieux que rien.

## Les limites d'un macOS sur SSD externe

- **Le SSD doit rester branché.** Si vous le débranchez pendant que macOS tourne, le système plante et vous risquez de perdre des données.
- **L'installation est propre à ce Mac.** Apple le précise : un SSD préparé sur cet iMac n'est pas fait pour démarrer un autre modèle de Mac.
- **Ventura n'a eu aucune mise à jour** depuis le 20 août 2025. Pour un usage de tous les jours sur Internet, c'est un vrai point faible en matière de sécurité.
- **Les ports USB-A sont plus lents.** Environ 400 Mo/s au lieu de 1 000 Mo/s sur les ports USB-C.
- **OpenCore demande de l'entretien.** Il faut réappliquer les correctifs après chaque mise à jour, et rien n'est garanti.

## En résumé

Un iMac 2017 qui rame n'est pas bon pour la poubelle. Avec un SSD externe de 1 To branché en USB-C, macOS installé dessus et le SSD choisi comme disque de démarrage, on lui redonne une seconde vie sans tournevis et sans décoller l'écran.

Ventura est la voie simple. OpenCore Legacy Patcher ouvre la porte à Sequoia, au prix d'un peu d'entretien.

Et si l'ordinateur ne vous intéresse plus mais que l'écran est encore beau, il reste une autre piste : [transformer le vieil iMac en écran secondaire avec Sharp](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet). Pour les vieux Mac portables, j'ai aussi tenté [Omarchy sur mon MacBook Pro 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017).

**Sources :**

- [Utiliser un périphérique de stockage externe comme disque de démarrage](https://support.apple.com/fr-fr/111336), Apple
- Fiches techniques de l'[iMac 21,5 pouces 2017](https://support.apple.com/fr-fr/111921), de l'[iMac 4K 2017](https://support.apple.com/fr-fr/112026) et de l'[iMac 5K 2017](https://support.apple.com/fr-fr/111969), Apple
- [Mac équipés de la puce T2](https://support.apple.com/fr-fr/HT208862), Apple
- [Compatibilité de macOS Ventura](https://support.apple.com/fr-fr/102861) et [notes de sécurité de Ventura 13.7.8](https://support.apple.com/fr-fr/124929), Apple
- [Télécharger et installer macOS](https://support.apple.com/fr-fr/102662), [récupération macOS sur un Mac Intel](https://support.apple.com/fr-fr/102655) et [choisir le disque de démarrage](https://support.apple.com/fr-fr/102603), Apple
- [Effacer un disque dans Utilitaire de disque](https://support.apple.com/fr-fr/guide/disk-utility/dskutl14079/mac), Apple
- [Documentation d'OpenCore Legacy Patcher](https://dortania.github.io/OpenCore-Legacy-Patcher/) et [versions publiées sur GitHub](https://github.com/dortania/OpenCore-Legacy-Patcher/releases), Dortania
- [Macs compatibles avec macOS Golden Gate](https://www.macrumors.com/2026/06/08/macs-compatible-macos-golden-gate/), MacRumors
- [Fiches produits des SSD portables](https://americas.lexar.com/product/lexar-sl500-portable-ssd/), Lexar
- [Test du Lexar SL500](https://www.techradar.com/pro/lexar-sl500-portable-ssd-review), TechRadar
- [Débits réels de l'USB 3](https://www.tomshardware.com/reviews/usb-3-uas-turbo,3215-2.html), Tom's Hardware
- [Fiche technique des disques BarraCuda 2,5 pouces](https://www.seagate.com/www-content/datasheets/pdfs/barracuda-2-5-DS1907-2-1907US-en_US.pdf), Seagate
- [Quels disques externes gèrent le TRIM](https://eclecticlight.co/2024/04/09/which-external-drives-have-trim-and-smart-support/), The Eclectic Light Company

---
*[Jean-Luc Houédanou](https://houedanou.com)*
