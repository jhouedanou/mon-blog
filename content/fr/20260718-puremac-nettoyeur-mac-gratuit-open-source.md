---
title: "PureMac : l'outil gratuit qui nettoie ton Mac sans te voler tes données"
image: "/images/articles/puremac.webp"
createdAt: "2026-07-18"
updatedAt: "2026-10-08T12:00:00Z"
description: "PureMac, nettoyeur et désinstalleur macOS gratuit, open source et sans télémétrie : une vraie alternative à CleanMyMac, avec un code que tu peux vérifier."
searchIntent: "PureMac est-il une alternative gratuite, open source et sans télémétrie à CleanMyMac pour nettoyer un Mac ?"
tags: ["macOS", "open-source", "nettoyeur", "PureMac", "logiciel gratuit", "Homebrew"]
---

Si tu as un Mac récent (Air, Mac mini, MacBook Pro d'entrée de gamme), tu connais le problème : Apple vend des disques SSD soudés, non extensibles, souvent limités à 256 Go. Résultat : chaque gigaoctet compte, et les fichiers cache, logs et restes d'applications désinstallées finissent par grignoter sérieusement ta place.

Pour régler ça, la plupart des gens se tournent vers des applis comme CleanMyMac. Le souci ? Abonnement payant, télémétrie activée par défaut, et des alertes du style « 47 Go de fichiers dangereux détectés ! » qui te font paniquer pour rien. J'ai testé une alternative qui change vraiment la donne : PureMac.

---

## C'est quoi, PureMac ?

PureMac est un désinstalleur et nettoyeur macOS gratuit et open-source, sous licence MIT. Pas d'abonnement, pas de compte à créer, pas de télémétrie. L'appli ne « phone home » jamais — elle ne sait même pas que tu existes.

Le code est public, donc si tu es développeur (ou juste curieux), tu peux vérifier toi-même ce que l'appli fait avant de supprimer quoi que ce soit.

---

## Installation

La méthode la plus simple, via Homebrew dans le terminal :

```bash
brew install --cask puremac
```

Sinon, tu peux télécharger le `.dmg` signé et notarisé par Apple directement depuis la [page Releases sur GitHub](https://github.com/momenbasel/PureMac/releases/latest) (version 3.1.0 au 8 octobre 2026), puis glisser l'appli dans `/Applications`. Comme elle est notarisée, pas d'avertissement Gatekeeper à contourner.

Le projet est entièrement open-source : le [dépôt du dev est sur GitHub](https://github.com/momenbasel/PureMac).

Sinon, si tu préfères compiler toi-même depuis les sources :

```bash
brew install xcodegen
git clone https://github.com/momenbasel/PureMac.git
cd PureMac
xcodegen generate
xcodebuild -project PureMac.xcodeproj -scheme PureMac -configuration Release -derivedDataPath build build
open build/Build/Products/Release/PureMac.app
```

---

## Ce que l'appli fait concrètement

- **Désinstalleur d'applis** : quand tu supprimes une appli, PureMac traque tous les fichiers qu'elle a laissés (préférences, cache, containers, logs) grâce à un moteur de correspondance en 10 niveaux.
- **Détecteur de fichiers orphelins** : repère les restes d'applis que tu as déjà supprimées autrement.
- **Nettoyeur système** : caches système, fichiers Mail, corbeille, restes de Xcode, cache Homebrew, Docker, etc.
- **Nettoyage des caches Node** : PureMac vide aussi les caches des gestionnaires de paquets JavaScript — npm, yarn et pnpm. Si tu es dev, ces caches gonflent vite (plusieurs Go), et les récupérer d'un clic fait une vraie différence sur un SSD de 256 Go.
- **Nettoyage programmé** : tu peux automatiser des scans à intervalle régulier.

Un détail important, à nuancer : seules la désinstallation d'applis, la suppression des fichiers orphelins et celle des doublons passent par la Corbeille macOS. Le nettoyage par catégories, le nettoyage programmé, le vidage de la corbeille ou le ménage Docker et Xcode peuvent supprimer définitivement, d'après [la charte du projet](https://github.com/momenbasel/PureMac#our-promise). Donc relis bien ta sélection avant de valider. Le bon point : le projet l'écrit noir sur blanc au lieu de le cacher.

Autre point honnête : l'appli n'essaie pas de « libérer l'espace purgeable », contrairement à d'autres nettoyeurs. Cet espace est géré par macOS lui-même et aucune appli tierce ne peut le libérer de façon fiable — PureMac préfère te le montrer sans le compter comme « à supprimer ».

---

## PureMac vs CleanMyMac : le comparatif

| Critère | PureMac | CleanMyMac |
| --- | --- | --- |
| Prix | Gratuit | 40 $+/an |
| Open-source | Oui (MIT) | Non |
| Télémétrie | Aucune | Oui |
| Abonnement | Non | Oui |
| Signé et notarisé | Oui | Oui |
| Désinstalleur d'applis | Oui | Oui |
| Désinstallation via la corbeille | Oui | Partielle |
| Honnête sur l'espace purgeable | Oui | Non |

Le vrai écart, ce n'est pas la fonctionnalité — les deux font à peu près le même travail de nettoyage. C'est la confiance. CleanMyMac te demande l'accès complet au disque (Full Disk Access) et fonctionne comme une boîte noire payante. PureMac te demande la même permission, mais tout le code qui décide quoi supprimer est public et vérifiable.

---

## Les permissions demandées

PureMac a besoin de l'accès complet au disque (Full Disk Access) pour lire les dossiers protégés par macOS (Mail, Safari, containers d'applis). Sans cette permission, une partie des catégories de nettoyage et des containers d'applis reste hors de portée. L'onboarding au premier lancement t'accompagne pour l'activer, et si ça bloque, l'appli ouvre elle-même les réglages système et relance automatiquement le nettoyage une fois la permission accordée.

---

## Mon avis

Pour quelqu'un qui gère des serveurs et plusieurs machines au quotidien, ce genre d'outil qui ne demande ni abonnement ni confiance aveugle, c'est exactement ce qu'il faut. Rien à cacher, rien à payer, et le code est là pour ceux qui veulent vérifier. Et si tu veux comparer, j'ai aussi parlé de [MacSai et Mole, deux autres alternatives gratuites à CleanMyMac](/fr/20260901-macsai-mole-alternatives-gratuites-cleanmymac).

Si tu veux tester : `brew install --cask puremac`.

*Mise à jour du 8 octobre 2026 : lien de téléchargement pointé vers la dernière version (3.1.0), et correction sur la suppression : seules la désinstallation, les orphelins et les doublons passent par la corbeille, le reste du nettoyage peut être définitif, d'après le [README de PureMac](https://github.com/momenbasel/PureMac#our-promise).*
