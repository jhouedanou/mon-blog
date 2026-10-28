---
title: "Lemon Studio : le clone de FL Studio existe, et ça ne me botte plus tant que ça"
createdAt: "2026-10-26T18:30:00Z"
updatedAt: "2026-10-28T15:00:00Z"
image: "/images/articles/lemon-studio.webp"
description: "J'ai testé Lemon Studio, le clone gratuit de FL Studio codé avec Claude : il est très loin de l'original. MorningDAW, lui, mise sur l'originalité."
searchIntent: "Que vaut Lemon Studio, le clone gratuit et open source de FL Studio codé avec l'aide de l'IA, et quel logiciel de musique gratuit et original choisir à la place ?"
tags: ["opinion", "musique", "IA", "open-source", "vibe coding"]
---

Début octobre, je vous parlais d'[ArtCraft, la suite Adobe refaite avec Claude](/fr/20261009-artcraft-vibe-code-suite-adobe-saaspocalypse). Cette fois, c'est FL Studio qui a son clone. Il s'appelle Lemon Studio.

_Mise à jour du 28 octobre 2026 : je l'ai testé. Mon verdict est en fin de billet._

## Lemon Studio, c'est quoi ?

Lemon Studio est un logiciel de musique (une station audionumérique, ou DAW) gratuit et open source, sous licence GPL-3.0. Il est écrit en Rust et vise Windows, macOS et Linux. L'interface reprend celle de FL Studio : la Playlist, le Channel rack, le Piano roll, les menus. Sur le papier, si vous avez déjà ouvert FL Studio, vous savez vous en servir.

Ce qu'il sait faire, d'après sa documentation :

- ouvrir les projets enregistrés avec FL Studio 24.2 ou plus récent ;
- charger les plug-ins VST2, VST3 et CLAP. Sur la capture, c'est le RX1200 d'Inphonik, une émulation du sampleur SP-1200 ;
- fournir ses propres instruments, Lemon Sampler, Lemon Trio et Citrus, et une dizaine d'effets.

Comme pour ArtCraft, de nombreux commits sur GitHub sont co-signés par Claude.

Le projet n'a aucun lien avec Image-Line, l'éditeur de FL Studio. Sa documentation le précise.

## Ça marche ? Couci-couça

D'après ce que j'en ai vu, ça fonctionne couci-couça. Le projet le dit lui-même : « Lemon Studio is pre-alpha software. » Plusieurs fonctions sont incomplètes. Il n'y a pas de version à télécharger : il faut compiler le logiciel depuis le code source.

Si j'étais un peu moins noyé de travail, je l'essaierais bien.

## Mais ça ne me botte plus tant que ça

Personnellement, ça ne me botte plus tant que ça. Et je ne sais pas si j'aime la direction que prend l'industrie.

Fin septembre, la suite Adobe. Aujourd'hui, FL Studio. Le schéma est le même : on prend un logiciel connu et on le refait avec l'IA. Même interface, mêmes menus, mêmes habitudes.

Un détail résume la situation. Dans sa documentation, l'auteur de Lemon Studio demande que son code ne soit pas repris dans ArtCraft. Il précise que c'est une demande, pas une condition de la licence. Celui qui clone FL Studio ne veut pas qu'on reprenne son clone.

Je comprends sa demande. Mais elle montre le problème : quand copier devient facile, tout le monde copie tout le monde, et personne ne veut être copié.

## Les barrières tombent. Et après ?

À l'avenir, les barrières du développement logiciel peuvent tomber. Un développeur seul, avec Claude, peut refaire un logiciel qu'une entreprise a construit pendant des années. FL Studio existe depuis 1998, quand il s'appelait encore FruityLoops.

C'est une bonne nouvelle pour ceux qui n'ont pas les moyens. Je l'écrivais à propos de [Koala Sampler](/fr/20260822-koala-sampler-gratuit-mac-boom-bap) : beaucoup achètent des cracks de FL Studio dans les groupes Facebook, souvent farcis de logiciels espions. Un clone gratuit et légal vaut mieux que ça.

Mais si tout le monde peut tout refaire, refaire ne suffit plus. Il faudra miser sur deux choses :

- **la qualité** : un logiciel qui ne plante pas en pleine session, qui ouvre vos anciens projets, et qui sera encore maintenu dans cinq ans ;
- **l'originalité** : une idée nouvelle, pas la copie d'un logiciel qui existe déjà.

L'IA rend la copie facile. Elle ne rend pas la qualité et l'originalité faciles. C'est sur ces deux points que les logiciels feront la différence. C'est mon avis.

## Mise à jour du 28 octobre : je l'ai testé

J'ai fini par trouver le temps d'essayer Lemon Studio. Il est très loin de FL Studio.

- **Les VST3 ne sont pas pris en charge.** La documentation les annonce comme utilisables. Chez moi, ils ne fonctionnent pas.
- **Mon plug-in favori plante.** Le RX1200 d'Inphonik, une émulation du sampleur SP-1200, plante dès que j'édite un sample.

## Si vous cherchez un logiciel de musique gratuit : MorningDAW

Regardez plutôt [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"}, développé par Mattias et Nicklas Holmgren, de Morningdew Media. Il est gratuit, sans période d'essai ni limite de temps, sur macOS, Windows et Linux. Il faut seulement créer un compte pour le télécharger.

Lui aussi a l'air vibe codé, certes. [Bedroom Producers Blog](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"} trouve que son interface montre « certains signes courants de l'esthétique vibe codée ». Et il intègre un assistant qui fonctionne avec votre propre compte Claude Code. Ses développeurs ne disent pas comment ils l'ont codé.

Mais MorningDAW est original. Il ne copie pas un logiciel existant :

- des menus circulaires s'ouvrent sous la souris, pour éviter les allers-retours dans les menus ;
- un même morceau s'édite dans plusieurs vues : arrangement, piano roll, patterns, partition, et même un tracker pour la musique chiptune ;
- il exporte des clips vidéo avec des visualiseurs, pour publier sa musique en vidéo ;
- il a ses propres synthés, Wyvern et Ember.

D'après son site, il accepte les plug-ins VST3 et CLAP, et les Audio Units sur Mac.

C'est ce que je disais plus haut : l'IA rend la copie facile, mais ce qui fera la différence, c'est la qualité et l'originalité. Lemon Studio copie FL Studio. MorningDAW propose autre chose.

## Sources

- GitHub, [Lemon Studio](https://github.com/ItsAlphaNeon/Lemon-Studio){target="_blank" rel="noopener"}, dépôt et documentation, consultés le 26 et le 28 octobre 2026
- Morningdew Media, [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"}, site officiel, consulté le 28 octobre 2026
- Bedroom Producers Blog, [« Morningdew Media releases MorningDAW, a FREE DAW for macOS, Windows, and Linux »](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"}, 24 octobre 2026

_Capture de couverture : Lemon Studio, avec le plug-in RX1200 d'Inphonik._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
