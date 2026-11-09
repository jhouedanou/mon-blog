---
title: "Claude Code Remote Control sur smartphone"
image: "/images/articles/clauderemote.webp"
createdAt: "2026-05-31"
updatedAt: "2026-11-08T12:00:00Z"
description: "Claude Code Remote Control : piloter depuis votre téléphone une session qui tourne sur votre ordinateur. Mise en place, plans, limites, et Dispatch."
searchIntent: "Comment contrôler une session Claude Code depuis un smartphone avec Remote Control."
tags: ["claude-code", "outils", "productivité", "développement"]
---

Avec Claude Code Remote Control, votre smartphone devient la télécommande d'une session Claude Code qui tourne sur votre ordinateur.

Il y a des jours où vous devez partir, mais votre code, lui, ne peut pas attendre.

Bug en prod. Client qui rappelle. Réunion dans 20 minutes à l'autre bout d'Abidjan. Ou ce collègue qui a pris l'habitude d'attendre la fin de journée pour mettre à jour la liste des fonctionnalités — quand il ne le fait pas le dimanche soir.

On pourrait s'y résigner, appeler ça « la vie du bureau » et subir en pestant. Ce n'est pas mon approche. Dans les rares cas où je ne [bloque pas ces sollicitations tardives](/fr/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel) — *oui, bloquées. Je suis professionnel, mais j'ai une vie. Et l'expérience montre que les messages envoyés à 18h pétantes ne sont jamais de vraies urgences, juste une façon de donner l'impression qu'on est un « gros bosseur qui ne lâche rien » (autrement connu sous un nom que ma bonne éducation m'empêche de donner ici)* — je rentre, j'allume le MacBook, et je laisse tourner Claude Code pour livrer sans sacrifier mon bien-être.

Ce workflow, je le dois à **Remote Control**, la fonction de Claude Code que j'appelais Dispatch par abus de langage dans la première version de ce billet. Le vrai **Dispatch** est son cousin côté Cowork, dans l'app Claude Desktop ([MacStories l'a testé](https://www.macstories.net/stories/hands-on-with-claude-dispatch-for-cowork/)). Le principe de [Remote Control](https://code.claude.com/docs/en/remote-control) : transformer votre smartphone en télécommande de votre session Claude Code active.

## Ce que fait Claude Code Remote Control

Votre code reste sur votre ordinateur. Claude Code tourne sur votre ordinateur. Votre téléphone devient un miroir chiffré de votre terminal : vous voyez ce que Claude fait, vous lui écrivez, vous approuvez ou refusez ses actions. Votre machine n'ouvre aucun port entrant : elle contacte l'API d'Anthropic en HTTPS, et les messages passent par là, chiffrés en TLS. La transcription de la session (vos messages, les réponses de Claude, ses actions) est stockée sur les serveurs d'Anthropic pour rester synchronisée entre vos appareils ; l'exécution et les fichiers, eux, restent sur votre ordinateur ([documentation de Remote Control](https://code.claude.com/docs/en/remote-control#connection-and-security){target="_blank" rel="noopener"}).

## Remote Control ou Dispatch : lequel choisir ?

Les deux se pilotent depuis l'app Claude sur le téléphone, et dans les deux cas Claude travaille sur votre ordinateur. La différence tient à ce que vous lui confiez ([comparatif de la documentation](https://code.claude.com/docs/en/remote-control#remote-control-vs-cloud-sessions){target="_blank" rel="noopener"}, [Dispatch dans Claude Desktop](https://code.claude.com/docs/en/desktop#sessions-from-dispatch){target="_blank" rel="noopener"}) :

| | Remote Control | Dispatch |
| --- | --- | --- |
| Où il vit | Claude Code : terminal, app Claude Desktop ou VS Code | Cowork, dans l'app Claude Desktop |
| Depuis le téléphone | Vous reprenez une session déjà ouverte | Vous envoyez une tâche ; Claude décide comment la traiter et peut ouvrir lui-même une session Claude Code |
| Mise en place | `/remote-control` dans la session | Appairer l'app mobile avec Claude Desktop |
| Plans | Pro, Max, Ultra, Team, Enterprise | Pro, Max, Ultra (ni Team ni Enterprise) |

Pour continuer un travail en cours, c'est Remote Control. Pour déléguer une tâche en partant, c'est Dispatch.

## Activer Remote Control en 3 étapes

**1. Ouvrez Claude Code dans votre terminal.**

Connectez-vous avec votre compte claude.ai (`/login`) : Remote Control ne fonctionne pas avec une clé API.

**2. Générez le lien de contrôle** en tapant dans la session active :

```bash
/rc
```

ou

```bash
/remote-control
```

Claude Code génère un lien sécurisé et un QR code. La première fois, une fenêtre demande confirmation : choisissez **Enable Remote Control**.

Pour démarrer directement une session pilotable, lancez `claude --remote-control` au lieu de `claude`. Et pour ne plus y penser, `/config` propose **Enable Remote Control for all sessions**.

**3. Connectez votre téléphone** : scannez le QR code, ou ouvrez l'app Claude officielle sur iOS ou Android, touchez **Code** dans la navigation et retrouvez la session correspondante dans la liste. Elle est indiquée par une icône d'ordinateur avec un point vert quand elle est en ligne. Pas encore l'app ? Tapez `/mobile` dans Claude Code : il affiche un QR code qui ouvre la bonne boutique d'applications.

C'est tout. Votre session est désormais pilotable depuis votre téléphone.

## Ce qu'il faut savoir avant de se lancer

- **Votre ordinateur doit rester allumé.** Remote Control ne ressuscite pas les sessions mortes : le processus `claude` doit continuer de tourner. Si votre Mac passe en veille ou perd le réseau, la session s'interrompt, puis Claude Code se reconnecte tout seul au retour de la machine. Exception : en mode serveur (`claude remote-control`), si la machine reste allumée mais sans réseau, Claude Code abandonne au bout d'une dizaine de minutes, et il faut relancer la commande.
- **C'est un miroir, pas un agent autonome.** Vous approuvez les changements : dans le mode de permission par défaut, Claude Code vous demande votre accord avant la plupart des modifications de fichiers, des commandes et des accès au réseau, et la demande s'affiche sur le téléphone. Si la session tourne dans un mode plus permissif (`acceptEdits`, par exemple), il agit sans demander ([modes de permission](https://code.claude.com/docs/en/permission-modes){target="_blank" rel="noopener"}).
- **Plan requis.** La fonctionnalité est disponible sur les plans Pro, Max, Ultra, Team et Enterprise (sur Team et Enterprise, un administrateur doit d'abord l'activer). Les clés API ne sont pas prises en charge, pas plus que Claude utilisé via Amazon Bedrock, Google Cloud ou Microsoft Foundry.
- **Notifications.** Dans `/config`, activez **Push when actions required** : les demandes d'autorisation et les questions de Claude arrivent en notification sur le téléphone ([documentation](https://code.claude.com/docs/en/remote-control#mobile-push-notifications){target="_blank" rel="noopener"}).
- **Des réponses courtes pour un petit écran.** [Le mode caveman de Claude Code](/fr/20260515-claude-code-caveman-mode) fait répondre l'agent en style télégraphique, plus facile à suivre sur un téléphone.

Pour ma part, l'usage reste simple : je n'ai jamais délégué l'écriture de mon code à Claude Code ([je m'en suis expliqué dans mon billet sur les limites du vibe coding](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite)). J'écris d'abord, Claude Code corrige ensuite — pas de skills, pas d'agents, juste mon terminal et moi. Remote Control va dans ce sens : je reste aux commandes, depuis n'importe où. Le preview se fait sur la smart TV ou l'iPad, selon la pièce où je me trouve.

*Mise à jour du 8 octobre 2026 : précisions d'après la [documentation officielle de Remote Control](https://code.claude.com/docs/en/remote-control) — la fonction s'appelle Remote Control (Dispatch est l'équivalent pour Cowork), elle est ouverte aux plans Pro, Max, Team et Enterprise, la session se retrouve dans l'onglet Code de l'app, et elle se reconnecte après une mise en veille. Le titre a été corrigé en conséquence (il parlait de « Claude Dispatch »).*

*Mise à jour du 8 novembre 2026 : d'après la [documentation officielle de Remote Control](https://code.claude.com/docs/en/remote-control){target="_blank" rel="noopener"}, ajout du plan Ultra, du lancement avec `claude --remote-control`, des notifications et d'un comparatif avec Dispatch. Deux précisions corrigent le billet : la transcription de la session est stockée chez Anthropic (il disait que rien ne transitait ailleurs), et Claude Code ne demande pas toujours votre accord : cela dépend du mode de permission de la session.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — C'est le genre de fonctionnalités qui donnent un sens à l'augmentation des prix des mémoires RAM.*
