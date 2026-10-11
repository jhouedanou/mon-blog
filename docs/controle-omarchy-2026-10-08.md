# Contrôle avant publication : « On ne sépare pas l'homme de ses dotfiles »

Billet : `content/fr/20261008-omarchy-dhh-homme-dotfiles.md` et `content/en/…`, publié le 8 octobre 2026.
Outils : claude-blog v2.2.0 (`blog-seo-check`, `blog-factcheck`, `analyze_blog.py`) et
claude-seo v2.4.1 (`seo-content`, contrôle du HTML généré).

## Score `analyze_blog.py` (indicatif, heuristique anglophone)

| | Avant le 1er contrôle | Publication |
|---|---|---|
| FR | 57 | 59 |
| EN | 68 | 70 |

Le score plafonne parce que l'outil réclame dans le Markdown un auteur et un JSON-LD (le
template les produit déjà, voir plus bas), des définitions d'entités, une FAQ et des tableaux,
qui n'ont pas leur place dans un billet d'opinion.

## Checklist SEO (blog-seo-check + HTML généré)

| Élément | Résultat |
|---|---|
| Titre | OK : 40 caractères FR, 44 EN |
| Meta description = `description` | OK : 158 caractères FR, 153 EN |
| Un seul H1 (le titre, rendu par le template) | OK |
| Hiérarchie H2, sans saut de niveau | OK |
| Liens internes | OK : 2 (billet Bill Gates / C.R.E.A.M., billet Koala Sampler) |
| Liens vers les billets cités en nouvel onglet | OK : Korben, le blog de DHH, ses 5 billets, It's FOSS |
| `og:locale` | OK : `fr_FR` / `en_US` |
| `og:image` en JPEG 1200×630 | OK : `/og/pingui.jpg` |
| JSON-LD BlogPosting | OK (template) |
| hreflang fr / en / x-default | OK |
| Présent dans le flux RSS et dans les sitemaps FR et EN | OK |
| Caractères Unicode invisibles | Aucun |
| Phrases de plus de 40 mots | 1 réelle, coupée (passage sur Mint). Les autres alertes viennent des listes. |

## Factcheck

