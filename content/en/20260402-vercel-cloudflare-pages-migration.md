---
title: "From Vercel to Cloudflare Pages: how I said goodbye to hosting fees (and why you should too)"
image: "/images/articles/cloudflarevercel.webp"
createdAt: "2026-04-02"
description: "Field report on migrating from Vercel to Cloudflare Pages: unlimited bandwidth, free SSR, ultra-fast CDN, and zero bill. A complete guide for African developers."
searchIntent: "How to migrate a Nuxt project from Vercel to Cloudflare Pages to cut hosting costs."
tags: ["tutorial", "dev", "africa"]
---

# From Vercel to Cloudflare Pages: how I said goodbye to hosting fees (and why you should too)

You know that feeling? You launch your little side project on Vercel, everything is fine... until the moment you receive your first invoice.

I have been there too.

> **Warning**: this article contains unreasonable quantities of error messages, frustration, and at least one web form that refuses to work. Not for the faint of heart.

Except that after the cPanel saga and the impossible licence payments (thanks, Uncle Donald 🫡 ... ), I told myself: **if I have to choose my tools, they might as well be free, and they might as well be good.**

That is how I discovered you do not really need to pay to get hosting that moves mountains.

---

## The problem with Vercel (and why I have to move)

Vercel is comfortable. Very comfortable.

- Deployment from GitHub in three clicks
- Free HTTPS
- Global CDN
- Free Edge Functions

But here is the thing: the free tier is **100 GB of bandwidth per month**. And once you go over (or get close), prices climb fast. Very fast.

Given that I have to host several personal projects (including this blog, and other digital experiments), the bill adds up.

Vercel is not bad. You just have to be honest: it is built for funded startups, not for African developers who want to keep their independence.

---

## Why Cloudflare Pages? (The real game-changer)

Right, first I need to clarify something: **Cloudflare is not perfect**. But for what I do, it is the best free value for money I have found.

Here is why:

### 1. **Unlimited bandwidth** 🚀

With Vercel: 100 GB/month (free), then it gets expensive.
With Cloudflare Pages: **unlimited**.

I repeat: **unlimited**.

If your blog explodes in visibility (optimistic hypothesis), you will not pay a cent more.

### 2. **Full SSR** (free Edge Functions)

Unlike GitHub Pages (which only does static), Cloudflare Pages supports **edge functions** for free.

What does that mean? That I can serve dynamic content, API calls, server-side rendering, all without extra costs.

My Nuxt 3 with SSR? Works perfectly.

### 3. **Ultra-fast CDN (and I mean really fast)**

Cloudflare runs the largest network of data centres in the world. Your site is served from the Cloudflare server closest to the user.

**Zero latency for our local users**.

### 4. **100,000 requests per day (free)**

My blog has just been migrated. First day on Cloudflare Pages: **492 requests out of the 100,000 allowed per day**. Plenty of headroom.

To put that in perspective: Vercel limits bandwidth, Cloudflare limits requests, but at 100,000/day, your site really has to go viral to hit that limit.

### 5. **Ridiculously simple configuration**

- 3,000 build minutes/month (free, and with only 27 minutes used after several deployments, we have plenty of room)
- Direct connection to GitHub
- Auto-deploy on every push
- Auto-renewed SSL certificates
- 200,000 observability events/day (logs, traces)

It is almost too simple.

Well, in theory.

In practice, read the "Traps" section below before celebrating. 😬

### 6. **The price of a custom domain**

Cloudflare charges nothing for pointing a custom domain. You keep your registrar (Namecheap, GoDaddy, whatever), and Cloudflare provides the DNS.

It's free.

---

## How I switched (and how you can too)

### Step 1: Change the Nitro preset

In `nuxt.config.js` (or `nuxt.config.ts`):

```js
export default defineNuxtConfig({
  nitro: {
    presets: ['cloudflare-pages']
  }
})
```

That is literally all you need to change in your Nuxt config.

### Step 2: Create the `wrangler.toml` file

At the root of your project. **Careful**: the config depends on how your project was created on Cloudflare.

