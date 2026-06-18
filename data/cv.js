// Bilingual CV data — sourced from public/cv_HOUEDANOU.md (FR) and public/cv_HOUEDANOUen.md (EN).
// Update one place to update both locales.

const identity = {
  name: 'Jean-Luc Houédanou',
  photo: '/images/1837389.webp',
  email: 'jeanluc@houedanou.com',
  phone: '+225 07 48 34 82 21',
  portfolio: 'https://jhouedanou.github.io/Curriculum-vitae/',
  github: 'https://github.com/jhouedanou',
  blog: 'https://houedanou.com',
  instagram: '@jlhouedanou',
  twitter: '@afrowebdesigner',
  birthdate: '1984-02-24',
  location: 'Abidjan, Côte d\'Ivoire',
}

const skills = [
  {
    category: { fr: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'VueJS', years: 5, level: 'expert' },
      { name: 'Angular', years: 4, level: 'advanced' },
      { name: 'NuxtJS', years: 3, level: 'intermediate-plus' },
      { name: 'JavaScript', years: 8, level: 'expert' },
      { name: 'HTML5', years: 12, level: 'expert' },
      { name: 'CSS3', years: 12, level: 'expert' },
      { name: 'Responsive Design', years: 8, level: 'advanced' },
    ],
  },
  {
    category: { fr: 'Backend', en: 'Backend' },
    items: [
      { name: 'PHP', years: 10, level: 'expert' },
      { name: 'Laravel', years: 5, level: 'advanced' },
      { name: 'Filament', years: 2, level: 'intermediate' },
      { name: 'Supabase', years: 2, level: 'intermediate' },
      { name: 'MySQL', years: 8, level: 'advanced' },
      { name: 'REST APIs', years: 6, level: 'advanced' },
      { name: 'Linux Server Admin', years: 7, level: 'advanced' },
    ],
  },
  {
    category: { fr: 'Design & outils', en: 'Design & Tools' },
    items: [
      { name: 'Adobe XD', years: 6, level: 'expert' },
      { name: 'Figma', years: 4, level: 'advanced' },
      { name: 'Affinity Suite', years: 5, level: 'advanced' },
      { name: 'UI/UX Design', years: 8, level: 'expert' },
      { name: { fr: 'Design graphique', en: 'Graphic Design' }, years: 10, level: 'advanced' },
      { name: 'DaVinci Resolve', years: 3, level: 'intermediate-plus' },
    ],
  },
  {
    category: { fr: 'DevOps & Infra', en: 'DevOps & Infra' },
    items: [
      { name: 'GitLab CI/CD', years: 3, level: 'intermediate-plus' },
      { name: 'Docker', years: 3, level: 'intermediate-plus' },
      { name: { fr: 'Clusters BDD (PostgreSQL BDR, MariaDB Galera)', en: 'DB clusters (PostgreSQL BDR, MariaDB Galera)' }, years: 4, level: 'intermediate-plus' },
      { name: { fr: 'Sécurité web', en: 'Web Security' }, years: 7, level: 'advanced' },
    ],
  },
  {
    category: { fr: 'Gestion de projet', en: 'Project Management' },
    items: [
      { name: 'SCRUM', years: 6, level: 'advanced' },
      { name: 'Kanban', years: 5, level: 'advanced' },
      { name: 'Agile', years: 6, level: 'advanced' },
      { name: 'Jira', years: 4, level: 'intermediate-plus' },
      { name: { fr: 'Leadership d\'équipe', en: 'Team Leadership' }, years: 5, level: 'advanced' },
      { name: { fr: 'Relation client', en: 'Client Relations' }, years: 12, level: 'expert' },
      { name: { fr: 'Planification stratégique', en: 'Strategic Planning' }, years: 5, level: 'advanced' },
    ],
  },
]

