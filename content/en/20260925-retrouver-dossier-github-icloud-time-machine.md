---
title: "How to regain access to your GitHub folder after switching to iCloud+ (thanks to Time Machine)"
createdAt: "2026-09-25T19:30:00Z"
image: "/images/articles/pexels-jibarofoto-2148222.webp"
description: "After turning on Desktop and Documents syncing with iCloud+, my GitHub repositories stopped responding. Here is why iCloud Drive blocks Git, and how to get your code folders back from a Time Machine backup."
searchIntent: "How to recover a GitHub folder on a Mac that is blocked by iCloud Drive's Desktop and Documents syncing, by restoring it with Time Machine?"
tags: ["tutorial", "apple", "macos", "icloud", "git", "dev"]
---

# How to regain access to your GitHub folder after switching to iCloud+ (thanks to Time Machine)

> **Before we start.** To answer the questions about my new productivity: yes, I do use AI. For several months now, it has been **correcting** my articles, and above all, it fetches the illustration images from Pexels, like the ones in this post. The problem is not AI, it is the misuse of AI. In my case, it saves me from typos and improves the front matter, the block of information at the top of each article (title, date, image, description, tags), since this blog runs entirely on Markdown files. Not to mention that it makes it easier for me to build new features, like the carousels and audio players in [the Koala Sampler article](/en/20260822-koala-sampler-gratuit-mac-boom-bap).

Well, I doubt a competent developer would run into this problem, but it is a mistake that can happen even to the most experienced.

