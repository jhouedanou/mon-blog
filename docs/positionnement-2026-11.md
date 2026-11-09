# Positionnement des billets sur leurs termes, novembre 2026

Deux passes sur les 73 billets (146 fichiers FR + EN), faites les 8 et 9 novembre 2026 avec le skill
`claude-blog` (`/blog-rewrite`). Elles suivent l'audit éditorial du 8 octobre
(`docs/audit-seo-2026-10.md`) et l'audit de positionnement du 18 octobre
(`docs/audit-positionnement-2026-10-18.md`).

1. **Positionnement** : chaque billet vise un terme de recherche, en français et en anglais, sans
   qu'un autre billet du blog vise le même.
2. **Style** : des phrases plus naturelles, sans surenchère ni envolées, à la demande de l'auteur.

## Limites

Pas de Search Console ni d'outil de volumes de recherche : les termes viennent du `searchIntent`
de chaque billet et de la façon dont on chercherait ce sujet. Aucun volume n'a été inventé.
L'effet réel se mesurera dans la Search Console, en comparant les requêtes et les positions avant et
après la mise en ligne.

## Règles suivies

- Le template affiche déjà le H1, l'auteur, l'encadré « Résumé », le JSON-LD, la canonical et la
  carte sociale : rien de tout ça n'a été ajouté dans le Markdown. Pas de FAQ ni d'encadré « points
  clés » plaqués.
- Seuls `title`, `description`, `searchIntent`, `summary` et, en cas de changement de fond,
  `updatedAt` ont changé dans le frontmatter. Images, dates de création, slugs et noms de fichiers
  sont inchangés : aucune URL ne bouge.
- Titre : le terme dans les 40 premiers caractères environ, 65 caractères au plus avec le suffixe
  « — Jean-Luc Houédanou ».
- Billets d'opinion : titre, description, ouverture, intertitres et liens seulement. Tutoriels :
  restructuration permise, faits vérifiés et sourcés.
- Les corrections datées d'octobre et la liste « Conservés volontairement » n'ont pas été touchées.
- Brouillon `20261103-oraimo-avis…` : retouché, mais aucun billet publié ne pointe vers lui.

## Avant / après

| Contrôle | Avant | Après |
|---|---|---|
| `<title>` généré, longueur moyenne | 86 caractères | 63 caractères |
| `<title>` de plus de 70 caractères | 120 | 0 |
| Billets FR sans lien interne | 18 | 0 |
| Fichiers avec moins de 3 liens internes | 124 | 0 |
| Pages article générées sans problème (1 H1, description 120-160, liens internes valides) | 144 / 144 | 144 / 144 |
| Score `analyze_blog.py` (heuristique anglophone, indicatif) | FR 51,4 | FR 55,1, EN 56,2 |

## Termes par billet (FR)

