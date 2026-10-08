---
title: "Warning: the top Google result for \"Bing Webmaster Tools\" is a phishing site"
image: "/images/hazars.jpg"
createdAt: "2026-06-18"
updatedAt: "2026-10-08T12:00:00Z"
description: "A fake Bing Webmaster Tools page, sitting in a sponsored Google result, steals webmasters' Microsoft and Google credentials. How to spot it and what to do."
searchIntent: "How to recognise a fake Bing Webmaster Tools page before handing over your Google or Microsoft credentials."
tags: [security, seo, phishing, warning]
---

Usually, on this blog, I joke around. Not this time.

This morning, I searched for "bing webmaster tools" on Google. It is a query I run often for my clients' work. The first result, a sponsored link placed above all the organic results, does not belong to Microsoft.

It is a phishing page. And it is particularly well made.

## What the page reveals

The address is `camp.recettee.com`. Nothing to do with Microsoft or Bing. Yet the page faithfully copies the official Bing Webmaster Tools landing page: Microsoft Bing logo, "Want more users for your site?" tagline, the promise of free SEO/GEO tools, a "$500 ad credit" banner. The copying is careful work.

Then comes the central mechanism: a "Please sign in — Choose an account convenient to you" window, with two sign-in options:

- Microsoft
- Google

An important clarification: the real Bing Webmaster Tools also offers sign-in with a Google account, and has done since 2018 ([Search Engine Journal](https://www.searchenginejournal.com/bing-webmaster-tools-now-social-login-option/236569/)). Those two buttons therefore prove nothing on their own, and that is precisely what makes the copy believable. Here, they have only one purpose: widening the net. Whichever button you pick, you hand your credentials to the attacker.

I would gladly have put up a video, but I lost my old blog's search ranking after publishing a similar one. You will have to make do with a screenshot.

![Screenshot of the fake Bing Webmaster Tools page](/images/hazars.jpg)

## Why this attack is particularly dangerous

This is not opportunistic phishing aimed at the general public. The target is web professionals: webmasters, SEO consultants, agencies managing sites for clients.

Let's remember what a Google or Microsoft account controls in this line of work:

- Search Console and Bing Webmaster Tools, and therefore the indexing of every site you manage;
- Google Ads, and by extension an active payment method;
- Analytics and Tag Manager;
- often, access to the domain registrar, the hosting and the associated mailbox.

Compromising a single one of these accounts is enough to deindex a site, hijack its traffic, drain an ad budget or, at worst, take complete control of an organisation's online presence. For a professional administering several client sites, this is not an isolated incident: it is a systemic risk.

The most worrying part remains the distribution channel. The attacker paid Google Ads to get ahead of Microsoft's official site. That is the principle of *malvertising*: buy a keyword to occupy the top spot, betting that most people click the first link without checking the URL.

## The right reflexes

Three simple rules are enough to protect yourself:

- **Always check the URL.** The official address is `bing.com/webmasters`. If the domain is neither `microsoft.com` nor `bing.com`, close the tab. `camp.recettee.com` has never hosted a Microsoft service.
- **Do not trust the sign-in buttons.** Bing Webmaster Tools genuinely accepts Microsoft, Google and Facebook accounts, so a phishing page can display exactly the same options. Only the domain in the address bar can be trusted.
- **Never sign in through a sponsored result.** For any service that asks for a password (Search Console, Bing, your bank, your host), type the address by hand or use a bookmark you saved yourself. Ignore the ads. The same reflex applies to emails: I dissected a [fake $358.25 renewal email](/en/20260831-faux-mail-renouvellement-zoho-358-dollars) that plays on the same levers.

## If you have been compromised

If the credentials have already been entered, act without delay:

- Change your Microsoft and/or Google password immediately;
- Turn on two-factor authentication (MFA) if it is not already on. It is the measure that protects you even after a password leak;
- Revoke active sessions and review the apps connected to the account;
- Check Search Console, Bing Webmaster Tools and Google Ads for any access, site or spend you do not recognise;
- Report the ad to Google and report the site as a phishing attempt.

## In summary

We spend our days hardening servers, patching vulnerabilities and securing configurations. And the weak link is still one click on a sponsored result, one morning, before coffee.

Check your tabs, warn your colleagues, and get into the habit of checking the URL before you click.

*Updated October 8, 2026: correcting a mistake on my part. The real Bing Webmaster Tools does accept sign-in with a Google account ([Search Engine Journal](https://www.searchenginejournal.com/bing-webmaster-tools-now-social-login-option/236569/)), so that button is not a sign of phishing in itself. The domain remains the only reliable clue.*

---
*[Jean-Luc Houédanou](https://houedanou.com)*
