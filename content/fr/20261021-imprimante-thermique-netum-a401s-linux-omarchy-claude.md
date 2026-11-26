---
title: "NETUM A401S sous Linux : Claude l'a décodée"
createdAt: "2026-10-21T16:00:00Z"
image: "/images/articles/pexels-towfiqu-barbhuiya-9755391.webp"
description: "NETUM A401S sous Linux : mon imprimante thermique Bluetooth n'imprimait que depuis une appli Android. Claude a décodé son langage, le CPCL. Widget compris."
searchIntent: "Comment faire imprimer sous Linux une imprimante thermique A4 Bluetooth sans pilote (NETUM / Zjiang A401S, appli ScanPrint), et comment l'IA aide à retrouver son protocole ?"
tags: ["linux", "omarchy", "IA", "vibe coding", "matériel", "open-source", "dev"]
---

Il y a quelques jours, pendant que mon imprimante thermique NETUM A401S ne fonctionnait toujours pas sous Linux, Ryan Doyle a raconté sur X une drôle d'expérience. Il a envoyé à Claude la fiche de sa smart TV, avec une question, « Can you hack this? », et l'IA l'a guidé pas à pas. Il n'a plus de publicités ni d'applications imposées, et il a une interface plus rapide et l'économiseur d'écran de son choix ([TechCrunch](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/){target="_blank" rel="noopener"}).

Internet dit qu'il a « vibe codé » sa télé, et TechCrunch parle de rendre les smart TV « bêtes à nouveau ». Moi, je préfère dire qu'il l'a rendue plus intelligente, parce qu'une télé qui n'obéit qu'à son propriétaire mérite enfin le mot *smart*.

