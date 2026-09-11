---
title: "Check whether your site is responsive on the iPhone Duo"
createdAt: "2026-09-11T20:01:00Z"
image: "/images/articles/pexels-imadclicks-19022728.webp"
description: "Apple has released its first foldable iPhone, and a developer has published a free tool to see what your site looks like on it. I tried it on this blog, and the result taught me something I didn't know about my own site."
searchIntent: "How to test whether a website is responsive on the iPhone Duo, what the folded and unfolded screen sizes are, and why a preview tool can refuse to display a site that does in fact allow itself to be embedded."
tags: ["development", "responsive", "tools", "apple", "security"]
---

# Check whether your site is responsive on the iPhone Duo

Apple unveiled its first foldable iPhone this week, the iPhone Duo. I have no intention of buying one ( my iPad mini still works ), but like everyone who builds websites, the question came to me fairly quickly: what does my site look like on it?

A developer has just published a small tool to answer that question. I tried it on houedanou.com, and the result isn't the one I expected.

## The iPhone Duo

It's the first foldable iPhone, in the line of Samsung's Galaxy Folds. Folded, it has the format of a passport, with a 5.4-inch external screen (1398 × 2034 pixels). Unfolded, you get a small tablet in landscape, with a 7.6-inch internal screen (1878 × 2670 pixels) in a 6.48 × 4.64-inch body.

For those who build websites, that means two screen sizes to handle on a single device, and a visitor who can switch from one to the other mid-read, simply by unfolding their phone.

![A foldable smartphone held in hand, screen unfolded](/images/articles/pexels-imadclicks-19022728.webp)

## The tool: Iphone Duo Preview

It's called Iphone Duo Preview and it was developed by Caleb Kalejaiye, aka [Rapto](https://x.com/heyrapto) on X. The principle is simple: you paste your site's address, and it appears inside an iPhone Duo frame. Two modes are offered, *Single* for the external screen and *Extended* for the internal screen. You can then browse the site as you would on a real phone.

It's free, no sign-up, and everything happens in your browser.

You can try it here: [duo-responsive.vercel.app](https://duo-responsive.vercel.app/)

## Is houedanou.com responsive on the iPhone Duo?

I pasted this blog's address, and here's what I got:

```
This website doesn't allow embedded previews.
```

![The Iphone Duo Preview tool showing « This website doesn't allow embedded previews » instead of houedanou.com](/images/articles/iphone-duo-preview-refus-embed.webp)

In other words, the site refuses to be displayed inside a third-party page. In the moment, I wasn't unhappy about it. A site that won't let itself be embedded in an iframe is a site protecting itself against clickjacking, the technique of loading your site into an invisible page to make the visitor click buttons they can't see. It's the kind of protection you set up once and forget.

Except I didn't remember setting it up.

## Checking

For good measure, I looked at the headers returned by the server:

```bash
curl -sI https://houedanou.com/ | grep -iE 'x-frame-options|content-security-policy'
```

Nothing. No `X-Frame-Options`, no `Content-Security-Policy`. I then loaded houedanou.com in an iframe from another domain, and the site displayed without a problem. Finally, I gave example.com to Rapto's tool, which displayed it normally, then houedanou.com again, which was refused a second time.

Conclusion: the tool is wrong. My site is perfectly happy to be embedded, and it's the tool's preliminary check that fails somewhere, for a reason I didn't try to understand. The project is one day old, it will have time to mature.

But above all, this little investigation taught me something I didn't know: my site had no protection against clickjacking. And I was two seconds away from closing the tab believing the opposite, on the strength of an error message.

So I added the missing header, before publishing this post:

```
Content-Security-Policy: frame-ancestors 'self';
```

This directive tells the browser that only houedanou.com is allowed to display houedanou.com's pages in an iframe. It has no effect on the scripts, fonts or iframes the site loads itself, so the Disqus comments keep working.

A small amusing detail: on the next deployment, Rapto's tool will display exactly the same message for my site. Except this time, it'll be true 🙂

## So, responsive or not?

Since the tool wouldn't answer me, I ran the test by hand in Chrome, simulating both screens. Apple only publishes physical pixels, so I assumed a ratio of 3 as on recent iPhones, which gives roughly 466 × 678 CSS pixels for the external screen and 890 × 626 for the internal screen.

In both cases, the layout holds: a single column on the external screen, full width on the internal screen, and no horizontal overflow.

![A wireframe sketch next to a smartphone](/images/articles/pexels-picjumbo-com-196644.webp)

What I do note, though, is that the unfolded internal screen is wide but fairly short: 890 pixels wide for only 626 high. We're all used to testing our breakpoints by width. On this device, it's the height you'll need to keep an eye on. Between a fixed header, a cookie banner and a newsletter banner, there isn't much room left for content.

That's it for the iPhone Duo. If you test your site with Rapto's tool and it tells you your site refuses previews, don't take its word for it: go check your headers yourself. You might be in for a good surprise, or a bad one.

---

*Photo credits: [Imad Clicks](https://www.pexels.com/@imadclicks/) and [picjumbo.com](https://www.pexels.com/@picjumbo-com-55570/) on Pexels. Screenshot: [Iphone Duo Preview](https://duo-responsive.vercel.app/).*
