# Contrôle avant publication : « ArtCraft : quelqu'un a vibe codé la suite Adobe »

Billet : `content/fr/20261009-artcraft-vibe-code-suite-adobe-saaspocalypse.md` et `content/en/…`, daté du 9 octobre 2026.
Outils : claude-blog (`blog-factcheck`, `blog-seo-check`, `blog-reviewer`, `analyze_blog.py`) et
claude-seo (`seo-content`, contrôle du HTML généré par `nuxt generate`).

## Scores

| | Premier jet | Publication |
|---|---|---|
| `analyze_blog.py` FR (heuristique anglophone) | 62 | 65 |
| `analyze_blog.py` EN | — | 68 |
| blog-reviewer (barème sur 100) | 81 | corrigé |
| seo-content (qualité / E-E-A-T) | 78 / 72 | corrigé |

## Checklist SEO (blog-seo-check + HTML généré)

| Élément | Résultat |
|---|---|
| Titre | **Long** : 77 car. FR, 75 EN (+ « — houedanou.com »). « ArtCraft » en tête ; Google coupera vers « SaaSpocalypse ». Gardé tel quel : c'est la formule de l'auteur. |
| Meta description = `description` | OK : 151 car. FR, 155 EN |
| Un seul H1 (rendu par le template), 9 H2, aucun saut de niveau | OK |
| Liens internes | OK : 6 par langue (vibe codeurs, Mac et Linux, Affinity, Philippe Simo, Adobe 2024, C.R.E.A.M.) |
| Lien de retour | Ajouté dans le billet Affinity (FR et EN), en note de fin, sans `updatedAt` (pas de changement de fond) |
| Liens externes en nouvel onglet | OK : 28 par langue, aucun `{target…}` résiduel dans le HTML |
| `og:image` en JPEG 1200×630 | OK : `/og/artcraft-photocraft.jpg`, entrée ajoutée à `data/og-cards.js` |
| JSON-LD BlogPosting, canonical, hreflang fr / en / x-default | OK (template) |
| Sitemaps FR et EN, flux RSS | OK |
| Caractères Unicode invisibles | Aucun |
| Phrases de plus de 35 mots | 1 en FR (39 mots, passage Adobe/DOJ), coupée |

## Factcheck

| Affirmation | Statut | Source |
|---|---|---|
| 7 apps, équivalents Adobe, statuts au 9 octobre | Vérifié | getartcraft.com/apps |
| Rust, MIT ou Apache-2.0, 7 apps annoncées sur macOS / Windows / Linux | Vérifié | site, fichiers LICENSE des 7 dépôts |
| Installeurs PhotoCraft (universel notarisé, x64/ARM/32 bits, AppImage/deb/rpm/Flatpak, FreeBSD) | Vérifié | README et release v0.5.0 |
| « Chaque application s'installe sur macOS, Windows et Linux » | **Corrigé** : « annoncées », 5 apps sur 7 sont encore en développement | getartcraft.com/apps |
| Version navigateur utilisable sur ChromeOS | **Corrigé** : la version web est une archive à héberger soi-même ; passage par l'environnement Linux | page PhotoCraft |
| Brandon Thomas, Atlanta, fondateur d'ArtCraft ; Claude Opus 5.5 ; « Co-Authored-By » dans les commits | Vérifié | profil GitHub `echelon`, commits, Gizmodo |
| Dépôts créés le 30 sept., premier commit « one-shot », v0.5.0, ~34 000 étoiles | Vérifié | API GitHub |
| « 4 à 6 agents ont construit l'essentiel de LightCraft en 25 h » | **Nuancé** : 14 premiers jalons (M0 à M13) en ~25 h ; 20 à 35 % du chemin vers un Lightroom complet | ROADMAP.md de LightCraft |
| Dépôts Word, Excel, PowerPoint, Pro Tools, AutoCAD ouverts le 7 octobre | Vérifié | organisation GitHub storytold |
| Thomas : apps « not anywhere close to ready » | **Source corrigée** : fil HN 49958850 (4 oct.), pas 49981449 | Hacker News |
| « Des photographes » critiquent le rendu RAW de LightCraft | **Corrigé** : un photographe | Hacker News 49981449 |
| Import LightCraft : XMP, .lrtemplate, dossiers, .zip ; réglages non repris listés ; presets d'avant Lightroom 4 approximés | Vérifié | docs/xmp-interop.md |
| DNG de la Theta Z1 : deux fisheye non assemblés, plug-in THETA Stitcher pour Lightroom Classic | Vérifié, ajouté au billet | thetaz1.com, forum Adobe |
| PhotoCraft ouvre les fichiers Affinity en lecture seule ; « pas encore un remplaçant pro » ; clean-room | Vérifié | README de PhotoCraft |
| Affinity « n'existe que sur Windows et macOS » | **Corrigé** : Affinity a existé sur iPad ; « pas de version Linux officielle » | OMG! Ubuntu |
| SaaSpocalypse : plug-ins Claude Cowork, vente massive début février 2026 | Vérifié (date de sortie des plug-ins non affirmée) | Fortune, Bloomberg |
| Chiffre de 285 milliards de dollars | **Retiré** : non vérifié à la source | — |
| Thoma Bravo : « le SaaSpocalypse est terminé » (juin) | Vérifié | CNBC |
| Accord Adobe de 150 M$ (mars 2026) | Vérifié, source primaire ajoutée | justice.gov |
| Licence de la couverture | Vérifié : UI MIT ou Apache-2.0, Hokusai dans le domaine public | ATTRIBUTION.md de PhotoCraft |
| Contenu de la vidéo FUTC | Titre et chaîne vérifiés ; contenu repris du résumé fourni par l'auteur | oEmbed YouTube |

Liens externes : tous répondent, sauf Bloomberg et PetaPixel (403), qui bloquent les robots et s'ouvrent
normalement dans un navigateur.

## Corrections de style retenues

- Faits personnels non fournis par l'auteur retirés : « j'ai vérifié dans la documentation », « les exports que j'avais faits dans Lightroom ».
- Affirmations exagérées : « première fois qu'un Photoshop me suit partout » (Photopea, GIMP, Krita existent) reformulé.
- Calques de l'anglais : « angles vifs » → « brute de décoffrage » ; « a titré sur ».
- Tournures « ce n'est pas X, c'est Y » allégées ; H2 « Conclusion » et « Ce qu'il ne faut pas oublier » remplacés.
- Pronoms neutres pour l'auteur de la vidéo FUTC.

## Recommandations refusées

- Titre raccourci sous 60 caractères : la formule est celle de l'auteur.
- FAQ, « points clés », définitions plaquées : contraires à la voix d'un billet d'opinion.

## Après le week-end

Ajouter `updatedAt` et un paragraphe daté avec le résultat du test (presets Theta dans LightCraft, assemblage
sans le plug-in), ou un lien vers le billet suivant.
