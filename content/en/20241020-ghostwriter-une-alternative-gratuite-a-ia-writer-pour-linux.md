---
title: "iA Writer alternative for Linux: Ghostwriter"
image: "/images/articles/mockup.webp"
createdAt: "2024-10-20"
updatedAt: "2026-10-08T12:00:00Z"
id: 2024-10-20
description: "An iA Writer alternative for Linux? Ghostwriter, KDE's free, open-source Markdown editor, brings back its focus mode. Install and French spell check."
searchIntent: "Which free alternative to iA Writer should you pick on Linux to write in Markdown without distractions?"
tags: ["tech", "tutorial"]
summary: "Ghostwriter is a free, open-source Markdown editor for Linux. It has iA Writer's blue cursor and focus mode, plus spell checking in several languages."
---

Looking for a free alternative to iA Writer on Linux? Mine is called [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter"), an open-source Markdown editor maintained by KDE.

[Changing my blog engine](/en/20241005-on-fait-un-peu-le-menage) allowed me to:

1. (Re)discover the Markdown language, in which [my flat-file blog](/en/20241021-pendaison-de-cremaillere) is now written
2. Dust off my distraction-free writing environments, such as OmmWriter or iA Writer

## iA Writer: the best Markdown editor?

iA Writer is the best Markdown editor in the world. Here's why:

- Its user interface is free of needless distractions, with a distinctive blue insertion point.
- It offers a "focus" mode that highlights the line, sentence or paragraph you are currently writing, dimming the rest of the text.
- iA Writer is designed so that the user's attention stays on the text, not on the interface or the formatting.

However, there's no iA Writer for Linux: it's available on macOS, Windows, iPhone and iPad ([official website](https://ia.net/writer)).

## Looking for an iA Writer alternative for Linux

My main computer is an HP Pro x2 hybrid tablet running Linux (more precisely the latest version of Zorin OS Pro), the very one whose system I later [cloned to a bigger SSD](/en/20241029-cloner-ubuntu). While looking for an alternative to iA Writer, I came across [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter").

## Ghostwriter: a serious contender

This free app brings over my favourite iA Writer features:

- The famous blue insertion point
- A focus mode similar to iA Writer's
- Built-in spell checking

## Installing Ghostwriter on Linux

### 1. Install the application

On Zorin OS, Ubuntu and their derivatives, Ghostwriter is available in the [official Ubuntu repositories](https://launchpad.net/ubuntu/+source/ghostwriter):

```bash
sudo apt install ghostwriter
```

To get the most recent version, go through [Flathub](https://flathub.org/apps/org.kde.ghostwriter) instead:

```bash
flatpak install flathub org.kde.ghostwriter
```

### 2. Enable French spell checking

To get French spell checking to work, you need to install hunspell-fr with the following command:

```bash
sudo apt-get install hunspell-fr
```

## Conclusion

iA Writer is still a benchmark for Markdown editors, but on Linux, Ghostwriter is an excellent alternative. You get the same distraction-free writing as in iA Writer, and it's free and open source. If you write on Linux and want a clean editor, give it a try. And no, [you don't need to be a bearded dev to love Linux](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux).

*Updated October 8, 2026: iA Writer is available on macOS, Windows, iPhone and iPad, but still not on Linux. Added the commands to install Ghostwriter (Ubuntu repositories and Flathub).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — distraction-free writer*
