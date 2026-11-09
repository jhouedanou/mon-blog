---
title: "Vercel to Cloudflare Pages: no more bills"
image: "/images/articles/cloudflarevercel.webp"
createdAt: "2026-04-02"
description: "How I migrated a Nuxt site from Vercel to Cloudflare Pages: unlimited bandwidth, a zero bill, and the four deployment errors I had to get through."
updatedAt: "2026-11-08T12:00:00Z"
searchIntent: "How to migrate a Nuxt project from Vercel to Cloudflare Pages to cut hosting costs."
tags: ["tutorial", "dev", "africa"]
---

You launch your little side project on Vercel, everything's fine... until your first invoice shows up.

I've been there too, so here's how I migrated this Nuxt blog from Vercel to Cloudflare Pages, all the way down to a hosting bill of 0 FCFA.

> **Warning**: this article contains unreasonable quantities of error messages, frustration, and at least one web form that refuses to work. Not for the faint of heart.

Except that after [my forced move from cPanel to CyberPanel](/en/20260327-cpanel-cyberpanel-migration) and the impossible licence payments (thanks, Uncle Donald 🫡… well, no, he had nothing to do with it: it was the standoff between GIM-UEMOA and Visa/Mastercard), I told myself: **if I have to choose my tools, they might as well be free, and they might as well be good.**

That's how I found out you don't really need to pay for hosting that rocks.

---

## The problem with Vercel (and why I have to move)

Vercel is very comfortable.

- Deployment from GitHub in three clicks
- Free HTTPS
- Global CDN
- Free Edge Functions

But here's the thing: the free tier is **100 GB of bandwidth per month**. And once you go over (or get close), prices climb fast. On the free Hobby plan, going over a limit usually means waiting 30 days before you can use that resource again; to carry on straight away, you have to move to Pro, at $20 per member per month ([Vercel Hobby plan](https://vercel.com/docs/plans/hobby){target="_blank" rel="noopener"}).

Given that I have to host several personal projects (including this blog, [which left WordPress for Nuxt in 2024](/en/20241005-on-fait-un-peu-le-menage), and other digital experiments), the bill adds up.

Vercel isn't bad. Let's just be honest: it's built for funded startups, not for African developers who want to keep their independence.

---

## Why Cloudflare Pages?

Right, first I need to clarify something: **Cloudflare isn't perfect**. But for what I do, it's the best free value for money I've found.

Here's why:

### 1. **Unlimited bandwidth**

With Vercel: 100 GB/month (free), then it gets expensive.
With Cloudflare Pages: **unlimited**.

If your blog suddenly takes off (optimistic scenario), you won't pay a cent more.

### 2. **Full SSR** (free Edge Functions)

Unlike GitHub Pages (which only does static), Cloudflare Pages supports **edge functions** for free.

In practice, I can serve dynamic content, API calls and server-side rendering at no extra cost.

My Nuxt 3 SSR setup runs on it without a hitch.

### 3. **A very fast CDN**

Cloudflare runs one of the largest networks of data centres in the world. Your site is served from the Cloudflare server closest to the user.

**Less latency for our local users**.

### 4. **100,000 requests per day (free)**

My blog has just been migrated. First day on Cloudflare Pages: **492 requests out of the 100,000 allowed per day**. Plenty of headroom.

Vercel limits bandwidth, Cloudflare limits requests, but at 100,000/day, your site really has to go viral to hit that limit.

### 5. **Ridiculously simple configuration**

- 3,000 build minutes/month (free, and with only 27 minutes used after several deployments, we have plenty of room). That's the [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/){target="_blank" rel="noopener"} quota; a Pages-type project is counted in builds, 500 a month ([Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/){target="_blank" rel="noopener"})
- Direct connection to GitHub
- Auto-deploy on every push
- Auto-renewed SSL certificates
- 200,000 observability events/day (logs, traces)

It's almost too simple. In theory, anyway: read the "Traps" section below before celebrating. 😬

### 6. **The price of a custom domain**

Cloudflare charges nothing for pointing a custom domain. You keep your registrar (Namecheap, GoDaddy, whatever), and Cloudflare provides the DNS.

It's free.

---

## How I migrated from Vercel to Cloudflare Pages (and how you can too)

### Step 1: Change the Nitro preset

In `nuxt.config.js` (or `nuxt.config.ts`):

```js
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  }
})
```

