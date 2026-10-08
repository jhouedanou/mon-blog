---
title: "Ghostwriter, l'iA Writer de Linux"
image: "/images/articles/mockup.webp"
createdAt: "2024-10-20"
updatedAt: "2026-10-08T12:00:00Z"
id: 2024-10-20
description: "iA Writer n'existe pas sous Linux. Ghostwriter, l'éditeur Markdown gratuit et open source de KDE, reprend son mode focus. Installation et correcteur français."
searchIntent: "Quelle alternative gratuite à iA Writer choisir sur Linux pour écrire en Markdown sans distraction ?"
tags: ["tech", "tutoriel"]
summary: "Ghostwriter est une excellente alternative gratuite et open-source à iA Writer pour les utilisateurs Linux. Cet éditeur Markdown reprend les fonctionnalités essentielles d'iA Writer comme le point d'insertion bleu et le mode focus, tout en ajoutant une vérification orthographique multilingue. Idéal pour les écrivains et blogueurs cherchant un environnement d'écriture épuré sous Linux."
---

Vous cherchez une alternative gratuite à iA Writer sous Linux ? La mienne s'appelle [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter"), un éditeur Markdown open source maintenu par KDE.

[Changer de moteur de blog](/fr/20241005-on-fait-un-peu-le-menage) m'a permis de :

1. (Re)découvrir le langage Markdown
2. Dépoussiérer mes environnements d'écriture sans distractions, comme OmmWriter ou iA Writer

## iA Writer : le meilleur éditeur Markdown ?

iA Writer est le meilleur éditeur Markdown au monde. Voici pourquoi :

- Son interface utilisateur est exempte de distractions inutiles, avec un point d'insertion bleu distinctif.
- Il propose un mode « focus » qui met en exergue la ligne, la phrase ou le paragraphe en cours d'écriture, en assombrissant le reste du texte.
- iA Writer est conçu pour que l'attention de l'utilisateur soit centrée sur le texte, et non sur l'interface utilisateur ou la mise en forme.

Cependant, iA Writer n'existe pas sous Linux : il est disponible sur macOS, Windows, iPhone et iPad ([site officiel](https://ia.net/writer)).

## À la recherche d'une alternative pour Linux

Mon ordinateur principal est une tablette hybride HP Pro x2 fonctionnant sous Linux (plus précisément la dernière version de Zorin OS Pro). En cherchant une alternative à iA Writer, j'ai découvert [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter").

## Ghostwriter : un concurrent sérieux

Cette application gratuite reprend mes fonctionnalités préférées d'iA Writer :

- Le fameux point d'insertion bleu
- Un mode focus similaire à celui d'iA Writer
- Une vérification orthographique intégrée

## Installer Ghostwriter

### 1. Installer l'application

Sur Zorin OS, Ubuntu et leurs dérivées, Ghostwriter est disponible dans les [dépôts officiels d'Ubuntu](https://launchpad.net/ubuntu/+source/ghostwriter) :

```bash
sudo apt install ghostwriter
```

Pour avoir la version la plus récente, passez plutôt par [Flathub](https://flathub.org/apps/org.kde.ghostwriter) :

```bash
flatpak install flathub org.kde.ghostwriter
```

### 2. Activer la vérification orthographique en français

Pour faire fonctionner la vérification orthographique en français, il faut installer hunspell-fr avec la commande suivante :

```bash
sudo apt-get install hunspell-fr
```

## Conclusion

Si iA Writer reste une référence dans le domaine des éditeurs Markdown, Ghostwriter s'avère être une excellente alternative pour les utilisateurs Linux. Il offre une expérience d'écriture sans distraction similaire à iA Writer, tout en étant gratuit et open source. Pour les écrivains, blogueurs ou tout utilisateur à la recherche d'un environnement d'écriture épuré et efficace sous Linux, Ghostwriter mérite certainement d'être essayé.

*Mise à jour du 8 octobre 2026 : iA Writer est disponible sur macOS, Windows, iPhone et iPad, mais toujours pas sous Linux. Ajout des commandes d'installation de Ghostwriter (dépôts Ubuntu et Flathub).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — écrivain sans distraction*
