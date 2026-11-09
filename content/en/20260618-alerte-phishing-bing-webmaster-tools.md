---
title: "Bing Webmaster Tools phishing tops Google"
image: "/images/hazars.jpg"
createdAt: "2026-06-18"
updatedAt: "2026-10-08T12:00:00Z"
description: "Bing Webmaster Tools phishing in a sponsored Google result: the fake page steals webmasters' Microsoft and Google credentials. How to spot it, what to do."
searchIntent: "How to recognise a fake Bing Webmaster Tools page before handing over your Google or Microsoft credentials."
tags: [security, seo, phishing, warning]
---

Usually, on this blog, I joke around. Not this time: a Bing Webmaster Tools phishing page sits at the top of Google.

This morning, I searched for "bing webmaster tools" on Google. It's a query I run often for my clients' work. The first result, a sponsored link placed above all the organic results, doesn't belong to Microsoft.

It's a phishing page, and a well-made one.

## What the fake Bing Webmaster Tools page reveals

The address is `camp.recettee.com`. Nothing to do with Microsoft or Bing. Yet the page faithfully copies the official Bing Webmaster Tools landing page: Microsoft Bing logo, "Want more users for your site?" tagline, the promise of free SEO/GEO tools, a "$500 ad credit" banner. It's a careful copy.

Then comes the trap: a "Please sign in — Choose an account convenient to you" window, with two sign-in options:

- Microsoft
- Google

The real Bing Webmaster Tools also offers sign-in with a Google account, and has done since 2018 ([Search Engine Journal](https://www.searchenginejournal.com/bing-webmaster-tools-now-social-login-option/236569/)). So those two buttons prove nothing on their own, and that's exactly what makes the copy believable. Here, they're just there to widen the net. Whichever button you pick, you hand your credentials to the attacker.

I'd gladly have put up a video, but I lost my old blog's search ranking after publishing a similar one. You'll have to make do with a screenshot.

![Screenshot of the fake Bing Webmaster Tools page](/images/hazars.jpg)

## Why this attack is particularly dangerous

This is not opportunistic phishing aimed at the general public. The target is web professionals: webmasters, SEO consultants, agencies managing sites for clients.

In this line of work, a Google or Microsoft account controls:

- Search Console and Bing Webmaster Tools, and therefore the indexing of every site you manage;
- Google Ads, and by extension an active payment method;
- Analytics and Tag Manager;
- often, access to the domain registrar, the hosting and the associated mailbox.

Compromising a single one of these accounts is enough to deindex a site, hijack its traffic, drain an ad budget or, at worst, take complete control of an organisation's online presence. For a professional managing several client sites, this isn't an isolated incident: every client is exposed at once.

The most worrying part is the distribution channel. The attacker paid Google Ads to get ahead of Microsoft's official site. That's how *malvertising* works: buy a keyword to occupy the top spot, betting that most people click the first link without checking the URL.

## How to spot Bing Webmaster Tools phishing

Three simple rules are enough:

- **Always check the URL.** The official address is `bing.com/webmasters`. If the domain is neither `microsoft.com` nor `bing.com`, close the tab. `camp.recettee.com` has never hosted a Microsoft service.
- **Don't trust the sign-in buttons.** Bing Webmaster Tools genuinely accepts Microsoft, Google and Facebook accounts, so a phishing page can display exactly the same options. Only the domain in the address bar can be trusted.
- **Never sign in through a sponsored result.** For any service that asks for a password (Search Console, Bing, your bank, your host), type the address by hand or use a bookmark you saved yourself. Ignore the ads. Same reflex for emails: I took apart a [fake $358.25 Zoho renewal email](/en/20260831-faux-mail-renouvellement-zoho-358-dollars) that pulls the same strings.

## Already entered your credentials? What to do

If you've already entered your credentials, act fast:

- Change your Microsoft and/or Google password immediately;
- Turn on two-factor authentication (MFA) if it isn't already on. It's what protects you even after a password leak;
- Revoke active sessions and review the apps connected to the account;
- Check Search Console, Bing Webmaster Tools and Google Ads for any access, site or spend you don't recognise;
- If a WordPress site you manage has changed behind your back, [check the logs to find out how the attacker got in](/en/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre);
- Report the ad to Google and report the site as a phishing attempt.

## In summary

We spend our days hardening servers, [patching PHP vulnerabilities](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge) and securing configurations. And the weak link is still one click on a sponsored result, one morning, before coffee.

Check your tabs, warn your colleagues, and get into the habit of checking the URL before you click.

*Updated October 8, 2026: correcting a mistake on my part. The real Bing Webmaster Tools does accept sign-in with a Google account ([Search Engine Journal](https://www.searchenginejournal.com/bing-webmaster-tools-now-social-login-option/236569/)), so that button is not a sign of phishing in itself. The domain remains the only reliable clue.*

---
*[Jean-Luc Houédanou](https://houedanou.com)*
