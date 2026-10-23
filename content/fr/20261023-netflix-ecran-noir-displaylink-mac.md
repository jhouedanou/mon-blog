---
title: "Netflix reste noir sur un écran DisplayLink : 3 solutions sur Mac"
createdAt: "2026-10-23T21:00:00Z"
image: "/images/articles/pexels-luca-sammarco-6142159.webp"
description: "Sur Mac, Netflix affiche une image noire dès qu'un écran DisplayLink est branché. Trois solutions, et le port natif du dock Ugreen CM555."
searchIntent: "Comment regarder Netflix sur un Mac relié à un dock DisplayLink quand la vidéo reste noire mais que le son marche, et quel port du dock Ugreen CM555 est natif ?"
tags: ["tutoriel", "apple", "macos", "matériel", "tech"]
---

**Réponse courte.** Sur Mac, Netflix affiche une image noire, avec le son, dès qu'un écran est branché en DisplayLink. Trois solutions : désactiver l'accélération matérielle dans Chrome ou Edge, regarder sur un écran qui n'utilise pas DisplayLink, ou brancher l'écran sur une sortie vidéo native. Sur le dock Ugreen CM555, la sortie native, c'est le port **HDMI 2**.

## Mon matériel

Je garde mes machines longtemps et j'en tire le maximum. À la maison, je travaille sur un **MacBook M1**, le modèle de base. Je l'utilise presque comme un ordinateur de bureau.

Problème : un Mac M1 de base ne gère qu'**un seul écran externe**. Moi, j'en ai deux :

- un **Xiaomi Mi Monitor incurvé de 34 pouces** ;
- un **Lenovo ultrawide de 29 pouces**.

![Un écran incurvé ultrawide sur un bureau, avec un clavier, une souris et un casque](/images/articles/pexels-minhphuc-workspace-20648391.webp)

Pour brancher les deux, j'utilise un dock **Ugreen CM555** (référence 90325, vendu aussi sous le nom Revodok Pro 312). Il coûte un peu cher, mais il vaut son prix. Il utilise **DisplayLink** : un logiciel, DisplayLink Manager, ajoute des écrans au Mac et leur envoie l'image par le câble USB. C'est ce qui rend possible [ma disposition sur plusieurs écrans](/fr/20260810-double-moniteur-portable-blackview-dcm6).

![Un ordinateur portable relié à un adaptateur USB-C](/images/articles/pexels-pixabay-461461.webp)

Pour coder, tout va bien. Pour Netflix, c'est une autre histoire.

## Le problème : le son, mais pas l'image

Avec un écran DisplayLink branché, la vidéo démarre, le son passe, mais l'image reste noire. DisplayLink le reconnaît dans [sa documentation](https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while){target="_blank" rel="noopener"}. Netflix n'est pas seul : Disney+, Amazon Prime Video, HBO, YouTube TV, Udemy et iTunes sont aussi touchés.

Le plus gênant : selon DisplayLink, **dès qu'un écran DisplayLink est branché, la vidéo protégée peut être bloquée sur tous les écrans**, même sur celui du Mac.

Pourquoi ? Un écran DisplayLink n'est pas branché sur la carte graphique. Le logiciel copie l'image de l'écran, puis l'envoie par USB. C'est pour cela que macOS lui demande l'autorisation « Enregistrement de l'écran » ([Deux Ordis](https://deuxordis.xyz/blog/displaylink-mac-autorisations/){target="_blank" rel="noopener"}). Or les vidéos de Netflix sont protégées contre la copie. Elles ne passent pas par ce chemin : à la place, on voit un rectangle noir.

## Solution 1 : désactiver l'accélération matérielle (Chrome ou Edge)

C'est la solution que proposent DisplayLink et Anker. Elle marche dans **Google Chrome** et **Microsoft Edge**, mais pas dans Safari ni dans Firefox ([Anker](https://service.anker.com/article-description/What-Should-I-Do-If-Protected-Videos-Won-t-Play-On-My-Mac-When-Connected-to-a-DisplayLink-Monitor-A83B3?ref=Home_Page){target="_blank" rel="noopener"}).

