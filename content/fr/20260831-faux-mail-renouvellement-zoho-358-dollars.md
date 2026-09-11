---
title: "358,25 $ débités : anatomie du faux mail de renouvellement"
createdAt: "2026-08-31"
image: "/images/articles/zoho.webp"
description: "Ce matin, j'ai reçu une confirmation de paiement de 358,25 dollars pour un renouvellement Zoho Backstage, un service que je n'ai jamais utilisé. Pas de lien, pas de pièce jointe, juste un numéro de téléphone à appeler. Voici comment fonctionne cette arnaque et ce qu'il faut faire si vous recevez le même mail."
searchIntent: "Comment reconnaître un faux mail de renouvellement Zoho avec un numéro de téléphone, et que faire si on a déjà appelé."
tags: [sécurité, phishing, alerte]
---

# 358,25 $ débités : anatomie du faux mail de renouvellement

Ce matin, en ouvrant ma boîte mail, je tombe sur une confirmation de paiement : 358,25 dollars, renouvellement traité avec succès, transaction finalisée, merci d'avoir choisi Zoho Backstage.

Le problème, c'est que je n'ai jamais rien acheté chez Zoho Backstage. Je n'ai pas de compte Zoho, je n'ai jamais organisé d'événement, et je n'ai jamais payé 358 dollars pour quoi que ce soit. Pourtant, le mail est là, avec un ton officiel et un logo qui a l'air authentique.

Le premier réflexe, celui que nous avons tous, est de chercher le bouton pour annuler. C'est exactement ce que les auteurs de ce mail attendent.

Le second réflexe, heureusement, a été de me souvenir que je n'ai pas l'habitude de laisser traîner des montants pareils sur mes cartes prépayées. Ça aide à garder la tête froide.

## Ce qui rend ce mail différent

On répète les mêmes conseils depuis dix ans : ne cliquez pas sur les liens, ne téléchargez pas les pièces jointes, vérifiez l'adresse avant de vous connecter. Sauf que ce mail-là ne demande rien de tout ça. Il n'y a rien à cliquer, rien à télécharger, aucun formulaire de connexion. Le seul appel à l'action tient dans une ligne discrète, glissée au milieu du texte :

> Refund help is available through +1 (812) 552-8528 when a transaction appears without your consent

Un simple numéro de téléphone. C'est justement pour cela que le message passe : les filtres anti-phishing analysent les liens et les domaines, et un numéro noyé dans un bloc de texte ne déclenche aucune alarme, ni chez Gmail, ni chez vous.

Cette technique porte un nom, le refund scam, ou vishing (voice phishing). L'attaque ne se joue pas dans le mail, qui n'est qu'un prétexte pour vous faire décrocher votre téléphone.

## Ce qui se passe si vous appelez

Le scénario est rodé et il ne varie presque jamais.

1. Quelqu'un de très aimable décroche, confirme le débit, s'excuse et propose de vous rembourser immédiatement.
2. Pour « traiter le remboursement », il faut installer un petit outil d'assistance à distance, AnyDesk, TeamViewer ou UltraViewer. C'est standard, monsieur, c'est notre procédure.
3. Il vous fait ouvrir votre compte bancaire à l'écran, puis « se trompe » en tapant le montant : au lieu de 358 $, il vous aurait viré 3 580 $. Il panique et vous supplie de renvoyer la différence.
4. En réalité, rien n'a été viré. L'écran a été manipulé, ou l'argent provient d'un compte volé. Vous, en revanche, envoyez un vrai virement depuis un vrai compte, vers un compte qui aura disparu dans l'heure.

Et pendant tout ce temps, cette personne a la main sur votre machine.

## Les six signaux qui auraient dû m'alerter

1. Le numéro de téléphone américain. Aucun éditeur de logiciel sérieux ne met un numéro à rappeler dans un mail de facturation. Chez Zoho, Adobe ou Microsoft, le support passe par votre espace client, jamais par un numéro reçu dans un message non sollicité. Ce signal suffit à lui seul.

2. Le montant précis. 358,25 $, ni 350 ni 400. Un montant avec des centimes fait vrai, et il fait mal. Il est calibré pour inquiéter tout en restant assez plausible pour qu'on ne se dise pas tout de suite « c'est impossible ».

