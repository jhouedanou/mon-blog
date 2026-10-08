---
title: "Ghostwriter, the iA Writer of Linux"
image: "/images/articles/mockup.webp"
createdAt: "2024-10-20"
updatedAt: "2026-10-08T12:00:00Z"
id: 2024-10-20
description: "iA Writer does not exist on Linux. Ghostwriter, KDE's free and open-source Markdown editor, brings back its focus mode. Installation and French spell check."
searchIntent: "Which free alternative to iA Writer should you pick on Linux to write in Markdown without distractions?"
tags: ["tech", "tutorial"]
summary: "Ghostwriter is an excellent free and open-source alternative to iA Writer for Linux users. This Markdown editor brings over iA Writer's essential features, such as the blue insertion point and focus mode, while adding multilingual spell checking. Ideal for writers and bloggers looking for a clean writing environment on Linux."
---

Looking for a free alternative to iA Writer on Linux? Mine is called [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter"), an open-source Markdown editor maintained by KDE.

[Changing my blog engine](/en/20241005-on-fait-un-peu-le-menage) allowed me to:

1. (Re)discover the Markdown language
2. Dust off my distraction-free writing environments, such as OmmWriter or iA Writer

## iA Writer: the best Markdown editor?

iA Writer is the best Markdown editor in the world. Here is why:

- Its user interface is free of needless distractions, with a distinctive blue insertion point.
- It offers a "focus" mode that highlights the line, sentence or paragraph you are currently writing, dimming the rest of the text.
- iA Writer is designed so that the user's attention stays on the text, not on the interface or the formatting.

However, iA Writer does not exist on Linux: it is available on macOS, Windows, iPhone and iPad ([official website](https://ia.net/writer)).

## Looking for an alternative for Linux

My main computer is an HP Pro x2 hybrid tablet running Linux (more precisely the latest version of Zorin OS Pro). While looking for an alternative to iA Writer, I came across [Ghostwriter](https://ghostwriter.kde.org/ "Ghostwriter").

## Ghostwriter: a serious contender

This free application takes over my favourite iA Writer features:

- The famous blue insertion point
- A focus mode similar to iA Writer's
- Built-in spell checking

## Installing Ghostwriter

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

While iA Writer remains a reference among Markdown editors, Ghostwriter turns out to be an excellent alternative for Linux users. It offers a distraction-free writing experience similar to iA Writer, while being free and open source. For writers, bloggers or anyone looking for a clean and efficient writing environment on Linux, Ghostwriter is certainly worth a try.

*Updated October 8, 2026: iA Writer is available on macOS, Windows, iPhone and iPad, but still not on Linux. Added the commands to install Ghostwriter (Ubuntu repositories and Flathub).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — distraction-free writer*
