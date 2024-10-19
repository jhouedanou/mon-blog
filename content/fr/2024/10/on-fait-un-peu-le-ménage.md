---
title: "On fait un peu le ménage."
image: "/images/articles/menage-image.jpeg"
createdAt: "2024-05-10"
---

# On fait un peu le ménage.

Cela faisait longtemps que je cherchais une bonne excuse pour me débarrasser de WordPress, au moins en tant que moteur de blog. J'ai, pendant longtemps, été un fervent défenseur de ce CMS, mais je dois reconnaître que je me sens de plus en plus mal à l'aise avec lui. Sa simplicité et la facilité à le modifier m'ont offert des possibilités infinies, mais certains points sont désespérants: 

- Il ya beaucoup de trop de vulnérabilités,
- l'avenir du CMS qui dépend de plus en plus du bon vouloir de ses créateurs qui retirent des autorisations de mises à jour de plugins essentiels en fonction de leur bonne relation avec leur créateur,
- Je reviens encore, sur les des failles de sécurité non patchées, et ce près d'une année après leur découverte .

Qui plus est, après un an d'utilisation de VueJS et Nuxt, ces technologies m'ont convaincu de franchir le pas. J'ai donc décidé, en début de semaine passée, de tout recommencer avec une configuration un peu exotique :

1.  \- un flux RSS sur Feedburner, provenant de mon blog backup jhouedanou.blogspot.com;
2.  \- un frontend en Nuxt 3;
3.  \- le tout hébergé sur Vercel.

Je me suis ensuite rendu compte du caractère expérimental et hétéroclite de ce projet, et je me suis dit que je pourrais faire mieux.
La nouvelle configuration est donc la suivante : Tout sur Nuxt (et Nuxt Content). Le contenu de ce blog sera généré à partir de fichiers Markdown, et le tout tournera sur hébergé sur Vercel.

Je ferais la migration de certains articles dans le futur.

Les prochaines étapes sont les suivantes :

- intégrer Open Graph ainsi qu'un moyen de partage, tel ShareIt ;
- trouver une API pour générer les images d'articles : *DALL-E* demande une carte bancaire introuvable en Côte d'Ivoire, et pour une raison inconnue, l'API de Pexels me propose des images qui n'ont rien avoir avec le contenu - par exemple, femmes à moitié nues afin d'illustrer l'article sur Djamo.  
   *Le salut viendra probablement de Unsplash*;
- m'attaquer à la question du **design** : car, oui, houedanou.com ne s'est jamais chargé aussi rapidement, mais il est franchement moche.

À très bientôt.
