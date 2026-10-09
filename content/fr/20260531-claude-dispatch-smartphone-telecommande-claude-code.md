---
title: "Avec Remote Control, votre smartphone devient une télécommande pour Claude Code"
image: "/images/articles/clauderemote.webp"
createdAt: "2026-05-31"
updatedAt: "2026-10-08T12:00:00Z"
description: "Piloter depuis votre téléphone une session Claude Code qui tourne sur votre ordinateur : mise en place en 3 étapes, plans éligibles et limites à connaître."
searchIntent: "Comment contrôler une session Claude Code depuis un smartphone avec Remote Control."
tags: ["claude-code", "outils", "productivité", "développement"]
---

Il y a des jours où vous devez partir, mais votre code, lui, ne peut pas attendre.

Bug en prod. Client qui rappelle. Réunion dans 20 minutes à l'autre bout d'Abidjan. Ou ce collègue qui a pris l'habitude d'attendre la fin de journée pour mettre à jour la liste des fonctionnalités — quand il ne le fait pas le dimanche soir.

On pourrait s'y résigner, appeler ça « la vie du bureau » et subir en pestant. Ce n'est pas mon approche. Dans les rares cas où je ne bloque pas ces sollicitations tardives — *oui, bloquées. Je suis professionnel, mais j'ai une vie. Et l'expérience montre que les messages envoyés à 18h pétantes ne sont jamais de vraies urgences, juste une façon de donner l'impression qu'on est un « gros bosseur qui ne lâche rien » (autrement connu sous un nom que ma bonne éducation m'empêche de donner ici)* — je rentre, j'allume le MacBook, et je laisse tourner Claude Code pour livrer sans sacrifier mon bien-être.

Ce workflow est rendu possible par **Remote Control**, la fonction de Claude Code que j'appelais Dispatch par abus de langage dans la première version de ce billet. Le vrai **Dispatch** est son cousin côté Cowork, dans l'app Claude Desktop ([MacStories l'a testé](https://www.macstories.net/stories/hands-on-with-claude-dispatch-for-cowork/)). Le principe de [Remote Control](https://code.claude.com/docs/en/remote-control) : transformer votre smartphone en télécommande de votre session Claude Code active.

## Ce que ça fait concrètement

Votre code reste sur votre ordinateur. Claude Code tourne sur votre ordinateur. Votre téléphone devient un miroir chiffré de votre terminal : vous voyez ce que Claude fait, vous approuvez ou refusez chaque action. Anthropic établit un tunnel sécurisé entre votre session desktop et l'app Claude mobile — rien ne transite ailleurs.

## Mise en place en 3 étapes

**1. Ouvrez Claude Code dans votre terminal.**

**2. Générez le lien de contrôle** en tapant dans la session active :

```bash
/rc
```

ou

```bash
/remote-control
```

Claude Code génère un lien sécurisé et un QR code.

**3. Connectez votre téléphone** : scannez le QR code, ou ouvrez l'app Claude officielle sur iOS ou Android, touchez **Code** dans la navigation et retrouvez la session correspondante dans la liste. Elle est indiquée par une icône d'ordinateur avec un point vert quand elle est en ligne.

C'est tout. Votre session est désormais pilotable depuis votre téléphone.

## Ce qu'il faut savoir avant de se lancer

- **Votre ordinateur doit rester allumé.** Remote Control ne ressuscite pas les sessions mortes : le processus `claude` doit continuer de tourner. Si votre Mac passe en veille ou perd le réseau, la session s'interrompt, puis Claude Code se reconnecte tout seul au retour de la machine.
- **C'est un miroir, pas un agent autonome.** Vous approuvez toujours les changements. Claude Code ne fait rien sans votre accord.
- **Plan requis.** La fonctionnalité est disponible sur les plans Pro, Max, Team et Enterprise (sur Team et Enterprise, un administrateur doit d'abord l'activer). Les clés API ne sont pas prises en charge.

Pour ma part, l'usage reste simple : je n'ai jamais délégué l'écriture de mon code à Claude Code ([je m'en suis expliqué ici](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite)). J'écris d'abord, Claude Code corrige ensuite — pas de skills, pas d'agents, juste mon terminal et moi. Remote Control s'inscrit dans cette logique : je reste aux commandes, depuis n'importe où. Le preview se fait sur la smart TV ou l'iPad, selon la pièce où je me trouve.

Simple. Efficace. Trois étapes.

*Mise à jour du 8 octobre 2026 : précisions d'après la [documentation officielle de Remote Control](https://code.claude.com/docs/en/remote-control) — la fonction s'appelle Remote Control (Dispatch est l'équivalent pour Cowork), elle est ouverte aux plans Pro, Max, Team et Enterprise, la session se retrouve dans l'onglet Code de l'app, et elle se reconnecte après une mise en veille. Le titre a été corrigé en conséquence (il parlait de « Claude Dispatch »).*

---
*[Jean-Luc Houédanou](https://houedanou.com) — C'est le genre de fonctionnalités qui donnent un sens à l'augmentation des prix des mémoires RAM.*