const experience = [
  {
    period: { fr: 'Juin 2019 — aujourd\'hui', en: 'June 2019 — present' },
    role: { fr: 'Directeur solutions digitales', en: 'Digital Solutions Director' },
    company: 'Big Five Solutions',
    location: 'Abidjan, Côte d\'Ivoire',
    summary: {
      fr: 'Direction du développement et de l\'intégration de solutions web full-stack et plateformes digitales pour une clientèle diversifiée, alliant vision stratégique et expertise technique.',
      en: 'Leads development and integration of full-stack web solutions and digital platforms for diverse clientele, combining strategic vision and technical expertise.',
    },
    achievements: {
      fr: [
        'Développement et lancement de 17+ projets web majeurs (Vodacom, CASTEL Afrique, CIPREL), +40% de trafic en moyenne',
        'Supervision et mentoring d\'une équipe de 2 développeurs/designers — satisfaction client 95 %, livraison à 100 % dans les délais',
        'Gestion et sécurisation de 8 serveurs Linux (CentOS, Ubuntu) — -90 % de downtime',
        'Stack moderne (VueJS, Supabase, Filament) — +60 % de performance applicative',
      ],
      en: [
        'Launched 17+ major web projects (Vodacom, CASTEL Africa, CIPREL), averaging +40% client traffic',
        'Mentored a team of 2 developers/designers — 95% client satisfaction, 100% on-time delivery',
        'Secured & maintained 8 Linux servers (CentOS, Ubuntu) — -90% downtime',
        'Modern stack (VueJS, Supabase, Filament) — +60% application performance',
      ],
    },
  },
  {
    period: { fr: 'Juin 2017 — Juin 2019 (2 ans)', en: 'June 2017 — June 2019 (2 yrs)' },
    role: { fr: 'Head of Design', en: 'Head of Design' },
    company: 'WeDev Group',
    location: 'Abidjan, Côte d\'Ivoire',
    summary: {
      fr: 'Direction de la stratégie design et supervision de la conception d\'interfaces pour renforcer l\'identité de marque.',
      en: 'Led design strategy and oversaw UI design to strengthen brand identity.',
    },
    achievements: {
      fr: [
        'Direction créative de 25+ projets web et mobiles, approche user-centric',
        'Guidelines design et systèmes visuels cohérents adoptés par l\'équipe',
        'Stratégie de communication visuelle : +35 % de reconnaissance de marque',
      ],
      en: [
        'Creative direction on 25+ web and mobile projects, user-centric approach',
        'Design guidelines and visual systems adopted across the team',
        'Visual communication strategy: +35% brand recognition',
      ],
    },
  },
  {
    period: { fr: 'Février — Juin 2017 (5 mois)', en: 'February — June 2017 (5 months)' },
    role: { fr: 'Responsable communication digitale', en: 'Digital Communications Manager' },
    company: 'Adonai Agri Batis',
    location: 'Abidjan, Côte d\'Ivoire',
    summary: {
      fr: 'Développement et exécution de la stratégie de communication digitale.',
      en: 'Built and ran the digital communication strategy.',
    },
    achievements: {
      fr: [
        'Refonte du site corporate — +20 % de conversion, -30 % de bounce',
        '+150 % d\'engagement social en 4 mois',
        'Framework de communication digitale — +45 % d\'efficacité des campagnes',
      ],
      en: [
        'Full corporate website redesign — +20% conversion, -30% bounce rate',
        '+150% social engagement in 4 months',
        'Digital communication framework — +45% campaign efficiency',
      ],
    },
  },
  {
    period: { fr: 'Juillet 2016 — Janvier 2017 (7 mois)', en: 'July 2016 — January 2017 (7 months)' },
    role: { fr: 'Chargé de projet web et communication digitale', en: 'Web Project & Digital Communications Lead' },
    company: 'CIFIDE',
    location: 'Abidjan, Côte d\'Ivoire',
    summary: {
      fr: 'Supervision des projets web et coordination des campagnes digitales.',
      en: 'Oversaw web projects and digital campaign coordination.',
    },
    achievements: {
      fr: [
        'Stratégie de contenu — +35 % de trafic organique en 6 mois',
        'Gestion simultanée de 8 projets — 100 % livrés dans les délais',
        'Portefeuille de 12 clients — 85 % de rétention',
      ],
      en: [
        'Content strategy — +35% organic traffic in 6 months',
        'Managed 8 simultaneous projects — 100% on-time delivery',
        '12-client portfolio — 85% retention',
      ],
    },
  },
  {
    period: { fr: 'Août 2013 — Mars 2016 (3 ans 2 mois)', en: 'August 2013 — March 2016 (3 yrs 2 mo)' },
    role: { fr: 'Webmaster', en: 'Webmaster' },
    company: 'CERAP (ex-Inades)',
    location: 'Abidjan, Côte d\'Ivoire',
    summary: {
      fr: 'Gestion technique et éditoriale du site web institutionnel.',
      en: 'Technical and editorial management of the institutional website.',
    },
    achievements: {
      fr: [
        'Migration vers un CMS moderne — -75 % de délai de mise en ligne',
        'Sécurité renforcée — 100 % d\'incidents éliminés',
        '99 % de temps de disponibilité',
      ],
      en: [
        'Migration to a modern CMS — -75% time-to-publish',
        'Hardened security — 100% incident reduction',
        '99% uptime',
      ],
    },
  },
]