**If your project is a Pages project** (created via Cloudflare Pages):

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
pages_build_output_dir = "./dist"
```

**If your project is a Workers project** (or if the dashboard forces you to use `npx wrangler deploy`):

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
main = "dist/_worker.js/index.js"

[assets]
directory = "./dist"
```

How do you know? Try changing the deploy command in the dashboard. If you cannot change it, it is a Workers project, so use the second config.

### Step 3: Connect your GitHub repo

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Select your GitHub repo
4. Build command: `yarn run build` (or `npm run build`)
5. Deploy command: `npx wrangler deploy` (imposed by Cloudflare if it is a Workers project)
6. Build output directory: checked automatically via `wrangler.toml`

**Careful**: the "Build configuration" form in the Cloudflare dashboard can be temperamental. I personally got `An internal error prevented the form from submitting` errors while trying to change the deploy command. If that happens to you, do not force it, adapt your `wrangler.toml` instead.

### Step 4: Point your domain

At your DNS registrar (GoDaddy in my case):

**Option A** (recommended): use Cloudflare's nameservers:
- Replace the nameservers with Cloudflare's
- Cloudflare handles the rest

**Option B**: CNAME only:
- Add a CNAME: `www` → `subredomain.pages.dev`
- Cloudflare gives you the exact URL

You can keep your DNS at GoDaddy and just add a CNAME. Or you can move everything to Cloudflare (that is free too).

---

## The traps (because there are always some)

### 1. **Environment variables**

Make sure all your envvars are configured in the Cloudflare Pages dashboard. I nearly left my API key in plain sight... 😅

### 2. **Redirects and rewrites**

Cloudflare uses `_redirects` or `_headers` instead of `vercel.json`. It is easy to adapt, but you have to know about it.

Example `_redirects`:

```
/old-page /new-page 301
/api/* https://api.example.com/:splat 200
```

### 3. **The `wrangler.toml`: a real minefield**

This one cost me **hours**. And I am not talking about productive hours, I am talking about hours going round in circles between cryptic error messages and a buggy Cloudflare dashboard.

**First error**: my `wrangler.toml` had a `[site]` config with `bucket = "./dist"`, a leftover from the old Workers Sites method. Result? Wrangler was looking for a `workers-site/index.js` file that did not exist:

```
✘ [ERROR] The entry-point file at "workers-site/index.js" was not found.
```

**Second error**: I replaced it with `pages_build_output_dir = "./dist"`, which is the right config for Cloudflare **Pages**. Except that my deploy command in the dashboard was `npx wrangler deploy`, which is a command for **Workers**, not for Pages. Result:

```
▲ [WARNING] It seems that you have run `wrangler deploy` on a Pages project,
  `wrangler pages deploy` should be used instead.

✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

**Third error**: I tried to change the deploy command in the Cloudflare dashboard to `npx wrangler pages deploy dist/`. But the form kept sending me back:

```
An internal error prevented the form from submitting. Please try again.
Invalid request body
```

Even `npx wrangler pages deploy` with no argument: same thing. The form refused everything except `npx wrangler deploy`. Frustrating.

**The final solution**: since the dashboard was forcing `npx wrangler deploy` on me, I adapted the `wrangler.toml` so that **this command** would work. In other words, configure it as a Workers project that serves assets:

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
main = "dist/_worker.js/index.js"

[assets]
directory = "./dist"
```

- `main` points to the SSR worker that Nuxt automatically generates in `dist/_worker.js/index.js`
- `[assets]` tells Wrangler to serve static files from `./dist`

You think it is over? So did I.

**Fourth error**: the build passes, Wrangler reads the config, starts scanning the 515 files in the `dist/` folder... and panics because it finds the `_worker.js/` folder inside. It refuses to upload it as a public asset (fair enough: it is private server code):

```
✘ [ERROR] Uploading a Pages _worker.js directory as an asset.
  This could expose your private server-side code to the public Internet.
```

The solution? Create a `.assetsignore` file in `dist/` containing `_worker.js`. Except that `dist/` is regenerated on every build, so it has to be created automatically. I modified my build script in `package.json`:

