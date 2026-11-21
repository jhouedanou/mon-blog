---
title: "Chrome DevTools: keep CSS changes on refresh"
createdAt: "2026-04-01"
image: "/images/articles/dev/01.webp"
description: "Do your CSS tweaks vanish on refresh? Chrome DevTools Local Overrides and Workspaces keep CSS changes after a refresh. A step-by-step setup guide."
updatedAt: "2026-10-08T12:00:00Z"
searchIntent: "How to make CSS changes persistent in Chrome DevTools with Local Overrides and Workspaces."
tags: ["tutorial", "dev"]
---

By default, everything you change in Chrome DevTools disappears on the next refresh. Two features let you keep CSS changes after a refresh: **Local Overrides**, which keep a local copy of a site's files and inject it back on every load, and **Workspaces**, which write directly to your project's files.

**Prerequisites**: an up-to-date Google Chrome and, for phase 2, a project served locally (for example on `http://localhost:3000`).

## Phase 1: Keep CSS changes after a refresh with Local Overrides

This method is the simplest way to keep your "live" changes, even if you refresh the page.

### Step 1: preparing the environment

First, give DevTools a local folder to store the files you're going to modify.

Action: Open the inspector (F12), go to the **Sources** tab, then locate the **Overrides** sub-tab. For now, this tab is empty. Prepare an empty folder on your desktop (here named `devtools_overrides`).

![Chrome DevTools open on the Sources > Overrides tab, still empty, with a devtools_overrides folder on the desktop](/images/articles/dev/01.webp)

### Step 2: enabling Overrides and approving the security prompt

This is the step people forget most often. Chrome needs your explicit permission to write to your hard drive.

Action: Click the **+ Select folder for overrides** button. Choose the `devtools_overrides` folder created in step 1. A yellow bar appears at the top of Chrome: click **Allow**.

![The Select folder for overrides button in DevTools and the yellow bar asking for folder access, with the Allow and Deny buttons](/images/articles/dev/02.webp)

### Step 3: checking persistence after a refresh

Once permission is granted, your CSS changes are automatically saved locally.

Action: Change, for example, the `body { background-color: lightblue; }` rule in the **Elements** tab. The page turns light blue. Notice the small purple dot in the DevTools navigation bar: it confirms that Chrome is using an active local copy.

![Page turned light blue after editing the body rule in the Elements tab, with the purple dot of the active override](/images/articles/dev/03.webp)

Refresh the page (F5): the background stays light blue, because Chrome injected your local file instead of the remote one.

One limit to know about: if the CSS rule comes from a `<style>` tag in the HTML file, DevTools doesn't save the change made in the Styles pane ([Chrome documentation](https://developer.chrome.com/docs/devtools/overrides)). In that case, edit the HTML in the **Sources** tab.

## Phase 2: Workspaces, integrating DevTools and VS Code (advanced)

Workspaces let you edit your local project directly, live in Chrome. With modern frameworks (Vue, Nuxt), though, it takes a more advanced workflow (Vite, Webpack). That's the case for this blog, which [moved from WordPress to Nuxt](/en/20241005-on-fait-un-peu-le-menage) to become [a flat-file blog with no database](/en/20241021-pendaison-de-cremaillere).

### Step 1: connecting the project folder

Unlike Local Overrides, which replace a file, Workspaces merge a folder of network files (localhost:3000) with your folder of local files (`my-project`).

Action: Open Chrome on your local project (e.g. `http://localhost:3000`). In DevTools → **Sources**, go to the **Workspace** tab (it was called **Filesystem** in older versions of Chrome, as in the screenshot). Click **Add folder manually**, choose your `my-project` project folder, then allow access. Chrome will automatically map (associate) your network files to the local files. The small green dot on the `style.css` file confirms the mapping succeeded.

![The DevTools Filesystem tab mapping the my-project folder to the localhost:3000 site, with a green dot on style.css](/images/articles/dev/04.webp)

### Step 2: the non-destructive workflow, Chrome ↔ VS Code

You can now work in "live-editing" mode, without leaving the browser, while staying in control of what gets written to your project.

Action: The project is running in Chrome (left) and open in VS Code (right). Change the colour of the `h1` in the `style.css` file, from Chrome's **Sources** tab. The change applies to the page right away, and an asterisk in DevTools shows that the file hasn't been saved yet.

![Chrome and VS Code side by side: the h1 colour changes to coral in the mapped style.css file](/images/articles/dev/05.webp)

As long as you don't hit `CTRL+S` (save) in Chrome DevTools, nothing is written to disk, so your experiments can't break anything. As soon as you save, DevTools writes to the source file, and VS Code shows the new version ([Chrome documentation](https://developer.chrome.com/docs/devtools/workspaces)).

---

## Technical notes and limits

- **Source Maps**: in a modern workflow (Nuxt, Vite), persistence often relies on the presence of Source Maps. Make sure your bundler generates the `.map` files to keep the mapping between source code and executed code.
- **HMR / CSS-in-JS**: some transformations (CSS-in-JS, dynamically computed styles) may not map cleanly. When testing persistence, stick to plain CSS/SCSS.

## Conclusion

Local Overrides for quick debugging, Workspaces for active development. DevTools can also simulate other screen sizes, for example to [test a site on the iPhone Duo](/en/20260911-site-responsive-iphone-duo).

*Updated October 8, 2026: in recent versions of Chrome, the **Filesystem** tab is called **Workspace**, and you connect a folder with **Add folder manually**. Chrome can also connect the folder automatically if your development server serves a `.well-known/appspecific/com.chrome.devtools.json` file ([Chrome documentation on Workspaces](https://developer.chrome.com/docs/devtools/workspaces)). Phase 2 now also makes clear that changes are only written to disk on `Ctrl+S`, and phase 1 points out that styles declared in the HTML are not saved from the Styles pane.*

---
*[Jean-Luc Houédanou](https://houedanou.com), official distributor of Ctrl+S · #CtrlSLeRetour*
