---
title: "Beyond the Refresh: making CSS persistent with Chrome DevTools"
createdAt: "2026-04-01"
image: "/images/articles/dev/01.webp"
description: "Practical guide: Local Overrides and Workspaces in Chrome DevTools, with step-by-step setup to make your CSS changes persistent, even with Nuxt/Vite and Source Maps."
searchIntent: "How to make CSS changes persistent in Chrome DevTools with Local Overrides and Workspaces."
tags: ["tutorial", "dev"]
---

# Phase 1: Making CSS persistent with "Local Overrides"

This method is the simplest way to keep your "live" changes, even if you refresh the page.

### Step 1: preparing the environment

We are going to configure DevTools so it has a local storage space for the files you will modify.

Action: Open the inspector (F12), go to the **Sources** tab, then locate the **Overrides** sub-tab. For now, this tab is empty. Prepare an empty folder on your desktop (here named `devtools_overrides`).
![Préparation de l'environnement](/images/articles/dev/01.webp)

### Step 2: enabling Overrides and approving the security prompt

This is the most crucial and most often forgotten step. Chrome needs your explicit permission to write to your hard drive.

Action: Click the **+ Select folder for overrides** button. Choose the `devtools_overrides` folder created in step 1. A yellow bar appears at the top of Chrome: click **Allow**. The "bridge" is now established.
![Préparation de l'environnement](/images/articles/dev/02.webp)
![Préparation de l'environnement](/images/articles/dev/03.webp)

### Step 3: checking persistence after a refresh

Once permission is granted, your CSS changes are automatically saved locally.

Action: Change, for example, the `body { background-color: lightblue; }` rule in the **Elements** tab. The page turns light blue. Notice the small purple dot in the DevTools navigation bar: it confirms that Chrome is using an active local copy.

For proof: refresh the page (F5). The background stays light blue, because Chrome injected your local file instead of the remote one. You have persistence.
![Préparation de l'environnement](/images/articles/dev/04.webp)

# Phase 2: Workspaces, integrating DevTools and VS Code (advanced)

Workspaces let you edit your local project directly, live in Chrome. It is the ultimate productivity step, but it requires a more advanced workflow (Vite, Webpack) for modern frameworks (Vue, Nuxt).
![Préparation de l'environnement](/images/articles/dev/05.webp)

### Step 1: enabling Filesystem mapping

Unlike Local Overrides, which replace a file, Workspaces merge a folder of network files (localhost:3000) with your folder of local files (`my-project`).

Action: Open Chrome on your local project (e.g. `http://localhost:3000`). In DevTools → **Sources**, go to the **Filesystem** tab. Add your `my-project` project folder. Chrome will automatically map (associate) your network files to the local files. The small green dot on the `style.css` file confirms the mapping succeeded.

### Step 2: the non-destructive workflow, Chrome ↔ VS Code

Here is the final workflow. You can now work in "live-editing" mode, without leaving the browser to save, while being certain your IDE is up to date.

Action: The project is running in Chrome (left) and open in VS Code (right). Change the colour of the `h1` in Chrome. Notice the modification asterisk in Chrome DevTools and in VS Code.

Technical confirmation: The two are synchronised. As long as you do not hit `CTRL+S` (save) in Chrome DevTools, VS Code does not write the changes. Your iterations stay local, visual, and above all non-destructive.

---

## Technical notes and limits

- **Source Maps**: in a modern workflow (Nuxt, Vite), persistence often relies on the presence of Source Maps. Make sure your bundler generates the `.map` files to keep the mapping between source code and executed code.
- **HMR / CSS-in-JS**: some transformations (CSS-in-JS, dynamically computed styles) may not map cleanly. For maximum reliability, stick to classic CSS/SCSS when testing persistence.

## Conclusion

Local Overrides for quick debugging, Workspaces for active development: combined, they turn DevTools into a real productivity companion.

Questions? Would you like me to add a step-by-step recap with screenshots or a `vite.config.ts` example for enabling Source Maps?

---

*[Jean Luc Houédanou](https://houedanou.com), official distributor of Ctrl+S · #CtrlSLeRetour*