```json
"build": "nuxt build && echo _worker.js > dist/.assetsignore"
```

An `echo`. Four deployment errors to end up with an `echo`.

I will let you meditate on that.

**Moral**: there is a real blur between "Pages" and "Workers" projects at Cloudflare. If your project was created on the Workers side, the dashboard forces you to use `wrangler deploy`. Adapt your `wrangler.toml` accordingly, do not forget the `.assetsignore`, and above all: **do not fight with the dashboard form**. It will win.

### 4. **404 errors during prerendering**

During the build, you will see `[404] Document not found!` in the logs. Do not panic.

It is normal if you use `documentDriven: true` in Nuxt Content. The crawler tries to find a markdown document for every route, including `/manifest.json` or `/robots.txt`, which are obviously not articles.

Add `failOnError: false` to your Nitro config so these errors do not block the build:

```js
nitro: {
  preset: 'cloudflare-pages',
  prerender: {
    crawlLinks: true,
    failOnError: false,
    routes: ['/sitemap.xml', '/feed.xml', '/robots.txt', '/'],
  },
},
```

### 5. **Builds that fail silently**

Sometimes Cloudflare builds your site with no error... but the result is broken. Read the build logs. Always.

### 6. **GitHub authentication**

Make sure Cloudflare has the right permissions on your repo. If your build gets rate-limited, that is often where the problem lies.

---

## What I gained (honestly)

| Metric | Vercel | Cloudflare |
|----------|--------|-----------|
| Cost | $0 (100 GB/month) | $0 (unlimited) |
| SSR | ✅ | ✅ |
| Speed | ⚡⚡⚡ | ⚡⚡⚡⚡ |
| Bandwidth | 100 GB/month | Unlimited |
| Requests/day | Not disclosed | 100,000 (492 used on day 1) |
| Build minutes/month | 6,000 | 3,000 (27 used in 2 days) |
| Edge functions | A few free ones | Unlimited |
| Ease of setup | ⭐⭐⭐ | ⭐ (4 errors and one `echo` later) |
| Support | Good | Excellent |

The real gain? **Zero financial stress** + **identical or better performance**.

And for an African developer who has to juggle currency conversions, bank fees and random payment failures every month: that is **priceless**.

---

## What about the other alternatives?

Just to be thorough:

- **GitHub Pages**: Free, but static only (no SSR). Good for a portfolio or a simple blog.
- **Netlify**: Solid, full SSR, free up to 100 GB bandwidth/month. A good alternative to Cloudflare.
- **Render**: Free but the service "sleeps" after inactivity. Not ideal for a blog.

But between those three? **Cloudflare Pages wins every time**.

---

## The moment I realised it was working

Let's recap my afternoon of 2 April 2026:

1. ❌ `workers-site/index.js` not found (obsolete Workers Sites config)
2. ❌ `Missing entry-point` (Pages vs Workers conflict)
3. ❌ Cloudflare dashboard refusing to save (`An internal error prevented the form from submitting`)
4. ❌ `_worker.js` uploaded as a public asset (server code exposed on the Internet)
5. ✅ One `echo _worker.js > dist/.assetsignore` and everything works

Five errors. One afternoon. And the final solution fits in one line of shell.

If someone from Cloudflare is reading this: **your build configuration form is broken**. And the distinction between Pages and Workers is about as clear as a roundabout in Abidjan at 6 pm.

But once it is configured? Honestly?

TTFB: ~120ms
Rendered pages: instant
Bill: 0 FCFA

From cPanel to CyberPanel, I understood something: **free and open-source tools are not compromises. It is just that the path to configuring them sometimes looks like an obstacle course.**

Cloudflare Pages is the restaurant where the food is incredible but you have to cross a maze to find the front door. Once inside, you regret nothing.

And for an African developer who has to juggle currency conversions, bank fees and random payment failures: **a free tool that actually works is priceless**, even if getting it running costs you a few hairs (no big deal in my case, given how few I have left).

---

*[Jean-Luc Houédanou](https://houedanou.com), still hunting for tools that don't break the piggy bank*