3. L'incohérence du contenu. Le mail mélange une confirmation de paiement et une invitation à devenir Space Admin d'une marque. Ce sont deux messages complètement différents, que personne n'enverrait ensemble. On reconnaît des blocs copiés-collés depuis de vrais modèles.

4. Le service que vous n'avez jamais utilisé. Zoho Backstage est un outil de gestion d'événements. Si vous n'avez jamais organisé de conférence, vous n'avez rien à y renouveler. Les expéditeurs arrosent des millions d'adresses en sachant qu'une petite partie des destinataires aura un doute, et ce doute leur suffit.

5. L'expéditeur réel. Le nom affiché annonce « Zoho Backstage », mais l'adresse derrière raconte autre chose. Dans Gmail, cliquez sur la flèche à côté du nom, ou ouvrez Afficher l'original pour lire les en-têtes complets. Regardez le `Return-Path` et le résultat des vérifications SPF et DKIM : si elles échouent, ou si le domaine n'est pas `zohocorp.com`, l'affaire est réglée.

6. L'absence de tout élément de compte. Un vrai mail de facturation contient un numéro de facture, les quatre derniers chiffres de la carte, le nom du plan et la date d'échéance. Ici, rien de tout cela, tout simplement parce qu'ils ne savent rien de vous.

## Pourquoi Zoho, justement ?

Les mêmes campagnes tournent depuis des années avec Norton, McAfee, Geek Squad ou PayPal. Leur point commun, ce sont des services que vous avez peut-être souscrits sans vous en souvenir : un antivirus installé il y a trois ans, un compte créé pour un test, un abonnement d'équipe payé par un collègue.

Ces campagnes ne cherchent pas à vous convaincre que vous devez payer, mais que vous avez peut-être déjà payé. Ce n'est plus la cupidité qu'elles exploitent, c'est l'envie parfaitement légitime de récupérer son argent.

Zoho entre dans la rotation parce que la suite est très utilisée par les PME, y compris chez nous. Beaucoup d'entre nous ont un compte Zoho quelque part. Backstage, nettement moins, mais qui prend le temps de vérifier la différence en voyant 358 dollars partir ?

## Ce qu'il faut faire

- Ne pas appeler, jamais. C'est la seule règle qui compte vraiment sur ce coup-là.
- Vérifier son relevé bancaire directement, depuis l'application ou le site de sa banque. Aucun débit ? Fin de l'histoire.
- Si vous avez un vrai compte Zoho, tapez vous-même `zoho.com` dans la barre d'adresse et consultez vos factures depuis votre espace. Ne passez jamais par le mail.
- Signaler le message à `abuse@zohocorp.com`, puis le supprimer.
- Prévenir son équipe. C'est sans doute le point le plus important : ces mails arrivent aussi chez votre comptable, chez votre assistant, chez le collègue qui détient la carte bancaire de la boîte, et eux n'ont pas forcément le réflexe.

## Si quelqu'un a déjà appelé

Ça arrive, et ce n'est pas dramatique à condition de réagir vite.

- Désinstallez immédiatement tout logiciel d'accès à distance installé pendant l'appel.
- Déconnectez la machine du réseau, puis faites-la analyser.
- Appelez votre banque pour signaler la tentative et faire surveiller le compte.
- Changez vos mots de passe depuis un autre appareil, jamais depuis celui qui a été partagé.
- Si un virement est parti, signalez-le à la banque dans l'heure. C'est la seule fenêtre où il reste une chance de le récupérer.

## Pour finir

On blinde des serveurs, on impose le MFA partout, on fait des audits. Et l'attaque qui a le plus de chances de passer reste un mail moche, sans lien, avec un numéro de téléphone dedans. Il n'y a aucune technique là-dedans, juste un montant bien choisi et le pari que la panique fera le reste.

La règle à retenir, pour vous comme pour vos collègues : un mail ne prouve jamais un débit, seule votre banque le prouve. Le mail dit ce que l'expéditeur veut vous faire croire, le relevé dit ce qui s'est réellement passé.

— [Jean Luc Houédanou](https://houedanou.com) · le « service client » de Zoho Backstage ne m'a toujours pas rappelé 🙂