const previousRoles = [
  {
    role: { fr: 'Responsable du site web', en: 'Website Manager' },
    company: 'Electoral Reform International Services',
    period: { fr: 'Jan—Juin 2013', en: 'Jan—June 2013' },
  },
  {
    role: { fr: 'Consultant formateur TIC', en: 'ICT Trainer Consultant' },
    company: 'Internews Europe',
    period: { fr: 'Mai 2012', en: 'May 2012' },
  },
  {
    role: { fr: 'Web designer & infographiste', en: 'Web & Graphic Designer' },
    company: 'Chrisalys Group',
    period: { fr: 'Mai—Déc 2012', en: 'May—Dec 2012' },
  },
  {
    role: { fr: 'Responsable associé e-commerce', en: 'Associate Manager E-commerce' },
    company: 'Groupe Kamit Communications Inc, Montréal',
    period: { fr: 'Sept 2009 — Avr 2011', en: 'Sep 2009 — Apr 2011' },
  },
]

const education = [
  {
    period: '2008 — 2009',
    degree: {
      fr: 'Certificat en gestion de l\'information et des systèmes',
      en: 'Certificate in Information and Systems Management',
    },
    school: { fr: 'Université de Sherbrooke, Canada', en: 'University of Sherbrooke, Canada' },
  },
  {
    period: '2007 — 2008',
    degree: { fr: 'Master en gestion du commerce électronique', en: 'Master\'s in E-Commerce Management' },
    school: { fr: 'Université de Sherbrooke, Canada', en: 'University of Sherbrooke, Canada' },
  },
  {
    period: '2002 — 2006',
    degree: { fr: 'Baccalauréat en administration des affaires', en: 'Bachelor\'s in Business Administration' },
    school: {
      fr: 'Université Canadienne des Arts, Sciences et Management, Côte d\'Ivoire',
      en: 'Canadian University of Arts, Sciences and Management, Côte d\'Ivoire',
    },
  },
  {
    period: '1995 — 2002',
    degree: { fr: 'Baccalauréat en économie et sciences', en: 'Bachelor\'s in Economics and Science' },
    school: { fr: 'Collège Jean Mermoz, Côte d\'Ivoire', en: 'Jean Mermoz College, Côte d\'Ivoire' },
  },
]

const projects = [
  { name: 'SoboaFoot', url: 'https://soboafoot.com/', role: { fr: 'Full-stack', en: 'Full-stack' }, stack: 'Tailwind, Alpine.js, Service Worker', desc: { fr: 'Plateforme de pronostics CAN 2025 avec classement, points et géolocalisation.', en: 'CAN 2025 prediction platform with leaderboard, points & geo-located partners.' } },
  { name: 'Eat Is Family', url: 'https://www.eatisfamily.fr/', role: { fr: 'Front-end', en: 'Front-end' }, stack: 'NuxtJS, WordPress API, Figma', desc: { fr: 'Intégration Figma → NuxtJS + CMS headless WordPress, restauration événementielle.', en: 'Figma → NuxtJS integration + headless WordPress for an event catering company.' } },
  { name: 'Vodacom', url: 'https://vodamedia.co.za/txtengage/', role: { fr: 'Lead dev', en: 'Lead developer' }, stack: 'VueJS, Responsive', desc: { fr: 'Landing page Vodacom Afrique du Sud.', en: 'Vodacom South Africa landing page.' } },
  { name: 'CASTEL Afrique', url: 'https://castel-afrique.com', role: { fr: 'Chef de projet & dev', en: 'PM & developer' }, stack: 'Adobe XD → Web', desc: { fr: 'Intégration complète de maquettes Adobe XD.', en: 'Full Adobe XD-to-web integration.' } },
  { name: 'Dinor App', url: 'https://new.dinorapp.com/', role: { fr: 'Architecte full-stack', en: 'Full-stack architect' }, stack: 'Filament, VueJS/NuxtJS, Flutter', desc: { fr: 'Plateforme multi-plateformes de recettes & astuces culinaires.', en: 'Multi-platform recipes & culinary tips platform.' } },
  { name: 'CIPREL', url: 'https://ciprel.ci', role: { fr: 'Front-end', en: 'Front-end' }, stack: 'Pixel-perfect, perf opt', desc: { fr: 'Site responsive optimisé performance.', en: 'Responsive performance-optimised website.' } },
  { name: 'BigFive360', url: 'https://bigfive360.com', role: { fr: 'Front-end', en: 'Front-end' }, stack: 'HTML5, CSS3, JS', desc: { fr: 'Visite virtuelle 360°.', en: '360° virtual tour service.' } },
  { name: 'Timeo RH', url: 'https://timeo-rh.vercel.app/', role: { fr: 'UI/UX & full-stack', en: 'UI/UX & full-stack' }, stack: 'Figma → VueJS', desc: { fr: 'Conception Figma → frontend VueJS pour dashboard RH.', en: 'Figma conception → VueJS frontend HR dashboard.' } },
  { name: 'Dinor Calorie Counter', url: 'https://dinor-calorie-counter-alt.vercel.app/', role: { fr: 'Full-stack', en: 'Full-stack' }, stack: 'React, Next.js, TypeScript', desc: { fr: 'App de suivi de calories.', en: 'Calorie tracking app.' } },
]

