---
title: "Au‑delà du Refresh : rendre le CSS persistant avec Chrome DevTools"
createdAt: "2026-04-01"
image: "/images/articles/dev/01.webp"
description: "Vos retouches CSS disparaissent au rafraîchissement ? Local Overrides et Workspaces de Chrome DevTools les rendent persistantes. Configuration pas à pas."
updatedAt: "2026-10-08T12:00:00Z"
searchIntent: "Comment rendre des modifications CSS persistantes dans Chrome DevTools avec Local Overrides et Workspaces."
tags: ["tutoriel", "dev"]
---

Par défaut, tout ce que vous modifiez dans Chrome DevTools disparaît au prochain rafraîchissement. Deux fonctions règlent ça : les **Local Overrides**, qui gardent une copie locale des fichiers d'un site et la réinjectent à chaque chargement, et les **Workspaces**, qui écrivent directement dans les fichiers de votre projet.

**Prérequis** : Google Chrome à jour et, pour la phase 2, un projet servi en local (par exemple sur `http://localhost:3000`).

## Phase 1 : Rendre le CSS persistant avec les « Local Overrides »

Cette méthode est la plus simple pour conserver vos modifications « live », même si vous rafraîchissez la page.

### Étape 1 : préparation de l'environnement

Nous allons configurer DevTools pour qu'il dispose d'un espace de stockage local pour vos futurs fichiers modifiés.

Action : Ouvrez l'inspecteur (F12), allez dans l'onglet **Sources**, puis localisez le sous‑onglet **Overrides**. Pour l'instant, cet onglet est vide. Préparez un dossier vide sur votre bureau (ici nommé `devtools_overrides`).

![Chrome DevTools ouvert sur l'onglet Sources > Overrides, encore vide, avec un dossier devtools_overrides sur le bureau](/images/articles/dev/01.webp)

### Étape 2 : activer les Overrides et valider la sécurité

C'est l'étape la plus cruciale et la plus souvent oubliée. Chrome a besoin de votre permission explicite pour écrire sur votre disque dur.

Action : Cliquez sur le bouton **+ Select folder for overrides** (Sélectionner un dossier pour les overrides). Choisissez le dossier `devtools_overrides` créé à l'étape 1. Une barre jaune apparaît en haut de Chrome : cliquez sur **Autoriser (Allow)**. Le « pont » est maintenant établi.

![Bouton Select folder for overrides dans DevTools et barre jaune demandant l'accès au dossier, avec les boutons Allow et Deny](/images/articles/dev/02.webp)

### Étape 3 : vérifier la persistance après un refresh

Une fois l'autorisation donnée, vos modifications CSS sont automatiquement sauvegardées en local.

Action : Modifiez, par exemple, la règle `body { background-color: lightblue; }` dans l'onglet **Elements**. La page devient bleu clair. Observez le petit point violet dans la barre de navigation DevTools : il confirme que Chrome utilise une copie locale active.

![Page passée en bleu clair après modification de la règle body dans l'onglet Elements, avec le point violet de l'override actif](/images/articles/dev/03.webp)

Pour preuve : rafraîchissez la page (F5). Le fond reste bleu clair, car Chrome a injecté votre fichier local au lieu du fichier distant. Vous avez la persistance.

Une limite à connaître : si la règle CSS vient d'une balise `<style>` dans le fichier HTML, DevTools n'enregistre pas la modification faite dans le panneau Styles ([documentation Chrome](https://developer.chrome.com/docs/devtools/overrides)). Dans ce cas, modifiez le HTML dans l'onglet **Sources**.

## Phase 2 : Workspaces — intégrer DevTools et VS Code (avancé)

Les Workspaces vous permettent de modifier directement votre projet local, en direct dans Chrome. C'est l'étape ultime de la productivité, mais elle nécessite un workflow plus avancé (Vite, Webpack) pour les frameworks modernes (Vue, Nuxt).

### Étape 1 : connecter le dossier du projet

Contrairement aux Local Overrides qui remplacent un fichier, les Workspaces fusionnent un dossier de fichiers réseaux (localhost:3000) avec votre dossier de fichiers locaux (`my-project`).

Action : Ouvrez Chrome sur votre projet local (ex : `http://localhost:3000`). Dans DevTools → **Sources**, allez sur l'onglet **Workspace** (il s'appelait **Filesystem** dans les anciennes versions de Chrome, comme sur la capture). Cliquez sur **Add folder manually**, choisissez votre dossier de projet `my-project`, puis autorisez l'accès. Chrome va automatiquement mapper (associer) vos fichiers réseaux aux fichiers locaux. Le petit point vert sur le fichier `style.css` confirme la réussite du mapping.

![Onglet Filesystem de DevTools associant le dossier my-project au site localhost:3000, avec un point vert sur style.css](/images/articles/dev/04.webp)

### Étape 2 : le workflow non-destructif — Chrome ↔ VS Code

Voici le workflow final. Vous pouvez maintenant travailler en « live-editing », sans quitter le navigateur, tout en gardant la main sur ce qui est écrit dans votre projet.

Action : Le projet tourne sur Chrome (gauche) et est ouvert dans VS Code (droite). Modifiez la couleur du `h1` dans le fichier `style.css`, depuis l'onglet **Sources** de Chrome. Le changement s'applique tout de suite à la page, et un astérisque signale dans DevTools que le fichier n'est pas encore enregistré.

![Chrome et VS Code côte à côte : la couleur du h1 passe à coral dans le fichier style.css mappé](/images/articles/dev/05.webp)

Confirmation technique : tant que vous ne faites pas `CTRL+S` (sauvegarder) dans Chrome DevTools, rien n'est écrit sur le disque. Vos itérations restent locales, visuelles et surtout non-destructives. Dès que vous sauvegardez, DevTools écrit dans le fichier source, et VS Code affiche la nouvelle version ([documentation Chrome](https://developer.chrome.com/docs/devtools/workspaces)).

---

## Notes techniques et limites

- **Source Maps** : dans un workflow moderne (Nuxt, Vite), la persistance repose souvent sur la présence de Source Maps. Assurez‑vous que votre bundler génère les `.map` pour garder le mapping entre code source et code exécuté.
- **HMR / CSS-in-JS** : certaines transformations (CSS-in-JS, styles calculés dynamiquement) peuvent ne pas se mapper proprement. Pour une fiabilité maximale, privilégiez du CSS/SCSS classique lors des tests de persistance.

## Conclusion

Local Overrides pour du debug rapide, Workspaces pour le développement actif : combinés, ils transforment DevTools en un vrai compagnon de productivité.

*Mise à jour du 8 octobre 2026 : dans les versions récentes de Chrome, l'onglet **Filesystem** s'appelle **Workspace**, et la connexion d'un dossier se fait via **Add folder manually**. Chrome peut aussi connecter le dossier automatiquement si votre serveur de développement sert un fichier `.well-known/appspecific/com.chrome.devtools.json` ([documentation Chrome sur les Workspaces](https://developer.chrome.com/docs/devtools/workspaces)). La phase 2 précise aussi que les modifications ne sont écrites sur le disque qu'au `Ctrl+S`, et la phase 1 signale que les styles déclarés dans le HTML ne sont pas enregistrés depuis le panneau Styles.*

---

*[Jean Luc Houédanou](https://houedanou.com) — distributeur officiel de Ctrl+S · #CtrlSLeRetour*