L'idée a été reprise sur GitHub, avec des projets comme [tv-vibehack](https://github.com/Gathin23/tv-vibehack){target="_blank" rel="noopener"} et [dumbtv](https://github.com/humblemuzzu/dumbtv){target="_blank" rel="noopener"}. Le principe est toujours le même : les télés Android ont le même outil de débogage que nos téléphones, ADB, et Claude s'en sert pour désactiver ce qui encombre ([It's FOSS](https://itsfoss.com/news/debloat-smart-tv/){target="_blank" rel="noopener"}).

Ça m'a donné une idée. Dans [mon bilan d'Omarchy sur le MacBook Pro 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017), je vous laissais avec une imprimante que je n'avais pas encore eu le temps d'essayer. Si Claude sait rendre une télé plus intelligente, il saura peut-être faire fonctionner mon imprimante sous Linux.

Je vous avais promis de vous dire si elle imprimait. Elle imprime. Claude a trouvé ce qui coinçait et l'a réglé, et en bonus, j'ai un widget.

## Une NETUM A401S qui ne fonctionnait qu'avec Android

L'imprimante, c'est une **A401S** vendue par NETUM, une petite imprimante thermique A4 portable, sans encre, avec une batterie, du Bluetooth et une appli Android nommée **ScanPrint**. Depuis le téléphone, tout va bien.

Depuis mon MacBook Pro 2017 sous Omarchy, rien. Dans le billet précédent, je me rassurais en rappelant que le service d'impression CUPS est installé d'office, mais encore faut-il un pilote. Or il n'y a pas de pilote, rien dans CUPS, et la documentation se résume à « téléchargez l'appli ».

Une télé Android, on peut la piloter avec l'outil de débogage prévu par Google, mais mon imprimante n'a rien de tel, et il fallait trouver le protocole qu'elle utilise.

## Claude mène l'enquête

J'ai ouvert Claude Code dans le terminal, à qui je confie mes problèmes depuis que je suis sous Omarchy, et je lui ai confié celui-là.

### Elle bippe, mais n'imprime rien

Un scan Bluetooth la trouve tout de suite : `A401S-545974`, icône « imprimante ». Quand on lui demande ses services, elle annonce à la fois :

- le **profil port série** classique (SPP, `0x1101`) ;
- plusieurs services **Bluetooth basse consommation** (`18f0`, `fee7`, `ff00`…).

La plupart des petites imprimantes thermiques comprennent l'**ESC/POS**, le langage des imprimantes de tickets de caisse, donc on a commencé par là. Claude ouvre un canal série Bluetooth (RFCOMM) en Python, sans rien installer, juste avec le module `socket` :

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
s.connect(("28:D4:1E:54:59:74", 1))
```

La connexion passe sans appairage. Claude envoie une image en ESC/POS (`GS v 0`) et… deux bips, mais pas une ligne imprimée. Même chose en largeur A4 complète, même chose avec une commande de fin de page.

### Le détour par le Bluetooth basse consommation

Puisque le port série ne donnait rien, la piste suivante, c'était le BLE, parce que le téléphone passait peut-être par là. BlueZ, la pile Bluetooth de Linux, s'obstinait à se connecter en Bluetooth classique, puisque l'imprimante fait les deux. Mais depuis la version 3.14, Python sait ouvrir directement un canal ATT en basse consommation ([documentation de Python](https://docs.python.org/3/library/socket.html){target="_blank" rel="noopener"}) :

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_SEQPACKET, socket.BTPROTO_L2CAP)
s.bind(("00:00:00:00:00:00", 0, 4, socket.BDADDR_LE_PUBLIC))
s.connect((addr, 0, 4, socket.BDADDR_LE_PUBLIC))
```

Ça a permis de lister ses services : un canal de données, `ff02`, avec un **contrôle de flux par crédits** (l'imprimante annonce `01 07` puis `02 f4 00`, soit « 7 paquets d'avance, 244 octets maximum »), et un canal `ff80` qui répond `ERROR` à tout. Celui-là, c'est l'interface de commandes AT du module Bluetooth, à laisser tranquille.

C'était instructif, mais toujours rien sur le papier, ni en ESC/POS ni dans le format « Luck Jingle », une autre famille courante. Elle recevait les données sans jamais répondre.

### La bonne piste était dans l'appli

C'est le nom de l'appli qui a tout débloqué. On a récupéré l'APK de ScanPrint (`com.netum.scanprint`) et on l'a décompilé avec [jadx](https://github.com/skylot/jadx){target="_blank" rel="noopener"}. L'interface est en Flutter, mais la partie Bluetooth est restée en Java.

**1. Le modèle est traité à part.**

```java
if (name.startsWith("A401S") || name.startsWith("A403S") || name.startsWith("LT-D80S")) {
    dpi = 300; dotsPerMm = 12;
} else {
    dpi = 203; dotsPerMm = 8;
}
```

C'est une imprimante 300 dpi, pas 203 dpi. Toutes les largeurs envoyées jusque-là étaient fausses.

**2. Le transport est bien le port série classique** (`00001101-…`, SPP). Le tout premier essai était sur le bon canal, mais avec le mauvais contenu.

**3. Le langage est du CPCL**, pas de l'ESC/POS. L'appli fabrique un texte comme celui-ci :

```
! 0 300 300 3480 1
PW 2496
DENSITY 2
MYPHOTOS 0
CG 312 13 0 0 <données binaires>
...
FORM
PRINT
```

L'image est découpée en bandes : `CG` pour une bande brute, `GG` pour une bande compressée en **LZO**. La page se termine par `FORM` et `PRINT`. Avant tout ça, une commande binaire règle le type de papier.

En plus, l'imprimante **répond en JSON**. La requête d'état de l'appli est :

```
1F 57 10 00 30 02 0A 00 00 00 52 45 41 44 5F 49 4E 46 4F 00   ("READ_INFO")
```

Et la réponse :

```json
{"brand":"zjiang","model":"A401S","hardVer":"v1.2","softVer":"1.01",
 "battery":14,"charger":0,"paperType":0,"printerStatus":6}
```

Ça confirme le fabricant d'origine, Zjiang, et ça explique enfin les bips, puisque d'après le code de l'appli, `printerStatus: 6` veut dire **batterie faible**, et elle était à 14 %. Ce qui bloquait l'impression, c'était donc le langage.

## La première page imprimée sous Linux

Avec le bon format, la bande de test sort enfin, et l'imprimante confirme :

```json
{"printResult":"success","printMsg":"77"}
```

Une page A4 complète suit, générée avec ImageMagick au format PBM. Ce format noir et blanc, un bit par point (bit de poids fort à gauche, 1 pour noir), correspond exactement à ce qu'attend `CG`, sans conversion à faire.

Seul problème, il faut **4 minutes** pour envoyer une page non compressée, soit 1 Mo. L'appli, elle, compresse ses bandes avec MiniLZO, et la classe Java s'appelle d'ailleurs `NativeMiniLZO`. Or MiniLZO, c'est l'algorithme LZO1X-1, que la bibliothèque `liblzo2` fournit dans toutes les grandes distributions Linux ([LZO](https://www.oberhumer.com/opensource/lzo/){target="_blank" rel="noopener"}). Quelques lignes de `ctypes` suffisent :

```python
lib = ctypes.CDLL(ctypes.util.find_library("lzo2"))
lib.lzo1x_1_compress(src, len(src), dst, ctypes.byref(dst_len), workmem)
```

Une bande de test passe alors de plusieurs dizaines de Ko à **8 Ko, envoyés en 3 secondes**.

## En bonus, une commande et un widget

### La commande `a401s-print`

`a401s-print` est un script Python sans paquet Python à installer, qui s'appuie sur des outils standard de Linux : BlueZ, ImageMagick, Poppler et liblzo2.

```bash
a401s-print --status
#  Imprimante : zjiang A401S (A401S-545974, 28:D4:1E:54:59:74)
#  État       : prête
#  Batterie   : 31 %

a401s-print rapport.pdf            # toutes les pages
a401s-print -p 2-3 rapport.pdf     # quelques pages
a401s-print --photo photo.jpg      # tramage pour les photos
```

Il trouve l'imprimante tout seul, convertit les PDF en 300 dpi avec `pdftoppm`, ajuste à la largeur A4, compresse, envoie, puis attend la confirmation JSON de chaque page.

### Le widget dans la barre d'Omarchy

Et parce qu'Omarchy se configure à volonté, l'imprimante a maintenant son icône dans la barre du haut. Un clic ouvre un panneau avec l'état et la batterie en direct, un bouton vers le sélecteur de fichiers, la noirceur (clair, normal, foncé), un mode photo et une barre de progression. Le panneau ne fait qu'appeler `a401s-print --json`, qui renvoie une ligne d'événement à chaque étape de l'impression.

Le widget n'interroge l'imprimante **qu'à l'ouverture du panneau**, parce que chaque requête ouvre une connexion Bluetooth et que l'imprimante bippe à chaque connexion. Un rafraîchissement toutes les 30 secondes aurait vite été insupportable.

Le code (la commande, le widget et la description du protocole) est sous licence MIT. Si vous avez une A403S ou une LT-D80S, l'appli les traite comme l'A401S, donc elles devraient fonctionner telles quelles. Je serais curieux d'avoir vos retours.

## Ce que j'en retiens

- **Un bip n'est pas une erreur de protocole.** Ici, il signalait la connexion, puis une batterie faible. Lire l'état de l'imprimante aurait fait gagner du temps, mais il fallait d'abord connaître la commande.
- **Le BLE était une fausse piste.** Le port série était le bon dès le premier essai, il lui manquait le bon langage.
- **Le nom de l'appli vaut mieux que tous les essais au hasard.** Une fois l'APK décompilé, le protocole complet tenait en une centaine de lignes de Java.
- **Ne pas toucher à ce qu'on ne comprend pas.** Le canal `ff80`, celui des commandes AT du module Bluetooth, aurait pu servir à renommer le module ou à le dérégler. On n'y a envoyé que des requêtes de lecture, et on l'a laissé tranquille dès qu'on a compris ce que c'était. Côté télés, certains n'ont pas eu cette prudence, et TechCrunch cite quelqu'un qui dit avoir bloqué sa télé Android pour de bon avec Claude.

## Mes jours de distrohopper sont finis

Un distrohopper, c'est quelqu'un qui change de distribution Linux très souvent, toujours à la recherche de celle où tout marchera du premier coup. J'en ai été un, avec Zorin OS sur ma tablette HP Pro x2, à l'époque où j'y ai découvert [Ghostwriter](/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux), [Zorin encore, sur un MacBook](/fr/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux) où le Wi-Fi n'a jamais fonctionné, puis [Omarchy, installé à reculons après l'avoir boycotté](/fr/20261008-omarchy-dhh-homme-dotfiles).

Je pense que mes jours de distrohopper se sont terminés aujourd'hui.

Omarchy n'est pas parfait, vous avez lu mes déboires avec la Magic Mouse et les écrans externes. Mais l'espoir du distrohopper, c'est souvent que la distribution suivante aura le bon pilote, alors que mon imprimante n'avait de pilote sur aucune distribution, et elle imprime quand même, depuis la barre de mon bureau. Quand le pilote n'existe pas, inutile de changer de distribution pour le trouver, il faut l'écrire.

## La puissance de Linux

La puissance de Linux, pour moi, c'est un système qui ne vous répond jamais « ce n'est pas prévu », bien plus que le bureau en mosaïque, les thèmes ou la pluie de *Matrix* au démarrage, même si j'y tiens. Le Bluetooth y est un socket que Python ouvre avec son module standard, l'image est un fichier PBM et la compression est une bibliothèque libre que toutes les distributions proposent. Côté Linux, tout était déjà là, documenté et ouvert, et il suffisait de l'assembler.

Claude a mené les recherches, et Linux a fourni les outils sans rien verrouiller. Ryan Doyle a rendu sa télé plus intelligente. Mon imprimante, elle, ne comprend toujours que le CPCL, mais maintenant Linux sait le lui envoyer, sur un MacBook que son fabricant a abandonné, avec une imprimante dont le fabricant n'a jamais pensé à Linux.

Personne ne m'a donné l'autorisation, et personne n'avait à me la donner.

## Sources

- Sarah Perez, TechCrunch, [« People are using AI to make their smart TVs dumb again »](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/){target="_blank" rel="noopener"}, 19 octobre 2026
- Abhishek Prakash, It's FOSS, [« People Are Using AI to Get Rid of Smart TV Ads and Make Their TVs Faster »](https://itsfoss.com/news/debloat-smart-tv/){target="_blank" rel="noopener"}, 19 octobre 2026
- Ryan Doyle sur X, [le message d'origine](https://x.com/doooyle/status/2111196679680540724){target="_blank" rel="noopener"}
- GitHub, [tv-vibehack](https://github.com/Gathin23/tv-vibehack){target="_blank" rel="noopener"} et [dumbtv](https://github.com/humblemuzzu/dumbtv){target="_blank" rel="noopener"}
- Python, [documentation du module socket](https://docs.python.org/3/library/socket.html){target="_blank" rel="noopener"}
- GitHub, [jadx](https://github.com/skylot/jadx){target="_blank" rel="noopener"}, décompilateur d'applis Android
- Markus Oberhumer, [LZO et miniLZO](https://www.oberhumer.com/opensource/lzo/){target="_blank" rel="noopener"}

---

*Photo : [Towfiqu barbhuiya](https://www.pexels.com/photo/9755391/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com), distrohopper à la retraite*