| Groupe | Billet | Terme principal |
|---|---|---|
| Blog Nuxt | `20241005-on-fait-un-peu-le-ménage` | quitter WordPress pour Nuxt |
| | `20241021-pendaison-de-cremaillere` | blog sans base de données |
| | `20261018-migration-wordpress-nuxt-…` | SEO perdu après migration |
| | `20260922-jai-recupere-le-trafic-…` | limite CPU Cloudflare Workers |
| Hébergement | `20260402-vercel-cloudflare-pages-migration` | Vercel vers Cloudflare Pages |
| | `20260327-cpanel-cyberpanel-migration` | cPanel vers CyberPanel |
| | `20260331-migrer-prestashop-…` | changer de domaine PrestaShop |
| Serveur | `20261020-site-wordpress-pirate-…` | WordPress piraté |
| | `20261031-redis-plein-vps-wordpress-…` | mémoire Redis pleine |
| | `20261021-php2shell-…` | PHP2Shell : mettre à jour PHP |
| | `20260401-persistance-css-chrome-devtools` | CSS persistant DevTools |
| Mac | `20260718-puremac-…` | nettoyeur Mac gratuit open source |
| | `20260901-macsai-mole-…` | alternative gratuite à CleanMyMac |
| | `20260925-retrouver-dossier-github-…` | dossier GitHub bloqué par iCloud |
| | `20261023-netflix-ecran-noir-displaylink-mac` | Netflix écran noir DisplayLink |
| Vieux Mac, écrans | `20260929-sharp-vieil-imac-…` | vieil iMac en écran secondaire |
| | `20261030-opendisplay-vieil-imac-…` | iMac en écran d'un PC Linux |
| | `20261014-installer-macos-ssd-externe-imac-2017` | installer macOS sur un SSD externe |
| | `20260810-double-moniteur-portable-…` | double moniteur portable |
| | `20241021-2-non-ce-cable-de-240w-…` | câble USB-C pour MacBook Pro |
| Linux | `20261008-omarchy-dhh-homme-dotfiles` | boycott d'Omarchy |
| | `20261013-retournement-de-veste-omarchy-…` | Omarchy sur MacBook Pro 2017 |
| | `20261008-pas-besoin-detre-dev-…` | Mac ou Linux |
| | `20261021-imprimante-thermique-netum-…` | NETUM A401S sous Linux |
| Systèmes | `20241029-cloner-ubuntu` | cloner Ubuntu vers un SSD plus grand |
| | `20241020-ghostwriter-…` | alternative à iA Writer sous Linux |
| | `20260414-windows-sans-prise-de-tete` | installer Windows 11 sans compte Microsoft |
| Claude Code | `20260423-chers-vibe-codeurs-…` | limites du vibe coding |
| | `20260515-claude-code-caveman-mode` | mode caveman Claude Code |
| | `20260531-claude-dispatch-…` | Claude Code Remote Control |
| | `20261016-pourquoi-lia-ne-me-remplacera-pas` | l'IA va-t-elle remplacer les développeurs |
| IA | `20250604-Liaetmoi` | un an avec l'IA |
| | `20260707-Je suis encore vivant` | vrai métier de développeur |
| | `20260926-apocalypse-ia-…` | apocalypse IA |
| | `20260907-bill-gates-ia-…` | mémo de Bill Gates sur l'IA |
| | `20260907-free-speech-oui-mais-pas-ca` | United States v. Anderegg |
| Design | `20241212-cher-gens-dadobe` | pourquoi on déteste Adobe |
| | `20251031-affinity-est-gratuit` | Affinity gratuit |
| | `20260519-comment-installer-adobe-xd-en-2026` | installer Adobe XD en 2026 |
| | `20261009-artcraft-…` | ArtCraft, suite Adobe open source |
| Musique, loisirs | `20260822-koala-sampler-…` | Koala Sampler gratuit sur Mac |
| | `20261026-lemon-studio-clone-fl-studio` | Lemon Studio, clone de FL Studio |
| | `20261008-jeux-quest-3s-recommandations` | jeux Quest 3S |
| | `20250508-project-fat-loss` | app de suivi de perte de poids |
| Apple | `20250615-ipados26` | iPadOS 26 sur iPad mini |
| | `20260911-samsung-tacle-iphone-duo-…` | Samsung se moque de l'iPhone Duo |
| | `20260911-site-responsive-iphone-duo` | site responsive sur l'iPhone Duo |
| | `20261006-icloud-plus-099-…` | iCloud+ avec Apple TV et Apple Arcade |
| | `20260326-lasagessedugeant` | stratégie IA d'Apple |
| Sécurité | `20260618-alerte-phishing-bing-webmaster-tools` | faux Bing Webmaster Tools |
| | `20260831-faux-mail-renouvellement-zoho-…` | faux mail Zoho |
| | `20260417-apple-pay-visa-faille-tap-to-pay` | faille Apple Pay Visa |
| | `20250705-chersCommerciaux` | géolocalisation des salariés |
| | `20260730-telephone-perdu-…` | téléphone perdu Find Hub |
| Gadgets | `20260311-comment-allumer-lecran-pixel-watch-…` | Pixel Watch allumer l'écran notification |
| | `20251225-infinix-ou-oraimo` | Infinix Watch 3 vs Oraimo Nova AM |
| | `20261103-oraimo-avis-…` (brouillon) | avis produits Oraimo |
| | `20261016-tesla-roadster-…` | prix Tesla Roadster |
| | `20241220-coca-cola-et-ia` | pub Coca-Cola IA |
| Argent, Afrique | `20240905-djamo-…` | Djamo Orange Money |
| | `20261105-pi-spi-bceao-…` | PI-SPI BCEAO |
| | `20260924-changer-mot-de-passe-wifi-canalbox-…` | changer le mot de passe Wi-Fi CanalBox |
| | `20260908-philippe-simo-vendeur-de-reves` | Philippe Simo vendeur de rêves |
| | `20250101-lacorruption` | petite corruption |
| Travail | `20260326-lareunionpourenparler` | réunion inutile |
| | `20261028-whatsapp-nest-pas-…` | WhatsApp au travail |
| | `20260908-cest-integre-dans-la-maquette` | vérifier un handoff |
| | `20250326-lhistoire-de-gregoire` | écriture inclusive |
| Réseaux, société | `20241022-restons-zen` | rester zen sur les réseaux sociaux |
| | `20250605-facebook-nest-pas-un-grin` | community manager (Facebook n'est pas un grin) |
| | `20250115-l-histoire-danne` | arnaque au faux Brad Pitt |
| | `20251104-josh-vs-aircotedivoire` | Josh Cahill Air Côte d'Ivoire |
| | `20260822-oui-a-lexcision-…` | campagne « oui à l'excision » |

Chevauchements tranchés : les deux billets de 2024 sur la sortie de WordPress (même `searchIntent`
à l'origine), PureMac / MacSai, Sharp / OpenDisplay, les deux billets Omarchy, les deux billets
iPhone Duo, Djamo / PI-SPI, Infinix / avis Oraimo. Chaque paire se lie dans les deux sens.

## Faits mis à jour (avec `updatedAt` et une note datée du 8 novembre 2026)

- **Windows 11 sans compte Microsoft** : couper internet ne suffit plus depuis la 22H2. L'état de
  BYPASSNRO diffère selon les sources. Ajout de l'option compte local de Rufus et de la jonction à
  un domaine (Pro). Les chiffres non sourcés du tableau ont été retirés.
- **Vercel → Cloudflare Pages** : blague « Tonton Donald » rectifiée (bras de fer GIM-UEMOA), quotas
  de l'offre Hobby, builds Pages et Workers Builds, limites de l'option CNAME.
- **PrestaShop** : `lswsctrl purgeall` n'existe pas (retiré du bloc de code), redirections à garder
  au moins un an (Google).
- **Netflix / DisplayLink** : la solution 2 suit maintenant la doc DisplayLink (débrancher tous les
  écrans DisplayLink).
- **Apple Pay / Visa** : matériel de l'attaque, rôle du CDCVM, montant ; mode Express activé par
  défaut.
- **Remote Control, caveman** : alignés sur la documentation actuelle (v4.1.0 de caveman,
  télémétrie du CLI, mesure de JetBrains ; transcription stockée chez Anthropic, tableau Remote
  Control / Dispatch).
- **Adobe XD, Affinity, Koala Sampler, Find Hub, WordPress piraté, site responsive iPhone Duo** :
  informations récentes et sourcées.

## Passe de style

Retouches sur les phrases qui sonnaient « IA » ou grandiloquentes : étiquettes « Réponse courte »,
chutes moralisatrices, rafales de phrases nominales, tirets cadratins en cascade, formules creuses.
Côté anglais, beaucoup de calques du français rendus idiomatiques. Les liens, les faits, les
intertitres (sauf deux slogans dans le billet Vercel), les notes datées et le code n'ont pas bougé.
Les 38 champs `summary` (encadré « Résumé ») ont été réécrits plus simplement.

Les billets les plus retouchés : Vercel → Cloudflare Pages, cPanel → CyberPanel, Windows 11,
Apple Pay, DevTools. Les billets d'opinion ont très peu bougé.

## Vérifications

- `nuxt generate` passe : 144 pages d'article (le brouillon n'est pas généré), un seul H1 par page,
  descriptions de 120 à 160 caractères, aucun lien interne cassé, ancres `#…` valides.
- Liens externes ajoutés ou retouchés : 145 testés, tous répondent (3 refusent les robots avec un
  403, mais s'ouvrent dans un navigateur).
- Le contrat de livraison du skill (`blog_preflight`, note du relecteur à 90/100) n'a pas été
  appliqué : il évalue une page autonome rendue par le skill, sans le template du site (signature,
  « Résumé », JSON-LD), et pousse vers les ajouts refusés en octobre. Le vrai build Nuxt et les
  contrôles ci-dessus l'ont remplacé.

## À trancher par l'auteur

**En priorité**
- `20250115-l-histoire-danne` : le préambule place les escrocs au Bénin. La presse
  ([LBC](https://www.lbc.co.uk/news/brad-pitt-ai-scammer-keanu-reeves/),
  [The Local](https://www.thelocal.fr/20250117/france-launches-probe-into-ai-brad-pitt-scam))
  parle du Nigeria. Aucune source trouvée pour le Bénin.
- `20260417-apple-pay-visa-faille-tap-to-pay` : la vidéo intégrée est celle de Veritasium (avril
  2026, 10 000 $ débités sur l'iPhone de Marques Brownlee,
  [MacRumors](https://www.macrumors.com/2026/04/15/apple-pay-visa-transit-exploit/)). Les
  « 10 000 $ » d'origine venaient de là : la correction d'octobre (1 000 £, recherche de 2021) est
  incomplète.
- `20260519-comment-installer-adobe-xd-en-2026` : la « méthode brute » ressemble à un contournement
  de la facturation.

**Faits à vérifier**
- Omarchy sur Mac : le manuel dit « only OS » sur Mac Intel, la page d'accueil annonce Omarchy M et
  le dual-boot. Version citée 4.0.4, la 4.5.0 est sortie le 5 novembre.
- PI-SPI : « irrévocable » n'apparaît pas sur les pages officielles ; Djamo absent des listes
  officielles des participants ; le communiqué vise les transferts entre personnes physiques.
- Pixel Watch : la fiche Play Store de Wear Notification Helper ne promet pas l'allumage de l'écran
  (la vidéo le montre) ; une option native « Immediately » a été repérée en février 2026.
- Infinix : le nom commercial est « XWatch 3 » (rectangulaire), la montre décrite est ronde.
- Free speech : le juge John Z. Lee est cité à la fois pour l'opinion principale et une opinion
  concurrente.
- Bill Gates : la phrase de Ballmer sur Linux date de 2001, pas de 2005.
- Vercel : « 6 000 build minutes » n'est plus vérifiable ; le tableau compare des requêtes par mois
  à des invocations par jour ; l'offre Hobby interdit l'usage commercial, publicité comprise.
- iCloud+ : « les États-Unis et l'UE ne sont pas concernés » ne figure pas dans la source.
- Géolocalisation des salariés (AirTag, iOS) : selon la
  [documentation Apple](https://support.apple.com/guide/deployment/lock-and-locate-devices-depb980a0be4/web),
  un MDM d'entreprise ne voit la position d'un iPhone qu'en Mode Perdu géré, sur un appareil
  supervisé, et l'utilisateur en est averti. Le billet (et son résumé) pourrait le nuancer.
- DCM6 : pilote nécessaire en HDMI + USB-A, alors que la fiche dit « No drivers » ; le 29 pouces est
  au bureau dans ce billet, à la maison dans le billet Netflix.
- CM555 : « HDMI 2 natif » n'est pas confirmé par la source citée.
- DevTools : le point violet est dans le panneau Network, pas dans la barre de navigation.
- Lemon Studio : le README a évolué depuis le test (FL Studio 10+, VST3).
- Project Fat Loss : `jhouedanou.github.io/projectfatloss` redirige vers `exercise.houedanou.com`.

**Choix de style réversibles**
- Vercel : « le plus grand réseau de data centers du monde » → « l'un des plus grands » ;
  « Latence zéro » → « Moins de latence ».
- Facebook n'est pas un grin : « Et c'est là que le bât blesse. » supprimé.
- MacSai : « CleanMyMac ne peut pas en dire autant. » (à couper ?).
- Câble 240 W et Ghostwriter : retouches sur le texte d'origine de 2024 (récit, morale en gras,
  conclusion).
- Titres qui ont perdu leur humour faute de place : cloner Ubuntu, Windows 11, iCloud+, NETUM.
  Titre un peu raide : « Vérifier un handoff : c'est intégré ? Non. ».

**Divers**
- `20261031-redis-plein-vps-wordpress-vider-limiter` n'a pas d'image de couverture (champ `image`).
- Captures du billet DevTools générées par IA (déjà signalé en octobre).
