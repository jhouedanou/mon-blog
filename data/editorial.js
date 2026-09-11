import { getArticleTags, slugifyTag } from '../utils/tags.js'

export const THEME_DEFINITIONS = [
  {
    slug: 'tutoriels',
    label: 'Tutoriels',
    title: 'Tutoriels web, système et outils numériques',
    description: 'Des guides concrets pour installer, migrer, configurer et dépanner les outils que vous utilisez au quotidien.',
    intro: 'Cette sélection rassemble les guides pratiques du blog : administration système, développement web, logiciels créatifs, Windows, Linux et outils d’intelligence artificielle.',
    en: {
      label: 'Tutorials',
      title: 'Web, system and digital tool tutorials',
      description: 'Practical guides to install, migrate, configure and troubleshoot the tools you use every day.',
      intro: 'This selection gathers the blog’s hands-on guides: system administration, web development, creative software, Windows, Linux and AI tools.',
    },
    matchTags: ['tutoriel', 'tutorial'],
  },
  {
    slug: 'apple',
    label: 'Apple',
    title: 'Apple, iPhone, Mac et iPad',
    description: 'Analyses, guides et retours d’expérience autour de l’écosystème Apple.',
    intro: 'Mac, iPhone, iPad, Apple Pay et logiciels créatifs : ces articles décortiquent les choix d’Apple, leurs effets concrets et les solutions utiles au quotidien.',
    en: {
      label: 'Apple',
      title: 'Apple, iPhone, Mac and iPad',
      description: 'Analysis, guides and first-hand experience around the Apple ecosystem.',
      intro: 'Mac, iPhone, iPad, Apple Pay and creative software: these articles pick apart Apple’s choices, their real-world effects and the solutions that help day to day.',
    },
    matchTags: ['apple', 'apple-pay', 'iphone', 'ipad', 'ipados', 'macos'],
  },
  {
    slug: 'developpement',
    label: 'Développement',
    title: 'Développement web et outils de programmation',
    description: 'Retours d’expérience, méthodes et outils pour développer, déployer et maintenir des projets web.',
    intro: 'Nuxt, serveurs, déploiements, agents IA et coulisses du métier : une sélection de billets consacrés à la pratique réelle du développement, avec ses bugs et ses compromis.',
    en: {
      label: 'Development',
      title: 'Web development and programming tools',
      description: 'Lessons learned, methods and tools to build, deploy and maintain web projects.',
      intro: 'Nuxt, servers, deployments, AI agents and behind-the-scenes stories: a selection of posts about real-world development, bugs and trade-offs included.',
    },
    matchTags: ['dev', 'developpement', 'development', 'programmation', 'programming', 'claude-code', 'ia', 'ai'],
  },
  {
    slug: 'afrique-numerique',
    label: 'Afrique numérique',
    title: 'Afrique numérique : services, usages et infrastructures',
    description: 'Regards situés sur les usages numériques, les services et les infrastructures en Afrique de l’Ouest.',
    intro: 'Ces articles partent d’expériences vécues en Côte d’Ivoire et en Afrique de l’Ouest pour parler de mobile money, d’hébergement, de services numériques et de souveraineté technique.',
    en: {
      label: 'Digital Africa',
      title: 'Digital Africa: services, habits and infrastructure',
      description: 'Grounded views on digital habits, services and infrastructure in West Africa.',
      intro: 'These articles start from lived experience in Côte d’Ivoire and West Africa to talk about mobile money, hosting, digital services and technical sovereignty.',
    },
    matchTags: ['afrique', 'africa'],
  },
  {
    slug: 'opinions',
    label: 'Opinions',
    title: 'Opinions sur la technologie et la société',
    description: 'Des chroniques personnelles sur la technologie, le travail, les réseaux sociaux et les comportements numériques.',
    intro: 'Ici, la technologie sert de point de départ à des réflexions plus larges sur le travail, la société, les marques, les réseaux sociaux et la manière dont nous vivons avec le numérique.',
    en: {
      label: 'Opinions',
      title: 'Opinions on technology and society',
      description: 'Personal columns on technology, work, social networks and digital behaviour.',
      intro: 'Here, technology is a starting point for broader thoughts on work, society, brands, social networks and the way we live with digital tools.',
    },
    matchTags: ['opinion', 'societe', 'society'],
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

/** Textes d'une thématique dans la langue demandée (le français est la référence). */
export function localizeTheme(theme, locale) {
  if (!theme) return theme
  const lang = typeof locale === 'string' ? locale : locale?.value
  if (lang === 'en' && theme.en) return { ...theme, ...theme.en }
  return theme
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

const TAG_INTRODUCTIONS_EN = {
  tutorial: 'Step-by-step guides to solve a concrete problem, install a tool or lock down a configuration.',
  dev: 'Lessons learned about web development, deployments, servers and the tools that get the job done every day.',
  development: 'Posts about the practice of development, its tools and what it looks like on the ground.',
  tech: 'Analysis and first-hand experience of the tools, services and habits reshaping our digital daily life.',
  apple: 'Articles about Apple, its devices, its services and the technical choices that come with them.',
  africa: 'Articles rooted in West Africa about digital services, infrastructure and local habits.',
  opinion: 'Personal columns questioning technology, brands, work and online behaviour.',
  society: 'Thoughts on digital life, social relations and the habits our tools make visible.',
}

export function getTagIntroduction(tag, locale) {
  const key = slugifyTag(tag)
  const lang = typeof locale === 'string' ? locale : locale?.value
  if (lang === 'en') {
    return TAG_INTRODUCTIONS_EN[key] || `A selection of articles about ${String(tag || '').toLowerCase()}, drawn from the experiences and subjects covered on this blog.`
  }
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