1. Ouvrez Google Chrome ou Microsoft Edge.
2. Allez dans les **Paramètres** (menu à trois points, en haut à droite).
3. Recherchez ou ouvrez **Système**.
4. Désactivez l'option « **Utiliser l'accélération graphique (ou matérielle) lorsqu'elle est disponible** ».
5. Quittez complètement le navigateur (`Cmd + Q` sur Mac), puis relancez-le.

Ne sautez pas l'étape 5. Sur le [forum DisplayLink](https://www.displaylink.org/forum/showthread.php?t=69146){target="_blank" rel="noopener"}, un utilisateur explique en janvier 2026 que le réglage n'a marché qu'après avoir quitté et relancé Chrome.

À savoir : sans accélération, c'est le processeur qui fait tout le travail graphique du navigateur. Si Chrome devient lent, réactivez l'option après le film.

## Solution 2 : changer de navigateur ou regarder sur l'écran du Mac

DisplayLink propose aussi deux options simples ([support DisplayLink](https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while){target="_blank" rel="noopener"}) :

- **Essayez un autre navigateur.**
- **Regardez la vidéo sur l'écran intégré du Mac.** Si l'image reste noire, débranchez l'écran DisplayLink le temps du film.

Astuce : pas besoin de toucher aux câbles. Les écrans DisplayLink ne marchent que si DisplayLink Manager est ouvert. Quittez-le depuis son icône dans la barre des menus : les écrans DisplayLink s'éteignent. Relancez-le après le film.

## Solution 3 : brancher l'écran sur une sortie vidéo native

Pour regarder sur un grand écran sans toucher aux réglages, il faut une **sortie vidéo native** : un câble USB-C vers HDMI ou DisplayPort, ou un adaptateur qui n'utilise pas DisplayLink ([Deux Ordis](https://deuxordis.xyz/blog/displaylink-mac-autorisations/){target="_blank" rel="noopener"}, [Reddit](https://www.reddit.com/r/mac/comments/18yui77/how_to_stream_netflixhulu_while_using_a/?tl=fr){target="_blank" rel="noopener"}). Tous les adaptateurs USB-C n'utilisent pas DisplayLink, mais certains, si. Lisez la fiche produit avant d'acheter.

### Sur le dock Ugreen CM555, le port HDMI 2 est natif

Bonne nouvelle : sur le dock Ugreen CM555, tous les ports vidéo ne passent pas par DisplayLink. Le port **HDMI 2** (celui marqué 8K) est une sortie native : il marche même sans DisplayLink Manager. Le port HDMI 1 et le DisplayPort, eux, passent par DisplayLink ([forum DisplayLink](https://www.displaylink.org/forum/archive/index.php/t-69160.html){target="_blank" rel="noopener"}).

Branchez donc sur le port HDMI 2 l'écran sur lequel vous regardez vos films.

Deux limites :

- **Une seule sortie native.** Un Mac M1 de base n'en a qu'une. Un seul écran peut donc être sur le port HDMI 2. L'autre reste en DisplayLink.
- **L'autre écran peut encore gêner.** Selon DisplayLink, un écran DisplayLink branché peut bloquer la vidéo sur tous les écrans. Si l'image reste noire sur l'écran du port HDMI 2, quittez DisplayLink Manager le temps du film, ou appliquez la solution 1.

Pour savoir quel écran est sur le port natif : quittez DisplayLink Manager. L'écran qui reste allumé est branché sur le port natif.

## En résumé

| Solution | Ce qu'il faut faire | Limite |
|---|---|---|
| Désactiver l'accélération matérielle | Régler Chrome ou Edge, puis `Cmd + Q` | Pas dans Safari ni Firefox |
| Autre navigateur ou écran du Mac | Changer de navigateur, ou quitter DisplayLink Manager | L'écran DisplayLink s'éteint pendant le film |
| Sortie vidéo native | Brancher l'écran sur le port HDMI 2 du CM555, ou un câble USB-C vers HDMI | Une seule sortie native sur un Mac M1 de base |

---

*Photos : [Luca Sammarco](https://www.pexels.com/photo/6142159/), [minhphuc .workspace](https://www.pexels.com/photo/20648391/) et [Pixabay](https://www.pexels.com/photo/461461/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — deux écrans pour coder, un seul pour Netflix*
