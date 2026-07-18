import { getArticleTags, slugifyTag } from '~/utils/tags.js'

export const THEME_DEFINITIONS = [
  {
    slug: 'tutoriels',
    label: 'Tutoriels',
    title: 'Tutoriels web, système et outils numériques',
    description: 'Des guides concrets pour installer, migrer, configurer et dépanner les outils que vous utilisez au quotidien.',
    intro: 'Cette sélection rassemble les guides pratiques du blog : administration système, développement web, logiciels créatifs, Windows, Linux et outils d’intelligence artificielle.',
    matchTags: ['tutoriel'],
  },
  {
    slug: 'apple',
    label: 'Apple',
    title: 'Apple, iPhone, Mac et iPad',
    description: 'Analyses, guides et retours d’expérience autour de l’écosystème Apple.',
    intro: 'Mac, iPhone, iPad, Apple Pay et logiciels créatifs : ces articles décortiquent les choix d’Apple, leurs effets concrets et les solutions utiles au quotidien.',
    matchTags: ['apple', 'apple-pay', 'iphone', 'ipad', 'ipados', 'macos'],
  },
  {
    slug: 'developpement',
    label: 'Développement',
    title: 'Développement web et outils de programmation',
    description: 'Retours d’expérience, méthodes et outils pour développer, déployer et maintenir des projets web.',
    intro: 'Nuxt, serveurs, déploiements, agents IA et coulisses du métier : une sélection de billets consacrés à la pratique réelle du développement, avec ses bugs et ses compromis.',
    matchTags: ['dev', 'developpement', 'programmation', 'claude-code', 'ia'],
  },
  {
    slug: 'afrique-numerique',
    label: 'Afrique numérique',
    title: 'Afrique numérique : services, usages et infrastructures',
    description: 'Regards situés sur les usages numériques, les services et les infrastructures en Afrique de l’Ouest.',
    intro: 'Ces articles partent d’expériences vécues en Côte d’Ivoire et en Afrique de l’Ouest pour parler de mobile money, d’hébergement, de services numériques et de souveraineté technique.',
    matchTags: ['afrique'],
  },
  {
    slug: 'opinions',
    label: 'Opinions',
    title: 'Opinions sur la technologie et la société',
    description: 'Des chroniques personnelles sur la technologie, le travail, les réseaux sociaux et les comportements numériques.',
    intro: 'Ici, la technologie sert de point de départ à des réflexions plus larges sur le travail, la société, les marques, les réseaux sociaux et la manière dont nous vivons avec le numérique.',
    matchTags: ['opinion', 'societe'],
  },
]

const TAG_INTRODUCTIONS = {
  tutoriel: 'Des guides étape par étape pour résoudre un problème concret, installer un outil ou sécuriser une configuration.',
  dev: 'Des retours d’expérience sur le développement web, les déploiements, les serveurs et les outils qui font le travail au quotidien.',
  developpement: 'Des billets consacrés à la pratique du développement, à ses outils et aux réalités du terrain.',
  tech: 'Des analyses et retours d’expérience sur les outils, services et usages qui transforment notre quotidien numérique.',
  apple: 'Les articles consacrés à Apple, à ses appareils, à ses services et aux choix techniques qui les accompagnent.',
  afrique: 'Des articles ancrés en Afrique de l’Ouest sur les services numériques, les infrastructures et les usages locaux.',
  opinion: 'Des chroniques personnelles qui interrogent la technologie, les marques, le travail et les comportements en ligne.',
  societe: 'Des réflexions sur la vie numérique, les rapports sociaux et les habitudes que les outils rendent visibles.',
}

export function getThemeDefinition(slug) {
  return THEME_DEFINITIONS.find((theme) => theme.slug === String(slug || '').toLowerCase()) || null
}

export function articleMatchesTheme(article, theme) {
  if (!article || !theme) return false
  const tags = getArticleTags(article).map(slugifyTag)

  return theme.matchTags.some((candidate) => {
    return tags.some((tag) => tag === candidate || tag.startsWith(`${candidate}-`))
  })
}

export function getTagIntroduction(tag) {
  const key = slugifyTag(tag)
  return TAG_INTRODUCTIONS[key] || `Une sélection d’articles consacrés à ${String(tag || '').toLowerCase()}, à partir des expériences et des sujets abordés sur ce blog.`
}

export function getArticleSearchIntent(article) {
  return String(article?.searchIntent || article?.summary || article?.description || '').trim()
}

export function getArticleSearchText(article) {
  return [
    article?.title,
    article?.description,
    article?.summary,
    article?.searchIntent,
    ...getArticleTags(article),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}
