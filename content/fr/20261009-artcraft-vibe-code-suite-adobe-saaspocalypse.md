---
title: "ArtCraft : quelqu'un a vibe codé la suite Adobe, et le SaaSpocalypse est réel"
createdAt: "2026-10-09T18:00:00Z"
image: "/images/articles/artcraft-photocraft.webp"
description: "ArtCraft refait Photoshop, Lightroom et Premiere en Rust avec Claude, gratuitement, sur Windows, Mac et Linux. Fan d'Affinity, je le teste ce week-end."
searchIntent: "Qu'est-ce qu'ArtCraft (PhotoCraft, LightCraft, FilmCraft), ces clones open source d'Adobe codés avec l'IA, et peuvent-ils remplacer Photoshop ou Lightroom ?"
tags: ["opinion", "tech", "IA", "open-source", "logiciel gratuit", "vibe coding", "linux"]
---

En avril, j'ai écrit que le vibe coding, c'était le Bronny James du code. Six mois plus tard, quelqu'un a vibe codé la suite Adobe.

Pas un clone de Paint. Pas une énième to-do list. Photoshop, Lightroom, Premiere, Illustrator, After Effects, InDesign et Acrobat. Les sept.

Je suis tombé dessus dans une vidéo de FUTC, un vidéaste photo qui est aussi développeur. Le titre ne fait pas dans la nuance : [« Somebody Vibe Coded EVERY SINGLE ADOBE App »](https://www.youtube.com/watch?v=eFB79TYI-Vw){target="_blank" rel="noopener"}. Le projet s'appelle ArtCraft. Et ce week-end, je l'essaie.

## ArtCraft, c'est quoi ?

ArtCraft, c'est une collection d'alternatives gratuites et open source aux logiciels d'Adobe, écrites de zéro en Rust, qui en reprennent l'interface et les outils. Les premiers dépôts ont été publiés sur GitHub le 30 septembre 2026, sous licence MIT ou Apache-2.0. Les sept applications sont annoncées sur macOS, Windows et Linux.

ArtCraft a été créé par Brandon Thomas, un développeur d'Atlanta. Au départ, c'était un studio open source de génération d'images et de vidéos par IA. Pour ces nouvelles applications, Brandon Thomas a travaillé avec Claude Opus 5.5, le modèle d'Anthropic. Ça se voit jusque dans l'historique GitHub : les commits portent la mention « Co-Authored-By: Claude Opus 5.5 ».

| Application | Remplace | Statut au 9 octobre 2026 |
|---|---|---|
| PhotoCraft | Photoshop | alpha précoce |
| LightCraft | Lightroom | en développement |
| FilmCraft | Premiere Pro | en développement |
| VectorCraft | Illustrator | en développement |
| EffectCraft | After Effects | en développement |
| DesignCraft | InDesign | en développement |
| PdfCraft | Acrobat | alpha précoce |

Le plus fou, c'est le calendrier. Les dépôts de PhotoCraft, LightCraft, FilmCraft, VectorCraft et PdfCraft ont été créés le 30 septembre. Le premier commit de PhotoCraft s'intitule « one-shot ». Au 9 octobre 2026, l'application en est à la version 0.5.0 et compte près de 34 000 étoiles sur GitHub.

La feuille de route de LightCraft donne même le chiffre : quatre à six agents IA en parallèle ont bouclé les quatorze premiers jalons de l'application en environ 25 heures de travail actif. Vingt-cinq heures. Le même document précise qu'il reste du chemin : en effort, LightCraft n'en serait qu'à 20 à 35 % d'un Lightroom complet.

Et ça ne s'arrête pas à Adobe. Le 7 octobre, [la même équipe](https://github.com/storytold){target="_blank" rel="noopener"} a ouvert des dépôts pour Word (WordCraft), Excel (GridCraft), PowerPoint (DeckCraft), Pro Tools (SoundCraft) et un logiciel de dessin technique façon AutoCAD (CADCraft).

## « Vibe codé », vraiment ?

Je dois être honnête, puisque j'ai passé un billet entier à [taper sur les vibe codeurs](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

Brandon Thomas n'est pas Bronny James. Dans son annonce sur Reddit, rapportée par Gizmodo, il se présente comme un vétéran avec quinze ans de métier, pas comme un simple vibe codeur. Sur son profil GitHub, une ligne résume sa spécialité : Rust. Il sait ce qu'il demande à la machine, et il sait lire ce qu'elle lui rend.

C'est exactement ce que je disais en avril : l'IA multiplie le métier de celui qui l'a déjà. Entre les mains de quelqu'un qui connaît le jeu, Claude n'est pas une béquille. C'est un banc de remplaçants qui ne se fatiguent jamais.

Le titre de la vidéo dit « vibe coded ». Moi, je dirais plutôt : un développeur expérimenté avec une petite armée d'agents. Et pour Adobe, c'est bien plus inquiétant.

## Ce que montre la vidéo de FUTC

FUTC explique s'intéresser à ces alternatives à cause des prix d'Adobe, de ses conditions d'utilisation et de sa politique sur l'IA. La vidéo passe trois applications au banc d'essai :

- **PhotoCraft**, l'équivalent de Photoshop : calques, masques, courbes, ouverture de fichiers PSD et accélération matérielle. Ça fonctionne.
- **LightCraft**, l'équivalent de Lightroom : import de fichiers RAW et de presets Lightroom. Les aperçus restent en basse résolution pour garder de la fluidité, mais les presets standards passent.
- **FilmCraft**, l'équivalent de Premiere : des rushes 5K en 10 bits et des fichiers H.265. Ça saccade parfois, et il manquait lors du tournage des fonctions comme le ripple delete, mais l'encodage accéléré par le matériel fonctionne.

Le verdict : c'est une alpha, encore brute de décoffrage, mais étonnamment capable pour un projet monté en quelques jours. VectorCraft, DesignCraft et EffectCraft restent à tester.

## Le vrai avantage : Windows, Mac et Linux

Voilà ce qui me fait vraiment plaisir : ArtCraft ne choisit pas son camp.

PhotoCraft s'installe sur macOS, en version universelle pour les puces Apple et Intel, signée et notarisée par Apple. Sur Windows, en x64, en ARM et jusqu'en 32 bits. Sur Linux, au choix en AppImage, en .deb, en .rpm ou en Flatpak. Il existe aussi une version FreeBSD. Et d'après le site d'ArtCraft, six des sept applications tournent dans le navigateur.

Adobe n'a jamais sorti Photoshop ni Lightroom sur Linux. Et Affinity, que j'adore, n'a toujours pas de version Linux officielle : il faut passer par [des bidouilles à base de Wine](https://www.omgubuntu.co.uk/2026/01/run-affinity-linux-ubuntu-appimage){target="_blank" rel="noopener"}.

Je [passe de Mac à Linux](/fr/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux) sans me poser de questions, et je squatte ces temps-ci l'ordinateur de ma nièce sous ChromeOS. C'est la première fois qu'une suite qui imite Adobe, de Photoshop à Lightroom, peut me suivre partout. Sur ChromeOS, je passerai par l'environnement Linux et le paquet .deb, puisque la version web est une archive à héberger soi-même.

Et pensez au graphiste d'Abidjan qui a récupéré un vieux PC et y a installé Ubuntu parce que Windows ramait. Il avait déjà GIMP, Krita ou Darktable. Il aura peut-être bientôt les outils et les raccourcis qu'il a appris sur Photoshop, en natif, sans abonnement facturé en devises et sans version crackée. Brandon Thomas le dit d'ailleurs sur Hacker News : il en a assez que GIMP, Krita et Inkscape soient le meilleur de ce que le libre propose sous Linux.

## Ce qui m'intéresse : LightCraft et mes vieux presets de Ricoh Theta

J'utilise Affinity depuis sa première version. J'ai payé la 1, puis la 2, et j'ai applaudi quand [Affinity est devenu gratuit](/fr/20251031-affinity-est-gratuit). Mais j'ai toujours eu un regret, et je l'écrivais déjà à l'époque : je n'ai jamais trouvé d'équivalent à Lightroom pour retoucher les photos de ma Ricoh Theta. Ni Darktable, ni Affinity Photo.

Résultat, j'ai de vieux presets Lightroom qui dorment dans un dossier, réglés pour les photos à 360 degrés de la Theta.

Bonne nouvelle : LightCraft sait les importer. C'est écrit noir sur blanc dans [la documentation du projet](https://github.com/storytold/lightcraft/blob/main/docs/xmp-interop.md){target="_blank" rel="noopener"}. Il lit les presets au format XMP, l'ancien format .lrtemplate de Lightroom, des dossiers entiers et même des archives .zip. Il lit aussi le DNG, le format RAW de la Theta Z1, avec les matrices de couleur embarquées dans le fichier.

Deux bémols, que le projet signale lui-même :

- certains réglages ne passent pas, comme le profil d'appareil ou les « Looks ». L'application les liste à l'import au lieu de les ignorer en silence ;
- pour les presets d'avant Lightroom 4 (le moteur de 2010), les réglages sont approximés avec les curseurs actuels.

Et un troisième bémol, propre à la Theta, qu'il faut avoir en tête avant le week-end. Le DNG de la Z1 contient les deux images fisheye côte à côte, pas encore assemblées. Dans Lightroom Classic, c'est [le plug-in THETA Stitcher de Ricoh](https://thetaz1.com/en/creativity/){target="_blank" rel="noopener"} qui les assemble, et LightCraft n'accepte pas de plug-ins. Il faudra donc développer dans LightCraft, exporter en TIFF, puis trouver comment assembler sans le plug-in.

Mon plan pour ce week-end :

1. importer mon dossier de presets dans LightCraft ;
2. les appliquer à une poignée de DNG de la Theta ;
3. comparer avec ce que donnaient ces presets dans Lightroom ;
4. exporter en TIFF, assembler la photo sans le plug-in, puis vérifier qu'elle est bien reconnue comme une 360.

Et côté Affinity, une surprise : PhotoCraft ouvre les fichiers Affinity (.afphoto, .afdesign, .afpub), en lecture seule. Les effets et réglages qu'il ne sait pas encore rendre sont listés dans un avertissement. Je testerai aussi, sur des copies.

## Ce qui coince encore

Remplacer Photoshop ? Pas encore, de l'aveu même du projet. Et je ne vais pas vous [vendre du rêve](/fr/20260908-philippe-simo-vendeur-de-reves).

- PhotoCraft le dit dans sa documentation : ce n'est pas encore un remplaçant de Photoshop pour le travail professionnel au quotidien. Il manque l'IA générative, une vingtaine d'outils, de la profondeur en typographie et la compatibilité avec les plug-ins.
- Brandon Thomas le reconnaît sur Hacker News : ses applications sont encore loin d'être prêtes. Il vise la quasi-parité avec Adobe « en mois, pas en années ».
- LightCraft se donne lui-même 60 à 70 % de ce qu'il faut pour remplacer Lightroom au quotidien. Sur Hacker News, un photographe juge son rendu RAW encore loin de celui d'Adobe.
- Gizmodo a testé PhotoCraft : la transformation manuelle se comportait de façon erratique.
- ArtCraft parle de réimplémentation « clean-room » : aucune ligne de code d'Adobe, tout est écrit à partir des spécifications publiques et du comportement observé des logiciels. Reste à voir ce qu'en pensera le service juridique d'Adobe.

Donc on teste sur des copies de fichiers. Pas sur le seul exemplaire du shooting d'un client.

## Le SaaSpocalypse est réel

Début février 2026, les plug-ins métiers qu'Anthropic venait de sortir pour Claude Cowork, son outil pour les tâches de bureau, ont fait paniquer les marchés. Les investisseurs ont vendu en masse les actions des éditeurs de logiciels. [Fortune](https://fortune.com/2026/02/06/anthropic-claude-opus-4-6-stock-selloff-new-upgrade/){target="_blank" rel="noopener"} a évoqué une chute à mille milliards de dollars, et [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks){target="_blank" rel="noopener"} a repris le surnom qui circulait chez les traders : « SaaSpocalypse ».

En juin, le fonds Thoma Bravo assurait sur [CNBC](https://www.cnbc.com/2026/06/09/orlando-bravo-saaspocalypse-over-ai-software.html){target="_blank" rel="noopener"} que le SaaSpocalypse était terminé. Je ne suis pas d'accord.

En février, les marchés avaient peur que l'IA fasse le travail des salariés, et donc qu'Adobe et les autres vendent moins de licences. Ce qu'ArtCraft montre en octobre, c'est autre chose : l'IA peut refaire le logiciel lui-même. Le fossé qui protégeait Adobe tenait en une phrase : personne n'aura jamais les moyens de réécrire Photoshop. Ce fossé se comble à vue d'œil.

Adobe garde des atouts, évidemment : les formats, les habitudes, les plug-ins, Firefly, les studios qui ont bâti toute leur chaîne de production dessus. Mais quand une alpha gratuite ouvre vos PSD sur Linux, l'abonnement mensuel devient plus dur à justifier. Surtout quand Adobe a accepté en mars [un accord de 150 millions de dollars](https://www.justice.gov/opa/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore-online){target="_blank" rel="noopener"} pour clore la plainte du ministère américain de la Justice. On lui reprochait de cacher ses frais de résiliation et de compliquer l'annulation des abonnements. [Je parlais déjà de cette plainte en 2024](/fr/20241212-cher-gens-dadobe).

Le Wu-Tang disait [C.R.E.A.M.](/fr/20260907-bill-gates-ia-hypocrisie-meta-cash-rules-everything), *Cash Rules Everything Around Me*. Chez Adobe, ça s'est longtemps lu *Cloud Rules Everything Around Me*. Pour combien de temps encore ?

## Rendez-vous après le week-end

Ce week-end, j'installe PhotoCraft et LightCraft, d'abord sur Mac, puis sous Linux. Je vous ferai un retour. Si mes vieux presets de Theta reprennent vie, ça méritera un billet à part.

Ironie de l'histoire : début février, des plug-ins pour Claude ont fait plonger les éditeurs de logiciels. Début octobre, c'est Claude qui a écrit ArtCraft. Anthropic n'a pas besoin de concurrencer Adobe. Il lui suffit de vendre les pelles.

## Sources

- FUTC, [« Somebody Vibe Coded EVERY SINGLE ADOBE App »](https://www.youtube.com/watch?v=eFB79TYI-Vw){target="_blank" rel="noopener"}, YouTube
- ArtCraft, [Crafting Apps](https://getartcraft.com/apps){target="_blank" rel="noopener"}, liste des applications et statuts
- GitHub, [l'organisation storytold](https://github.com/storytold){target="_blank" rel="noopener"} et les dépôts [PhotoCraft](https://github.com/storytold/photocraft){target="_blank" rel="noopener"}, [LightCraft](https://github.com/storytold/lightcraft){target="_blank" rel="noopener"} et [FilmCraft](https://github.com/storytold/filmcraft){target="_blank" rel="noopener"}, consultés le 9 octobre 2026
- LightCraft, [feuille de route](https://github.com/storytold/lightcraft/blob/main/ROADMAP.md){target="_blank" rel="noopener"} et [import des presets Lightroom](https://github.com/storytold/lightcraft/blob/main/docs/xmp-interop.md){target="_blank" rel="noopener"}
- Gizmodo, [« Someone Vibe Coded a Free Knockoff of Adobe Creative Suite »](https://gizmodo.com/someone-vibe-coded-a-free-knockoff-of-adobe-creative-suite-2000823322){target="_blank" rel="noopener"}, 7 octobre 2026
- PetaPixel, [« Someone Rebuilt Free, Open-Source Versions of Photoshop, Premiere, and Lightroom Using AI »](https://petapixel.com/2026/10/07/someone-rebuilt-free-open-source-versions-of-photoshop-premiere-and-lightroom-using-ai/){target="_blank" rel="noopener"}, 7 octobre 2026
- Hacker News, [« ArtCraft Apps – open-source Adobe compatible suite written in Rust »](https://news.ycombinator.com/item?id=49958850){target="_blank" rel="noopener"}, 4 octobre 2026, avec les réponses de Brandon Thomas, et [« Adobe Creative Suite Cleanroom Port to Rust »](https://news.ycombinator.com/item?id=49981449){target="_blank" rel="noopener"}, 6 octobre 2026
- Ricoh, [THETA Z1 : RICOH THETA Stitcher pour Lightroom Classic](https://thetaz1.com/en/creativity/){target="_blank" rel="noopener"}
- OMG! Ubuntu, [Affinity sous Linux via une AppImage non officielle](https://www.omgubuntu.co.uk/2026/01/run-affinity-linux-ubuntu-appimage){target="_blank" rel="noopener"}, janvier 2026
- Fortune, [« Anthropic's Claude triggered a trillion-dollar selloff »](https://fortune.com/2026/02/06/anthropic-claude-opus-4-6-stock-selloff-new-upgrade/){target="_blank" rel="noopener"}, 6 février 2026
- Bloomberg, [« What's Behind the 'SaaSpocalypse' Plunge in Software Stocks »](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks){target="_blank" rel="noopener"}, 4 février 2026
- CNBC, [« The 'SaaSpocalypse' is over, says private equity giant Thoma Bravo »](https://www.cnbc.com/2026/06/09/orlando-bravo-saaspocalypse-over-ai-software.html){target="_blank" rel="noopener"}, 9 juin 2026
- Ministère américain de la Justice, [accord de 150 millions de dollars avec Adobe](https://www.justice.gov/opa/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore-online){target="_blank" rel="noopener"}, mars 2026

_Capture de couverture : PhotoCraft (licence MIT ou Apache-2.0), avec [La Grande Vague de Kanagawa](https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg){target="_blank" rel="noopener"} d'Hokusai, dans le domaine public._

---
*[Jean-Luc Houédanou](https://houedanou.com) — sur Affinity depuis la version 1*