const profile = {
  fr: [
    'Développeur web expérimenté — plus de 12 ans en développement full-stack, design UI/UX et gestion de projets digitaux.',
    'Spécialiste front-end (VueJS, Angular). Expertise technique + vision stratégique pour des solutions web performantes et mesurables.',
    'Passionné d\'innovation et de leadership d\'équipe. Je transforme des défis complexes en opportunités de croissance.',
  ],
  en: [
    'Experienced web developer — 12+ years in full-stack development, UI/UX design and digital project management.',
    'Front-end specialist (VueJS, Angular). Technical expertise plus strategic vision to ship high-performance, measurable web solutions.',
    'Passionate about innovation and team leadership. I turn complex challenges into growth opportunities.',
  ],
}

const languages = [
  { name: { fr: 'Français', en: 'French' }, level: { fr: 'Langue maternelle', en: 'Native' } },
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Courant', en: 'Fluent' } },
]

const levelLabels = {
  expert: { fr: 'Expert', en: 'Expert' },
  advanced: { fr: 'Avancé', en: 'Advanced' },
  'intermediate-plus': { fr: 'Intermédiaire+', en: 'Intermediate+' },
  intermediate: { fr: 'Intermédiaire', en: 'Intermediate' },
}

const labels = {
  fr: {
    title: 'Curriculum vitæ',
    subtitle: 'Jean-Luc Houédanou — développeur web & directeur solutions digitales',
    profile: 'Profil',
    experience: 'Expérience professionnelle',
    previousRoles: 'Expériences antérieures',
    education: 'Parcours académique',
    skills: 'Compétences',
    projects: 'Projets clés',
    languages: 'Langues',
    contact: 'Contact',
    portfolio: 'Portfolio',
    download: 'Télécharger en .md',
    print: 'Imprimer',
    keyAchievements: 'Réalisations clés',
    years: 'ans',
    yearsSingular: 'an',
    based: 'Basé à',
    seeProject: 'Voir le projet',
    switchLang: 'English',
  },
  en: {
    title: 'Résumé',
    subtitle: 'Jean-Luc Houédanou — web developer & digital solutions director',
    profile: 'Profile',
    experience: 'Professional experience',
    previousRoles: 'Previous experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Key projects',
    languages: 'Languages',
    contact: 'Contact',
    portfolio: 'Portfolio',
    download: 'Download .md',
    print: 'Print',
    keyAchievements: 'Key achievements',
    years: 'yrs',
    yearsSingular: 'yr',
    based: 'Based in',
    seeProject: 'Visit project',
    switchLang: 'Français',
  },
}

const sourceFiles = {
  fr: '/cv_HOUEDANOU.md',
  en: '/cv_HOUEDANOUen.md',
}

export {
  identity,
  profile,
  experience,
  previousRoles,
  education,
  skills,
  projects,
  languages,
  levelLabels,
  labels,
  sourceFiles,
}

export default {
  identity,
  profile,
  experience,
  previousRoles,
  education,
  skills,
  projects,
  languages,
  levelLabels,
  labels,
  sourceFiles,
}