| Affirmation | Statut | Source |
|---|---|---|
| Korben arrête de promouvoir Omarchy (8 octobre 2026) | Vérifié | [korben.info](https://korben.info/omarchy-dhh-boycott.html) |
| « As I remember London », 15/09/2025, « demographic replacement » | Vérifié | [billet de DHH](https://world.hey.com/dhh/as-i-remember-london-e7d38e64) |
| « low-average-IQ regions », « net-negative contributors » | Vérifié | [billet de DHH](https://world.hey.com/dhh/europe-is-weak-and-delusional-but-not-doomed-8b10e7cb) |
| « millions who are already in Europe must go » | Vérifié | [billet de DHH](https://world.hey.com/dhh/three-sacred-cows-that-must-die-so-europe-can-live-1afb203d) |
| Roms comparés aux loups, « you deport them » | **Corrigé** : le billet disait « chasser de l'espace public », DHH écrit « expulser » | [billet de DHH](https://world.hey.com/dhh/wolves-sheep-and-gypsies-ba44af6a) |
| 1Password et 37signals : 100 000 $ par an chacun | **Précisé** : sur trois ans, versés à la fondation | [It's FOSS](https://itsfoss.com/news/1password-omarchy-pledge/) |
| Le PDG de 1Password ne cautionne pas les idées de DHH | **Précisé** : propos tenus devant ses employés | [It's FOSS](https://itsfoss.com/news/1password-omarchy-pledge/) |
| R. Kelly : condamnations, appels, demande de commutation, sortie en 2045 | Vérifié | CBS New York, CBS Chicago |
| Diddy : verdict de juillet 2025, 50 mois, appel, libération repoussée | Vérifié | Rolling Stone, Forbes, Rolling Out |
| G. Craige Lewis : accusations non jugées, réponse en vidéo | Vérifié, formulé au conditionnel | Wikipédia, Primetimer |
| OCLP 3 en version candidate avec macOS Tahoe | Vérifié | AppleInsider |
| Wu-Tang : RZA, Staten Island, kung-fu de Hong Kong, neuf MC | Connu, non sourcé dans le billet | — |

Liens externes : tous répondent, sauf AppleInsider, Forbes, Rolling Out (403) et Primetimer (405),
qui bloquent les robots. Ces pages s'ouvrent normalement dans un navigateur.

## Recommandations refusées

- Auteur et JSON-LD dans le frontmatter : déjà produits par le template (`utils/schema.js`).
- FAQ, « points clés », tableau, définitions « **terme** est… » : à contre-emploi dans un billet d'opinion, et contraires à la voix de l'auteur.
- 3 à 10 liens internes : 2 liens pertinents valent mieux que des liens forcés.

## Remise en ligne (11 octobre 2026)

Le billet, retiré le 10 octobre, est remis en ligne avec ses deux URLs d'origine. Les
redirections 301 vers le billet Mac et Linux sont supprimées, et le lien « sans passer par
Omarchy » y est rétabli.

Ajout dans la conclusion : l'auteur essaie d'abord Ryoku. `updatedAt` passe au 11/10/2026.

| Affirmation | Statut | Source |
|---|---|---|
| Ryoku : distribution basée sur Arch, bureau sous Hyprland ou niri | Vérifié | [ryoku.dev](https://ryoku.dev), [LinuxLinks](https://www.linuxlinks.com/ryoku-arch-based-linux-distribution-custom-wayland-desktop/) |
| « Is Ryoku an Omarchy alternative? » « Yes, and it is its own project, not a fork. » | Vérifié | [FAQ de ryoku.dev](https://ryoku.dev) |

## Réécriture : le retournement de veste (11 octobre 2026, soir)

Le billet s'ouvre désormais sur le retournement de veste : l'auteur a installé Omarchy sur
son MacBook Pro fin 2016. Le texte du 8 octobre suit, sous « Ce que j'écrivais le 8 octobre »
(titres passés en H3), puis viennent les arguments, les réglages du MacBook et la conclusion.

Retirés, en FR et en EN : Wu-Tang (Method Man, RZA, « Protect ya neck »), R. Kelly, Diddy,
G. Craige Lewis, OpenCore Legacy Patcher, ChromeOS, Linux Mint, et leurs sources (CBS ×2,
Rolling Stone, Forbes, Rolling Out, Wikipédia, Primetimer, AppleInsider). Les lignes
correspondantes du factcheck ci-dessus ne s'appliquent plus. Les liens internes vers les
billets Bill Gates / C.R.E.A.M. et Koala Sampler partent avec le Wu-Tang : le billet n'a
plus de lien interne.

| Affirmation | Statut | Source |
|---|---|---|
| Omarchy est livré avec Claude Code et OpenCode | Vérifié | [manuel d'Omarchy, « AI »](https://learn.omacom.io/2/the-omarchy-manual/107/ai) |
| `cx` lance Claude Code en « danger mode » ; skill Omarchy expérimentale | Vérifié | idem |
| Ne pas utiliser `pacman -Syu` ; `omarchy update` fait un snapshot puis les migrations | Vérifié | [manuel d'Omarchy, « Updates »](https://learn.omacom.io/2/the-omarchy-manual/68/updates) |
| Omarchy est sous licence MIT | Vérifié | [GitHub](https://github.com/basecamp/omarchy) |
| Dernier macOS du MacBook Pro 2016 : Monterey | Vérifié | [Apple](https://support.apple.com/fr-fr/108052) |
| Pilote son pour puces Cirrus CS8409 | Vérifié | [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro) |
| « Woah partner », noyau 7.2, commandes du pilote, Wi-Fi réglé sur la CanalBox | Expérience de l'auteur (journal de terminal fourni) | — |

Ajout d'une section « Ce que vous m'avez répondu » : deux réactions de lecteurs fournies par
l'auteur, citées sans nom, orthographe corrigée (« partagé », « distros »).

Billet Mac et Linux : le lien « sans passer par Omarchy » devient « j'ai fini par installer
Omarchy sur mon vieux MacBook » (FR et EN).

À compléter : le détail des réglages faits sur la CanalBox pour le Wi-Fi.