That's all you need to change in your Nuxt config.

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

How do you know? Try changing the deploy command in the dashboard. If you can't change it, it's a Workers project, so use the second config.

### Step 3: Connect your GitHub repo

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Select your GitHub repo
4. Build command: `yarn run build` (or `npm run build`)
5. Deploy command: `npx wrangler deploy` (imposed by Cloudflare if it's a Workers project)
6. Build output directory: checked automatically via `wrangler.toml`

**Careful**: the "Build configuration" form in the Cloudflare dashboard can be temperamental. I personally got `An internal error prevented the form from submitting` errors while trying to change the deploy command. If that happens to you, don't force it: adapt your `wrangler.toml` instead.

### Step 4: Point your domain

At your DNS registrar (GoDaddy in my case):

**Option A** (recommended): use Cloudflare's nameservers:
- Replace the nameservers with Cloudflare's
- Cloudflare handles the rest

**Option B**: CNAME only:
- Add a CNAME: `www` → `your-project.pages.dev`
- Cloudflare gives you the exact URL

You can keep your DNS at GoDaddy and just add a CNAME. Or you can move everything to Cloudflare (that's free too).

Careful, though: option B only works for a subdomain such as `www`, on a Pages project. An apex domain (`example.com`) requires Cloudflare's nameservers ([Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/){target="_blank" rel="noopener"}), and a Workers project's custom domain requires an active Cloudflare zone ([Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/){target="_blank" rel="noopener"}). In both cases, go with option A.

---

## The traps (because there are always some)

### 1. **Environment variables**

Make sure all your envvars are configured in the Cloudflare Pages dashboard. I nearly left my API key in plain sight... 😅

### 2. **Redirects and rewrites**

Cloudflare uses `_redirects` or `_headers` instead of `vercel.json`. It's easy to adapt, but you need to know about it.

Example `_redirects`:

```
/old-page /new-page 301
/api/* https://api.example.com/:splat 200
```

And while you're at it, 301-redirect your old addresses. On this blog, I only did it months later, and I explain what it cost me in [my post on the SEO I lost after the migration](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere).

### 3. **The `wrangler.toml`: a real minefield**

This one cost me **hours** going round in circles between cryptic error messages and a buggy Cloudflare dashboard.

**First error**: my `wrangler.toml` had a `[site]` config with `bucket = "./dist"`, a leftover from the old Workers Sites method. Result: Wrangler was looking for a `workers-site/index.js` file that didn't exist:

```
✘ [ERROR] The entry-point file at "workers-site/index.js" was not found.
```

**Second error**: I replaced it with `pages_build_output_dir = "./dist"`, which is the right config for Cloudflare **Pages**. Except that my deploy command in the dashboard was `npx wrangler deploy`, which is a command for **Workers**, not for Pages. Result:

```
▲ [WARNING] It seems that you have run `wrangler deploy` on a Pages project,
  `wrangler pages deploy` should be used instead.

✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

**Third error**: I tried to change the deploy command in the Cloudflare dashboard to `npx wrangler pages deploy dist/`. But the form kept throwing back:

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

Think it's over? So did I.

**Fourth error**: the build passes, Wrangler reads the config, starts scanning the 515 files in the `dist/` folder... and panics because it finds the `_worker.js/` folder inside. It refuses to upload it as a public asset (fair enough: it's private server code):

```
✘ [ERROR] Uploading a Pages _worker.js directory as an asset.
  This could expose your private server-side code to the public Internet.
```

The fix: create a `.assetsignore` file in `dist/` containing `_worker.js`. Except that `dist/` is regenerated on every build, so it has to be created automatically. I modified my build script in `package.json`:

```json
"build": "nuxt build && echo _worker.js > dist/.assetsignore"
```

An `echo`. Four deployment errors to end up with an `echo`.

I'll let you meditate on that.

**Moral**: the line between "Pages" and "Workers" projects at Cloudflare is really blurry. If your project was created on the Workers side, the dashboard forces you to use `wrangler deploy`. Adapt your `wrangler.toml` accordingly, don't forget the `.assetsignore`, and above all: **don't fight the dashboard form**. It will win.

### 4. **404 errors during prerendering**

During the build, you'll see `[404] Document not found!` in the logs. Don't panic.

It's normal if you use `documentDriven: true` in Nuxt Content. The crawler tries to find a markdown document for every route, including `/manifest.json` or `/robots.txt`, which obviously aren't articles.

Add `failOnError: false` to your Nitro config so these errors don't block the build:

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

Make sure Cloudflare has the right permissions on your repo. If your build gets rate-limited, that's often where the problem lies.

---

## Vercel or Cloudflare Pages: what I gained (honestly)

| Metric | Vercel | Cloudflare |
|----------|--------|-----------|
| Cost | $0 (100 GB/month) | $0 (unlimited) |
| SSR | ✅ | ✅ |
| Speed | ⚡⚡⚡ | ⚡⚡⚡⚡ |
| Bandwidth | 100 GB/month | Unlimited |
| Included requests | 1 million per month | 100,000 per day (492 used on day 1) |
| Build minutes/month | 6,000 | 3,000 (27 used in 2 days) |
| Edge functions | A few free ones | Included (100,000 requests/day) |
| Ease of setup | ⭐⭐⭐ | ⭐ (4 errors and one `echo` later) |
| Support | Good | Excellent |

What I gained: **zero financial stress**, with **the same or better performance**.

---

## What about the other free Vercel alternatives?

Just to be thorough:

- **GitHub Pages**: Free, but static only (no SSR). Good for a portfolio or a simple blog.
- **Netlify**: Solid, full SSR, free plan with 300 credits (bandwidth is counted in credits). A good alternative to Cloudflare.
- **Render**: Free but the service "sleeps" after inactivity. Not ideal for a blog.

But up against those three, **Cloudflare Pages wins every time**.

---

## The moment I realised it was working

Let's recap my afternoon of 2 April 2026:

1. ❌ `workers-site/index.js` not found (obsolete Workers Sites config)
2. ❌ `Missing entry-point` (Pages vs Workers conflict)
3. ❌ Cloudflare dashboard refusing to save (`An internal error prevented the form from submitting`)
4. ❌ `_worker.js` uploaded as a public asset (server code exposed on the Internet)
5. ✅ One `echo _worker.js > dist/.assetsignore` and everything works

Four errors in one afternoon, and the final solution fits in one line of shell.

If someone from Cloudflare is reading this: **your build configuration form is broken**. And the distinction between Pages and Workers is about as clear as a roundabout in Abidjan at 6 pm.

But once it's set up? Honestly?

TTFB: ~120 ms\
Rendered pages: instant\
Bill: 0 FCFA

Since moving from cPanel to CyberPanel, I've learned one thing: **free and open-source tools aren't compromises. They're just sometimes a pain to configure.**

Cloudflare Pages is the restaurant where the food is excellent but you have to get through a maze to find the front door. Once you're in, you won't regret it.

And for an African developer who has to juggle currency conversions, bank fees and random payment failures: **a free tool that actually works is priceless**, even if getting it running costs you a few hairs (no big deal in my case, given how few I have left).

*Updated October 8, 2026: the step 1 example has been corrected; the Nitro config key is `preset` (singular, a plain string), as in the example in trap no. 4 ([Nitro documentation](https://nitro.build/deploy/providers/cloudflare)). The "Edge functions" row of the table now shows the free plan limit, 100,000 requests per day ([Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)). Netlify has moved to credit-based pricing: the free plan gives 300 credits, and bandwidth uses 20 of them per GB ([Netlify pricing](https://www.netlify.com/pricing/)). Finally, the Nitro documentation now recommends Cloudflare Workers over Pages for new deployments, and this blog no longer uses a Worker at all: it is served as static files ([here is why](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec)).*

*Correction, November 8, 2026: "thanks, Uncle Donald" was unfair. The card payment blockage came from GIM-UEMOA's Decision No. 31, which gave Visa and Mastercard an ultimatum to comply by March 31, 2026 ([Financial Afrik](https://www.financialafrik.com/2026/01/29/uemoa-les-cartes-visa-et-mastercard-ont-90-jours-pour-se-conformer/){target="_blank" rel="noopener"}). In the table, Vercel does publish a request quota for its free plan: 1 million per month ([Hobby plan](https://vercel.com/docs/plans/hobby){target="_blank" rel="noopener"}), not "not disclosed". Added the same day: what happens when you go over Vercel's free plan, the difference between the Workers and Pages build quotas, and the limits of the CNAME option.*

---
*[Jean-Luc Houédanou](https://houedanou.com), still hunting for tools that don't break the piggy bank*
