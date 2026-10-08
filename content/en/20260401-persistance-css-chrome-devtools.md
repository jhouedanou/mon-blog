---
title: "Beyond the Refresh: making CSS persistent with Chrome DevTools"
createdAt: "2026-04-01"
image: "/images/articles/dev/01.webp"
description: "Do your CSS tweaks vanish on refresh? Chrome DevTools Local Overrides and Workspaces make them persistent. A step-by-step setup guide."
updatedAt: "2026-10-08T12:00:00Z"
searchIntent: "How to make CSS changes persistent in Chrome DevTools with Local Overrides and Workspaces."
tags: ["tutorial", "dev"]
---

By default, everything you change in Chrome DevTools disappears on the next refresh. Two features fix that: **Local Overrides**, which keep a local copy of a site's files and inject it back on every load, and **Workspaces**, which write directly to your project's files.

**Prerequisites**: an up-to-date Google Chrome and, for phase 2, a project served locally (for example on `http://localhost:3000`).

## Phase 1: Making CSS persistent with "Local Overrides"

This method is the simplest way to keep your "live" changes, even if you refresh the page.

### Step 1: preparing the environment

We are going to configure DevTools so it has a local storage space for the files you will modify.

Action: Open the inspector (F12), go to the **Sources** tab, then locate the **Overrides** sub-tab. For now, this tab is empty. Prepare an empty folder on your desktop (here named `devtools_overrides`).

![Chrome DevTools open on the Sources > Overrides tab, still empty, with a devtools_overrides folder on the desktop](/images/articles/dev/01.webp)

### Step 2: enabling Overrides and approving the security prompt

This is the most crucial and most often forgotten step. Chrome needs your explicit permission to write to your hard drive.

Action: Click the **+ Select folder for overrides** button. Choose the `devtools_overrides` folder created in step 1. A yellow bar appears at the top of Chrome: click **Allow**. The "bridge" is now established.

![The Select folder for overrides button in DevTools and the yellow bar asking for folder access, with the Allow and Deny buttons](/images/articles/dev/02.webp)

### Step 3: checking persistence after a refresh

Once permission is granted, your CSS changes are automatically saved locally.

Action: Change, for example, the `body { background-color: lightblue; }` rule in the **Elements** tab. The page turns light blue. Notice the small purple dot in the DevTools navigation bar: it confirms that Chrome is using an active local copy.

![Page turned light blue after editing the body rule in the Elements tab, with the purple dot of the active override](/images/articles/dev/03.webp)

For proof: refresh the page (F5). The background stays light blue, because Chrome injected your local file instead of the remote one. You have persistence.

One limit to know about: if the CSS rule comes from a `<style>` tag in the HTML file, DevTools does not save the change made in the Styles pane ([Chrome documentation](https://developer.chrome.com/docs/devtools/overrides)). In that case, edit the HTML in the **Sources** tab.

## Phase 2: Workspaces, integrating DevTools and VS Code (advanced)

Workspaces let you edit your local project directly, live in Chrome. It is the ultimate productivity step, but it requires a more advanced workflow (Vite, Webpack) for modern frameworks (Vue, Nuxt).

### Step 1: connecting the project folder

Unlike Local Overrides, which replace a file, Workspaces merge a folder of network files (localhost:3000) with your folder of local files (`my-project`).

Action: Open Chrome on your local project (e.g. `http://localhost:3000`). In DevTools → **Sources**, go to the **Workspace** tab (it was called **Filesystem** in older versions of Chrome, as in the screenshot). Click **Add folder manually**, choose your `my-project` project folder, then allow access. Chrome will automatically map (associate) your network files to the local files. The small green dot on the `style.css` file confirms the mapping succeeded.

![The DevTools Filesystem tab mapping the my-project folder to the localhost:3000 site, with a green dot on style.css](/images/articles/dev/04.webp)

### Step 2: the non-destructive workflow, Chrome ↔ VS Code

Here is the final workflow. You can now work in "live-editing" mode, without leaving the browser, while staying in control of what gets written to your project.

Action: The project is running in Chrome (left) and open in VS Code (right). Change the colour of the `h1` in the `style.css` file, from Chrome's **Sources** tab. The change applies to the page right away, and an asterisk in DevTools shows that the file has not been saved yet.

![Chrome and VS Code side by side: the h1 colour changes to coral in the mapped style.css file](/images/articles/dev/05.webp)

Technical confirmation: as long as you do not hit `CTRL+S` (save) in Chrome DevTools, nothing is written to disk. Your iterations stay local, visual, and above all non-destructive. As soon as you save, DevTools writes to the source file, and VS Code shows the new version ([Chrome documentation](https://developer.chrome.com/docs/devtools/workspaces)).

---

## Technical notes and limits

- **Source Maps**: in a modern workflow (Nuxt, Vite), persistence often relies on the presence of Source Maps. Make sure your bundler generates the `.map` files to keep the mapping between source code and executed code.
- **HMR / CSS-in-JS**: some transformations (CSS-in-JS, dynamically computed styles) may not map cleanly. For maximum reliability, stick to classic CSS/SCSS when testing persistence.

## Conclusion

Local Overrides for quick debugging, Workspaces for active development: combined, they turn DevTools into a real productivity companion.

*Updated October 8, 2026: in recent versions of Chrome, the **Filesystem** tab is called **Workspace**, and you connect a folder with **Add folder manually**. Chrome can also connect the folder automatically if your development server serves a `.well-known/appspecific/com.chrome.devtools.json` file ([Chrome documentation on Workspaces](https://developer.chrome.com/docs/devtools/workspaces)). Phase 2 now also makes clear that changes are only written to disk on `Ctrl+S`, and phase 1 points out that styles declared in the HTML are not saved from the Styles pane.*

---

*[Jean Luc Houédanou](https://houedanou.com), official distributor of Ctrl+S · #CtrlSLeRetour*