I recently signed up for iCloud's paid plan, largely for its price: 700 CFA francs a month for 50 GB of cloud storage, access to Apple TV (formerly Apple TV+) and Apple Arcade, [included in iCloud+ in Côte d'Ivoire since September](https://www.apple.com/ci/newsroom/2026/09/icloud-plus-expands-to-include-apple-tv-and-apple-arcade/).

Then I turned on iCloud Drive's "Desktop & Documents Folders" option, the iCloud feature that lets you sync the files and folders on your Desktop and in your Documents folder with your Mac computers. Everything was fine until I tried to pull code from a GitHub repo. The wheel spins, endlessly, with no update.

The problem is that a folder synced by iCloud Drive is not compatible with Git.

Here is how I got my code folders back: with Time Machine.

## Why iCloud Drive blocks Git

If you use GitHub Desktop, your repositories are stored by default in `Documents/GitHub`. Turning on "Desktop & Documents Folders" therefore sends all your repositories to iCloud: the code, the hidden `.git` folder that holds the whole history, and the dependencies. In a JavaScript project, the `node_modules` folder alone often contains tens of thousands of files.

Git is not designed to work in a folder that another program changes at the same time. With every command (`pull`, `commit`, `checkout`), it creates, edits and renames many small files in `.git`, in a fraction of a second. iCloud, for its part, watches every file in the folder to upload it to its servers. Several things can then go wrong:

- **Everything slows down.** Every file Git creates or changes has to be synced in turn, sometimes while iCloud has not finished uploading the repository's thousands of files.
- **Some files are no longer on the disk.** If "Optimize Mac Storage" is turned on and the disk is running low on space, macOS keeps some files only in iCloud. When Git needs to read them, it waits for them to download. On a slow connection, that wait can last a very long time, and the wheel spins endlessly.
- **The repository can get corrupted.** When two versions of the same file conflict, iCloud does not merge them: it keeps both and renames one, for example `index 2` or `HEAD 2`. Git does not know these files, and the repository can become unreadable.

Your code already has an online copy: the one you push to GitHub. It does not need a second copy in iCloud.

![A MacBook Air showing code in an editor](/images/articles/pexels-duncanoluwaseun-226232.webp)

## Before you start

- **A Time Machine backup made before you turned on "Desktop & Documents Folders".** It holds your GitHub folder as it was before iCloud.
- **The backup disk, connected to the Mac.**
- **An idea of what was never pushed.** Whatever you pushed to GitHub after the backup date comes back with `git pull` (step 5). Commits and changes that were never pushed only exist in the copy left in iCloud: you recover them with Git in step 6.

No Time Machine backup? Everything you pushed to GitHub is still there. Turn off "Desktop & Documents Folders" (step 1), then clone your repositories again into a folder outside iCloud (see "So it does not happen again", below).

## The 6 steps

### 1. Turn off "Desktop & Documents Folders"

Open the Apple menu, then **System Settings**. Click your name, then **iCloud**. Click **Drive** (or **iCloud Drive**, depending on your version of macOS), turn off **Desktop & Documents Folders**, then click **Done**.

Your files do not disappear: they stay in iCloud Drive, and macOS creates new Desktop and Documents folders on your Mac. Your Documents folder becomes a local folder again, one that iCloud no longer syncs. That is where Time Machine will put the GitHub folder back.

### 2. Open Time Machine on the Documents folder

Connect the backup disk. Open a Finder window on the new **Documents** folder, then open **Time Machine** with Spotlight (Cmd + Space, then type "Time Machine").

![A hand holding an external hard drive connected to a laptop](/images/articles/pexels-arina-krasnikova-5951748.webp)

### 3. Go back to a backup from before iCloud

Use the arrows next to the window, or the timeline on the right edge of the screen, to go back in time. Pick the most recent backup made **before** you turned on "Desktop & Documents Folders": the more recent it is, the less work you will have to catch up on. The **GitHub** folder shows up again in Documents.

### 4. Restore the GitHub folder

Select the **GitHub** folder, then click **Restore**. Time Machine puts it back in its original location, `Documents/GitHub`, which is a local folder again.

Since the path has not changed, GitHub Desktop finds your repositories again. If it shows "Can't find" for one of them, click **Locate…** and point it to the repository's folder.

### 5. Bring the repositories up to date

The backup predates the incident, so it is missing the commits pushed to GitHub since then. For each repository, open Terminal and run:

```bash
cd ~/Documents/GitHub/project-name
git status
```

`git status` checks that the repository can be read and shows the modified files. If there are none, a plain `git pull` fetches from GitHub everything that was pushed after the backup date. In GitHub Desktop, the **Fetch origin** then **Pull origin** buttons do the same thing.

If there are modified files, set them aside first: otherwise, Git refuses the `git pull` as soon as one of those files has also changed on GitHub.

```bash
git stash push --include-untracked
git pull
git stash pop
```

`git stash pop` puts your changes back, and reports a conflict if the same part of a file changed on both sides. For a full check of the history, `git fsck` verifies the repository's integrity.

### 6. Recover unpushed work, then delete the iCloud copy

The old copy of your repositories is still in iCloud Drive, under **Documents > GitHub**. If you had work that was never pushed to GitHub, that is where it is. Do not copy its files over the restored repository: you would overwrite the newer versions that `git pull` just brought back, and lose the history of your commits.

**For commits that were never pushed**, let Git recover them. From the restored repository, replace `main` with the name of your branch and run:

```bash
git fetch ~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/GitHub/project-name main:recup-icloud
git merge recup-icloud
git push
```

The first line copies the commits from the iCloud copy into a new branch, `recup-icloud`. The second merges them into your branch, and Git reports any conflicts. The third finally sends them to GitHub. To type the path without mistakes, type `git fetch ` then drag the project folder from iCloud Drive into the Terminal window.

**For changes that were never committed**, copy the files concerned into a separate folder, outside the repository, and compare them with the ones in the restored repository before carrying your changes over. Do the same if Git cannot read the iCloud copy.

Once everything works, delete the iCloud copy. It is no longer useful and it takes up part of your 50 GB. If you make a mistake, iCloud keeps it for another 30 days in **Recently Deleted**, on iCloud.com.

## So it does not happen again

- **Keep your code out of the Desktop and Documents.** iCloud Drive only syncs its own folder, plus the Desktop and Documents when the option is on. A dedicated folder in your home folder, for example `~/Developer`, stays out of it:

  ```bash
  mkdir -p ~/Developer
  mv ~/Documents/GitHub ~/Developer/
  ```

  In GitHub Desktop, then click **Locate…** for each repository, or add them with **File > Add Local Repository**.

- **Change GitHub Desktop's clone folder.** When cloning, replace `Documents/GitHub` with `~/Developer` in the **Local path** field. GitHub Desktop remembers the last folder you used.
- **Turn "Desktop & Documents Folders" back on if you want to**, once the code is out of Documents.
- **Keep Time Machine**, it is how I got my repositories back. And push to GitHub often: a pushed commit no longer depends on your Mac.

---

_Photos: [Luis Quintero](https://www.pexels.com/@jibarofoto/), [Oluwaseun Duncan](https://www.pexels.com/@duncanoluwaseun/) and [Arina Krasnikova](https://www.pexels.com/@arina-krasnikova/), on Pexels._
