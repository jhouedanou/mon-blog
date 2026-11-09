---
title: "Tester un site responsive sur l'iPhone Duo"
createdAt: "2026-09-11T20:01:00Z"
image: "/images/articles/pexels-imadclicks-19022728.webp"
description: "Tester un site responsive sur l'iPhone Duo : tailles d'écran plié et déplié, l'outil Iphone Duo Preview, et l'erreur qui m'a révélé une faille sur mon blog."
updatedAt: "2026-11-08"
searchIntent: "Comment tester si un site web est responsive sur l'iPhone Duo, quelles sont les tailles d'écran plié et déplié, et pourquoi un outil de prévisualisation peut refuser d'afficher un site qui accepte pourtant d'être embarqué."
tags: ["développement", "responsive", "outils", "apple", "sécurité"]
---

Apple a présenté cette semaine son premier iPhone pliable, l'iPhone Duo. Je n'ai pas l'intention d'en acheter un ([mon iPad mini](/fr/20250615-ipados26) fonctionne toujours), mais comme tous ceux qui font des sites web, la question m'est venue assez vite : à quoi ressemble mon site là-dessus ?

Un développeur a justement publié un petit outil pour tester si un site est responsive sur l'iPhone Duo. Je l'ai essayé sur houedanou.com, et le résultat n'est pas celui que j'attendais.

## Tailles d'écran de l'iPhone Duo, plié et déplié

C'est le premier iPhone pliable, dans la lignée des Galaxy Fold de Samsung (qui [s'est d'ailleurs moqué de l'iPhone Duo](/fr/20260911-samsung-tacle-iphone-duo-visibilite) pendant toute la keynote). Plié, il a le format d'un passeport, avec un écran externe de 5,4 pouces (1398 × 2034 pixels). Déplié, on obtient une petite tablette en paysage, avec un écran interne de 7,6 pouces (1878 × 2670 pixels) dans un boîtier de 6,48 × 4,64 pouces.

