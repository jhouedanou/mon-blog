---
title: "Alerte : le premier résultat Google pour « Bing Webmaster Tools » est un site de phishing"
image: "/images/hazars.jpg"
createdAt: "2026-06-18"
description: "Je viens de tomber sur une arnaque qui cible directement les webmasters et les SEO : une fausse page Bing Webmaster Tools, en première position sponsorisée sur Google, qui aspire vos identifiants Microsoft ET Google. Voici comment la repérer."
searchIntent: "Comment reconnaître une fausse page Bing Webmaster Tools avant de communiquer ses identifiants Google ou Microsoft."
tags: [sécurité, seo, phishing, alerte]
---
# Alerte : le premier résultat Google pour « Bing Webmaster Tools » est un site de phishing

D'habitude, sur ce blog, je plaisante. Là, non.

Ce matin, j'ai cherché « bing webmaster tools » sur Google. C'est une requête que je fais souvent pour le travail de mes clients. Le premier résultat, un lien sponsorisé placé au-dessus de tous les résultats organiques, n'appartient pas à Microsoft.

C'est une page de phishing. Et elle est particulièrement bien faite.

## Ce que révèle la page

L'adresse est `camp.recettee.com`. Aucun rapport avec Microsoft ni avec Bing. Pourtant, la page copie fidèlement la landing page officielle de Bing Webmaster Tools : logo Microsoft Bing, accroche « Want more users for your site? », promesse d'outils SEO/GEO gratuits, bandeau « 500 $ de crédit pub ». Le travail de copie est soigné.

Vient ensuite le mécanisme central : une fenêtre « Please sign in — Choose an account convenient to you », avec deux options de connexion :

- Microsoft
- Google

C'est ici que l'anomalie saute aux yeux. Pourquoi un outil Bing proposerait-il une connexion via un compte Google ? Il ne le ferait jamais. Microsoft n'oriente pas un utilisateur vers son concurrent direct pour l'authentifier. Ce second bouton n'a qu'un but : élargir la collecte. Quel que soit le bouton choisi, l'internaute transmet ses identifiants à l'attaquant.

Je vous aurais volontiers mis une vidéo, mais j'ai perdu le référencement de mon ancien blog après en avoir publié une similaire. Vous devrez vous contenter d'une capture d'écran.

![Capture d'écran de la fausse page Bing Webmaster Tools](/images/hazars.jpg)

## Pourquoi cette attaque est particulièrement dangereuse

Il ne s'agit pas d'un phishing opportuniste visant le grand public. La cible, ce sont les professionnels du web : webmasters, consultants SEO, agences qui gèrent des sites pour des clients.

Rappelons ce que contrôle un compte Google ou Microsoft dans ce métier :

- Search Console et Bing Webmaster Tools, donc l'indexation de tous les sites gérés ;
- Google Ads, et par extension un moyen de paiement actif ;
- Analytics et Tag Manager ;
- souvent, l'accès au registrar du domaine, à l'hébergement et à la messagerie associée.

La compromission d'un seul de ces comptes suffit à désindexer un site, détourner son trafic, épuiser un budget publicitaire ou, au pire, prendre le contrôle complet de la présence en ligne d'une organisation. Pour un professionnel qui administre plusieurs sites clients, ce n'est pas un incident isolé : c'est un risque systémique.

Le plus préoccupant reste le canal de diffusion. L'attaquant a payé Google Ads pour passer devant le site officiel de Microsoft. C'est le principe du *malvertising* : acheter un mot-clé pour occuper la première position, en pariant que la plupart des internautes cliquent sur le premier lien sans vérifier l'URL.

## Les bons réflexes

Trois règles simples suffisent à se prémunir :

- **Vérifier systématiquement l'URL.** L'adresse officielle est `bing.com/webmasters`. Si le domaine n'est ni `microsoft.com` ni `bing.com`, fermez l'onglet. `camp.recettee.com` n'a jamais hébergé un service Microsoft.
- **Se méfier de toute incohérence d'authentification.** Aucun service Microsoft ne propose de connexion via un compte Google. C'est le signal d'alerte le plus évident.
- **Ne jamais s'authentifier via un résultat sponsorisé.** Pour tout service qui demande un mot de passe (Search Console, Bing, banque, hébergeur), saisissez l'adresse à la main ou passez par un favori que vous avez enregistré vous-même. Ignorez les annonces.

## En cas de compromission

Si les identifiants ont déjà été saisis, agissez sans attendre :

- Changez immédiatement le mot de passe Microsoft et/ou Google ;
- Activez l'authentification à deux facteurs (MFA) si ce n'est pas déjà fait. C'est la mesure qui protège même après une fuite de mot de passe ;
- Révoquez les sessions actives et contrôlez les applications connectées au compte ;
- Vérifiez dans Search Console, Bing Webmaster Tools et Google Ads qu'il n'y a aucun accès, site ou dépense non reconnus ;
- Signalez l'annonce à Google et reportez le site comme tentative d'hameçonnage.

## En résumé

Nous passons nos journées à durcir des serveurs, corriger des vulnérabilités et sécuriser des configurations. Et le maillon faible reste un clic sur un résultat sponsorisé, un matin, avant le café.

Vérifiez vos onglets, alertez vos collègues, et prenez l'habitude de contrôler l'URL avant de cliquer.

— Jean Houédanou · [houedanou.com](https://houedanou.com)
