---
title: "Comment retrouver l'accès au dossier GitHub après être passé sur iCloud+ (grâce à Time Machine)"
createdAt: "2026-09-25T19:30:00Z"
image: "/images/articles/pexels-jibarofoto-2148222.webp"
description: "Après avoir activé la synchronisation du Bureau et des Documents avec iCloud+, mes dépôts GitHub ne répondaient plus. Voici pourquoi iCloud Drive bloque Git, et comment récupérer ses dossiers de code avec une sauvegarde Time Machine."
searchIntent: "Comment récupérer sur Mac un dossier GitHub bloqué par la synchronisation iCloud Drive des dossiers Bureau et Documents, en le restaurant avec Time Machine ?"
tags: ["tutoriel", "apple", "macos", "icloud", "git", "dev"]
---

# Comment retrouver l'accès au dossier GitHub après être passé sur iCloud+ (grâce à Time Machine)

> **En préambule.** Pour répondre aux questions sur ma nouvelle productivité : oui, j'utilise bel et bien l'IA. Depuis plusieurs mois, elle **corrige** mes articles, et surtout, elle récupère les images d'illustration sur Pexels, comme celles de ce billet. Le problème n'est pas l'IA, c'est la mauvaise utilisation de l'IA. Dans mon cas, elle m'évite des coquilles et elle améliore le frontmatter, le bloc d'informations placé en tête de chaque article (titre, date, image, description, mots-clés), puisque ce blog tourne entièrement sur des fichiers Markdown. Sans compter qu'elle me permet de développer plus facilement de nouvelles fonctionnalités, comme les carrousels et les lecteurs audio de [l'article sur Koala Sampler](/fr/20260822-koala-sampler-gratuit-mac-boom-bap).

Bon, je doute qu'un développeur compétent tombe sur ce problème, mais c'est une erreur qui peut arriver même aux plus expérimenté(e)s.

J'ai récemment pris l'offre payante d'iCloud, en grande partie pour son prix : 700 FCFA par mois pour 50 Go de stockage cloud, un accès à Apple TV (l'ex-Apple TV+) ainsi qu'à Apple Arcade, [inclus dans iCloud+ en Côte d'Ivoire depuis septembre](https://www.apple.com/ci/newsroom/2026/09/icloud-plus-expands-to-include-apple-tv-and-apple-arcade/).

Ensuite, j'ai activé l'option « Dossiers Bureau et Documents » d'iCloud Drive, soit la fonctionnalité d'iCloud qui vous permet de synchroniser les fichiers et les dossiers de votre Bureau et de votre dossier Documents avec vos ordinateurs Mac. Tout allait bien jusqu'à ce que j'essaie de rapatrier du code depuis un repo GitHub. La roue tourne, indéfiniment, sans mise à jour.

Le problème est qu'un dossier synchronisé par iCloud Drive n'est pas compatible avec Git.

Voici comment j'ai récupéré mes dossiers de code : via Time Machine.

## Pourquoi iCloud Drive bloque Git

Si vous utilisez GitHub Desktop, vos dépôts sont rangés par défaut dans `Documents/GitHub`. Activer « Dossiers Bureau et Documents », c'est donc envoyer tous vos dépôts dans iCloud : le code, le dossier caché `.git` qui contient tout l'historique, et les dépendances. Dans un projet JavaScript, le dossier `node_modules` compte souvent, à lui seul, des dizaines de milliers de fichiers.

Git n'est pas fait pour travailler dans un dossier qu'un autre programme modifie en même temps. À chaque commande (`pull`, `commit`, `checkout`), il crée, modifie et renomme de nombreux petits fichiers dans `.git`, en une fraction de seconde. iCloud, de son côté, surveille chaque fichier du dossier pour l'envoyer sur ses serveurs. Plusieurs choses peuvent alors mal tourner :

- **Tout ralentit.** Chaque fichier que Git crée ou modifie doit être synchronisé à son tour, alors qu'iCloud n'a parfois pas fini d'envoyer les milliers de fichiers du dépôt.
- **Des fichiers ne sont plus sur le disque.** Si l'option « Optimiser le stockage du Mac » est cochée et que le disque manque de place, macOS ne garde certains fichiers que dans iCloud. Quand Git doit les lire, il attend qu'ils soient téléchargés. Avec une connexion lente, l'attente peut durer très longtemps, et la roue tourne sans fin.
- **Le dépôt peut se corrompre.** Quand deux versions d'un même fichier entrent en conflit, iCloud ne les fusionne pas : il garde les deux et en renomme une, par exemple `index 2` ou `HEAD 2`. Git ne connaît pas ces fichiers, et le dépôt peut devenir illisible.

Votre code a déjà une copie en ligne : celle que vous poussez sur GitHub. Il n'a pas besoin d'une deuxième copie dans iCloud.

![Un MacBook Air affiche du code dans un éditeur](/images/articles/pexels-duncanoluwaseun-226232.webp)

## Avant de commencer

- **Une sauvegarde Time Machine faite avant l'activation de « Dossiers Bureau et Documents ».** C'est elle qui contient votre dossier GitHub dans son état d'avant iCloud.
- **Le disque de sauvegarde, branché au Mac.**
- **Une idée de ce qui n'a pas été poussé.** Ce que vous avez poussé sur GitHub après la date de la sauvegarde se récupère avec `git pull` (étape 5). Les commits et les modifications jamais poussés n'existent que dans la copie restée sur iCloud : on les récupère avec Git à l'étape 6.

Pas de sauvegarde Time Machine ? Tout ce que vous avez poussé sur GitHub y est toujours. Désactivez « Dossiers Bureau et Documents » (étape 1), puis clonez à nouveau vos dépôts dans un dossier hors d'iCloud (voir « Pour ne pas recommencer », plus bas).

## Les 6 étapes

### 1. Désactiver « Dossiers Bureau et Documents »

Ouvrez le menu Apple, puis **Réglages Système**. Cliquez sur votre nom, puis sur **iCloud**. Cliquez sur **Drive** (ou **iCloud Drive**, selon votre version de macOS), décochez **Dossiers Bureau et Documents**, puis cliquez sur **Terminé**.

Vos fichiers ne disparaissent pas : ils restent dans iCloud Drive, et macOS crée de nouveaux dossiers Bureau et Documents sur votre Mac. Votre dossier Documents redevient un dossier local, qu'iCloud ne synchronise plus. C'est là que Time Machine va remettre le dossier GitHub.

### 2. Ouvrir Time Machine sur le dossier Documents

Branchez le disque de sauvegarde. Ouvrez une fenêtre du Finder sur le nouveau dossier **Documents**, puis ouvrez **Time Machine** avec Spotlight (Cmd + Espace, puis tapez « Time Machine »).

![Une main tient un disque dur externe branché à un ordinateur portable](/images/articles/pexels-arina-krasnikova-5951748.webp)

### 3. Remonter à une sauvegarde d'avant iCloud

Utilisez les flèches à côté de la fenêtre, ou la chronologie sur le bord droit de l'écran, pour remonter dans le temps. Choisissez la sauvegarde la plus récente faite **avant** l'activation de « Dossiers Bureau et Documents » : plus elle est récente, moins vous aurez de travail à rattraper. Le dossier **GitHub** réapparaît dans Documents.

### 4. Restaurer le dossier GitHub

Sélectionnez le dossier **GitHub**, puis cliquez sur **Restaurer**. Time Machine le remet à son emplacement d'origine, `Documents/GitHub`, qui est de nouveau un dossier local.

Comme le chemin n'a pas changé, GitHub Desktop retrouve vos dépôts. S'il affiche « Can't find » pour l'un d'eux, cliquez sur **Locate…** et indiquez-lui le dossier du dépôt.

### 5. Remettre les dépôts à jour

La sauvegarde date d'avant l'incident : il manque donc les commits poussés sur GitHub depuis. Pour chaque dépôt, ouvrez le Terminal et lancez :

```bash
cd ~/Documents/GitHub/nom-du-projet
git status
```

`git status` vérifie que le dépôt est lisible et montre les fichiers modifiés. S'il n'y en a pas, un simple `git pull` récupère depuis GitHub tout ce qui a été poussé après la date de la sauvegarde. Dans GitHub Desktop, les boutons **Fetch origin** puis **Pull origin** font la même chose.

S'il y a des fichiers modifiés, mettez-les d'abord de côté : sinon, Git refuse le `git pull` dès qu'un de ces fichiers a aussi changé sur GitHub.

```bash
git stash push --include-untracked
git pull
git stash pop
```

`git stash pop` remet vos modifications en place, et signale un conflit si la même partie d'un fichier a changé des deux côtés. Pour un contrôle complet de l'historique, `git fsck` vérifie l'intégrité du dépôt.

### 6. Récupérer le travail non poussé, puis supprimer la copie iCloud

L'ancienne copie de vos dépôts est toujours dans iCloud Drive, dans **Documents > GitHub**. Si vous aviez du travail jamais poussé sur GitHub, c'est là qu'il se trouve. Ne recopiez pas ses fichiers par-dessus le dépôt restauré : vous écraseriez les versions plus récentes ramenées par `git pull`, et vous perdriez l'historique de vos commits.

**Pour les commits jamais poussés**, laissez Git les récupérer. Depuis le dépôt restauré, remplacez `main` par le nom de votre branche et lancez :

```bash
git fetch ~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/GitHub/nom-du-projet main:recup-icloud
git merge recup-icloud
git push
```

La première ligne copie les commits de la copie iCloud dans une nouvelle branche, `recup-icloud`. La deuxième les fusionne avec votre branche, et Git signale les conflits éventuels. La troisième les envoie enfin sur GitHub. Pour écrire le chemin sans erreur, tapez `git fetch ` puis glissez le dossier du projet depuis iCloud Drive dans la fenêtre du Terminal.

**Pour les modifications jamais commitées**, copiez les fichiers concernés dans un dossier à part, hors du dépôt, et comparez-les avec ceux du dépôt restauré avant de reporter vos changements. Faites de même si Git n'arrive pas à lire la copie iCloud.

Une fois que tout fonctionne, supprimez la copie iCloud. Elle ne sert plus à rien et elle occupe une partie de vos 50 Go. En cas d'erreur, iCloud la garde encore 30 jours dans **Supprimés récemment**, sur iCloud.com.

## Pour ne pas recommencer

- **Rangez votre code hors du Bureau et de Documents.** iCloud Drive ne synchronise que son propre dossier, plus le Bureau et Documents si l'option est active. Un dossier dédié dans votre dossier de départ, par exemple `~/Developer`, reste en dehors :

  ```bash
  mkdir -p ~/Developer
  mv ~/Documents/GitHub ~/Developer/
  ```

  Dans GitHub Desktop, cliquez ensuite sur **Locate…** pour chaque dépôt, ou ajoutez-les avec **File > Add Local Repository**.

- **Changez le dossier de clonage de GitHub Desktop.** Au moment de cloner, remplacez `Documents/GitHub` par `~/Developer` dans le champ **Local path**. GitHub Desktop retient le dernier dossier utilisé.
- **Réactivez « Dossiers Bureau et Documents » si vous y tenez**, une fois le code sorti de Documents.
- **Gardez Time Machine**, c'est grâce à lui que j'ai récupéré mes dépôts. Et poussez souvent sur GitHub : un commit poussé ne dépend plus de votre Mac.

---

_Photos : [Luis Quintero](https://www.pexels.com/@jibarofoto/), [Oluwaseun Duncan](https://www.pexels.com/@duncanoluwaseun/) et [Arina Krasnikova](https://www.pexels.com/@arina-krasnikova/), sur Pexels._