Pour ceux qui font des sites web, cela veut dire deux tailles d'écran à gérer sur un seul appareil, et un visiteur qui peut passer de l'une à l'autre en pleine lecture, simplement en dépliant son téléphone. Voici les chiffres de [la fiche technique d'Apple](https://www.apple.com/fr/iphone-duo/specs/){target="_blank" rel="noopener"}, avec ma conversion en pixels CSS :

| | Écran externe (plié) | Écran interne (déplié) |
|---|---|---|
| Diagonale | 5,4 pouces | 7,6 pouces |
| Définition | 1398 × 2034 pixels | 1878 × 2670 pixels |
| Densité | 460 ppp | 430 ppp |
| Pixels CSS (mon estimation, ratio de 3) | environ 466 × 678 | environ 890 × 626, en paysage |

![Un smartphone pliable tenu à la main, écran déplié](/images/articles/pexels-imadclicks-19022728.webp)

## Tester son site avec l'outil Iphone Duo Preview

Il s'appelle Iphone Duo Preview et il a été développé par Caleb Kalejaiye, alias [Rapto](https://x.com/heyrapto) sur X. Le principe est simple : vous collez l'adresse de votre site, et il s'affiche dans un cadre d'iPhone Duo. Deux modes sont proposés, *Single* pour l'écran externe et *Extended* pour l'écran interne. On peut ensuite naviguer dans le site comme sur un vrai téléphone.

C'est gratuit, sans inscription, et tout se passe dans votre navigateur.

Vous pouvez l'essayer ici : [duo-responsive.vercel.app](https://duo-responsive.vercel.app/)

## houedanou.com est-il responsive sur l'iPhone Duo ?

J'ai collé l'adresse de ce blog, et voici ce que j'ai obtenu :

```
This website doesn't allow embedded previews.
```

![L'outil Iphone Duo Preview affichant « This website doesn't allow embedded previews » à la place de houedanou.com](/images/articles/iphone-duo-preview-refus-embed.webp)

Autrement dit, le site refuse d'être affiché dans une page tierce. Sur le moment, je n'étais pas mécontent. Un site qui ne se laisse pas embarquer dans une iframe est un site qui se protège contre le clickjacking, cette technique qui consiste à charger votre site dans une page invisible pour faire cliquer le visiteur sur des boutons qu'il ne voit pas. C'est le genre de protection qu'on met en place une fois et qu'on oublie.

Sauf que je ne me souvenais pas de l'avoir mise en place.

## Vérifier les en-têtes X-Frame-Options et CSP

Par acquit de conscience, j'ai regardé les en-têtes renvoyés par le serveur :

```bash
curl -sI https://houedanou.com/ | grep -iE 'x-frame-options|content-security-policy'
```

Rien. Ni `X-Frame-Options`, ni `Content-Security-Policy`. J'ai ensuite chargé houedanou.com dans une iframe depuis un autre domaine, et le site s'est affiché sans problème. Pour finir, j'ai donné example.com à l'outil de Rapto, qui l'a affiché normalement, puis à nouveau houedanou.com, qui a été refusé une seconde fois.

Conclusion : l'outil se trompe. Mon site accepte parfaitement d'être embarqué, et c'est la vérification préalable de l'outil qui échoue quelque part, pour une raison que je n'ai pas cherché à comprendre. Le projet a un jour d'existence, il aura le temps de mûrir.

Mais surtout, cette petite enquête m'a appris quelque chose que j'ignorais : mon site n'avait aucune protection contre le clickjacking. Et j'étais à deux doigts de fermer l'onglet en croyant le contraire, sur la foi d'un message d'erreur.

J'ai donc ajouté l'en-tête qui manquait, avant de publier ce billet :

```
Content-Security-Policy: frame-ancestors 'self';
```

Cette directive indique au navigateur que seul houedanou.com a le droit d'afficher les pages de houedanou.com dans une iframe. Elle n'a aucun effet sur les scripts, les polices ou les iframes que le site charge lui-même, donc les commentaires Disqus continuent de fonctionner.

Petit détail amusant : au prochain déploiement, l'outil de Rapto affichera exactement le même message sur mon site. Sauf que cette fois, ce sera vrai 🙂

## Et donc, responsive ou pas ? Le test dans Chrome DevTools

Comme l'outil ne voulait pas me répondre, j'ai fait le test à la main [dans Chrome](/fr/20260401-persistance-css-chrome-devtools), en simulant les deux écrans. Apple ne publie que les pixels physiques, j'ai donc supposé un ratio de 3 comme sur les iPhone récents, ce qui donne environ 466 × 678 pixels CSS pour l'écran externe et 890 × 626 pour l'écran interne.

Dans les deux cas, la mise en page tient : une seule colonne sur l'écran externe, la largeur complète sur l'écran interne, et aucun débordement horizontal.

Pour refaire le test sur votre site (libellés de la version anglaise des DevTools) :

1. Ouvrez les DevTools de Chrome et cliquez sur **Toggle device toolbar** pour passer en mode appareil.
2. Dans la liste **Dimensions**, choisissez **Edit**, puis **Add custom device** ([documentation de Chrome](https://developer.chrome.com/docs/devtools/device-mode){target="_blank" rel="noopener"}).
3. Créez deux appareils, « iPhone Duo plié » en 466 × 678 et « iPhone Duo déplié » en 890 × 626, avec un ratio de pixels (DPR) de 3.
4. Passez de l'un à l'autre en rechargeant la page, et cherchez une barre de défilement horizontale ou un élément coupé.

![Un croquis de wireframe à côté d'un smartphone](/images/articles/pexels-picjumbo-com-196644.webp)

Ce que je note toutefois, c'est que l'écran interne déplié est large mais assez court : 890 pixels de large pour seulement 626 de haut. On a tous l'habitude de tester nos points de rupture en largeur. Sur cet appareil, c'est plutôt la hauteur qu'il faudra surveiller. Entre un en-tête fixe, un bandeau cookies et une bannière de newsletter, il ne reste pas beaucoup de place pour le contenu.

Voilà pour l'iPhone Duo. Si vous testez votre site avec l'outil de Rapto et qu'il vous dit que votre site refuse les aperçus, ne le croyez pas sur parole : allez vérifier vos en-têtes vous-même. Vous pourriez avoir une bonne ou une mauvaise surprise.

*Mise à jour du 8 novembre 2026 : ajout du tableau des tailles d'écran, d'après la fiche technique d'Apple (avec la densité en pixels par pouce), et de la marche à suivre pour simuler les deux écrans dans Chrome DevTools.*

---

*Crédits photos : [Imad Clicks](https://www.pexels.com/@imadclicks/) et [picjumbo.com](https://www.pexels.com/@picjumbo-com-55570/) sur Pexels. Capture d'écran : [Iphone Duo Preview](https://duo-responsive.vercel.app/).*

---
*[Jean-Luc Houédanou](https://houedanou.com)*
