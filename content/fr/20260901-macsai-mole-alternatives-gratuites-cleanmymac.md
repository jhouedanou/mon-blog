---
title: "MacSai et Mole : deux alternatives gratuites à CleanMyMac"
createdAt: "2026-09-01"
image: "/images/articles/macao.webp"
description: "Après PureMac, deux autres nettoyeurs gratuits et open-source pour macOS méritent le détour : MacSai, qui reprend CleanMyMac fonction par fonction, et Mole, un outil en ligne de commande pensé pour les développeurs."
searchIntent: "Quelles alternatives gratuites et open-source à CleanMyMac installer sur Mac en 2026 ?"
tags: ["macOS", "open-source", "nettoyeur", "logiciel gratuit", "Homebrew"]
---

# MacSai et Mole : deux alternatives gratuites à CleanMyMac

En juillet, je vous parlais de [PureMac](/fr/20260718-puremac-nettoyeur-mac-gratuit-open-source), un nettoyeur gratuit et sans télémétrie pour Mac. Le constat n'a pas changé depuis : les SSD soudés d'Apple se remplissent vite, et CleanMyMac demande un abonnement pour vider des caches que macOS sait très bien vider tout seul.

Depuis, deux autres projets ont retenu mon attention. Ils ne se ressemblent pas du tout, et c'est justement pour ça que je vous en parle ensemble.

## MacSai, le clone assumé de CleanMyMac

[MacSai](https://github.com/iliyami/MacSai) est un logiciel gratuit et open-source, sous licence BSD, écrit en Swift 6 et SwiftUI. L'objectif du projet est clair : reproduire chaque fonction importante de CleanMyMac, sans abonnement, sans publicité et sans télémétrie. Le code est public, l'application est notarisée par Apple, et le projet annonce plus de 480 tests automatisés.

On y retrouve tout ce qu'on attend d'un nettoyeur complet : caches et journaux système, un désinstalleur qui traque les fichiers oubliés par les applications, un scanner de logiciels malveillants, la gestion des éléments de démarrage, la détection de doublons, et une carte visuelle du disque pour repérer les dossiers qui pèsent lourd. Un détail que je n'avais vu nulle part ailleurs : l'amincissement des binaires universels, qui retire la partie Intel des applications sur les Mac Apple Silicon.

Au premier lancement sur mon MacBook, un Smart Scan a envoyé 5,66 Go à la corbeille : 4,42 Go de fichiers système inutiles et 2,96 Go de traces de navigation. Rien n'est effacé définitivement, tout passe par la Corbeille de macOS, ce qui laisse le temps de récupérer un fichier en cas de doute.

Il faut macOS 14 au minimum. L'installation tient en une ligne :

```bash
brew install --cask mac-sai
```

Le DMG est aussi disponible sur la [page Releases](https://github.com/iliyami/MacSai/releases/latest) du projet.

## Mole, pour ceux qui vivent dans le Terminal

[Mole](https://github.com/tw93/Mole), développé par tw93, prend le chemin inverse. Pas de fenêtre, pas de boutons, tout se passe dans le Terminal. Le projet est gratuit, open-source sous licence GPL, et il regroupe en un seul binaire ce que font CleanMyMac, AppCleaner, DaisyDisk et iStat Menus.

```bash
brew install mole
```

Une fois installé, la commande s'appelle `mo`. Voici les quatre à retenir :

```bash
mo clean       # nettoyage en profondeur des caches et restes d'applications
mo uninstall   # désinstallation complète d'une application
mo analyze     # explorateur visuel du disque
mo status      # tableau de bord système en temps réel
```

Ce qui m'a convaincu, c'est l'option `--dry-run` disponible sur chaque commande destructive : Mole vous montre ce qu'il compte supprimer avant de toucher au moindre fichier. Un journal des opérations est conservé, et vous pouvez protéger certains caches avec une liste blanche. Quand on passe ses journées dans un terminal, c'est plus rapide que n'importe quelle interface.

Le développeur propose aussi une version graphique, Mole pour Mac, qui organise les mêmes outils en « planètes » thématiques. Celle-là est payante, un achat unique d'environ 19 dollars sans abonnement, avec un essai gratuit où chaque outil fonctionne deux fois. La version Terminal, elle, reste gratuite.

## Lequel choisir ?

Si vous voulez une interface et l'équivalent complet de CleanMyMac, prenez MacSai. Si vous vivez dans le Terminal, prenez Mole. Et si vous cherchez simplement un désinstalleur propre et sans fioritures, PureMac fait toujours très bien le travail.

Dans les trois cas, le code est lisible par n'importe qui, rien ne quitte votre machine, et vous ne payez rien. Difficile de faire mieux comme comparatif avec CleanMyMac.

[Jean Luc Houédanou](https://houedanou.com)
