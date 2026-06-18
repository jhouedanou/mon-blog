<template>
  <div class="cv-wrapper">
    <div class="cv-container">
      <!-- Toolbar : locale toggle + actions -->
      <div class="cv-toolbar" role="toolbar" :aria-label="lang === 'fr' ? 'Outils du CV' : 'CV tools'">
        <div class="cv-toolbar__lang" role="group" :aria-label="lang === 'fr' ? 'Langue' : 'Language'">
          <button
            class="cv-toolbar__lang-btn"
            :class="{ 'is-active': lang === 'fr' }"
            :aria-pressed="lang === 'fr'"
            @click="setLang('fr')"
          >FR</button>
          <button
            class="cv-toolbar__lang-btn"
            :class="{ 'is-active': lang === 'en' }"
            :aria-pressed="lang === 'en'"
            @click="setLang('en')"
          >EN</button>
        </div>

        <div class="cv-toolbar__actions">
          <a
            :href="sourceFiles[lang]"
            target="_blank"
            rel="noopener"
            class="cv-toolbar__action"
            :aria-label="l.download"
          >
            <i class="material-icons" aria-hidden="true">download</i>
            <span>{{ l.download }}</span>
          </a>
          <button class="cv-toolbar__action" @click="print" :aria-label="l.print">
            <i class="material-icons" aria-hidden="true">print</i>
            <span>{{ l.print }}</span>
          </button>
        </div>
      </div>

      <!-- Header -->
      <header class="cv-header">
        <div class="cv-header__photo">
          <img :src="identity.photo" :alt="identity.name" width="120" height="120" />
        </div>
        <div class="cv-header__intro">
          <span class="cv-header__eyebrow">— {{ l.title }}</span>
          <h1 class="cv-header__name">{{ identity.name }}</h1>
          <p class="cv-header__subtitle">{{ l.subtitle }}</p>
          <p class="cv-header__location">
            <i class="material-icons" aria-hidden="true">place</i>
            {{ l.based }} {{ identity.location }}
          </p>
        </div>
      </header>

      <div class="cv-grid">
        <!-- ===== Main column ===== -->
        <main class="cv-main">
          <!-- Profile -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-profile`">
            <h2 :id="`cv-${lang}-profile`" class="cv-section__title">{{ l.profile }}</h2>
            <div class="cv-profile">
              <p v-for="(line, i) in profile[lang]" :key="i">{{ line }}</p>
            </div>
          </section>

          <!-- Experience -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-experience`">
            <h2 :id="`cv-${lang}-experience`" class="cv-section__title">{{ l.experience }}</h2>
            <ol class="cv-experience">
              <li v-for="(job, i) in experience" :key="i" class="cv-experience__item">
                <div class="cv-experience__head">
                  <time class="cv-experience__period">{{ job.period[lang] }}</time>
                  <div>
                    <h3 class="cv-experience__role">{{ job.role[lang] }}</h3>
                    <p class="cv-experience__company">
                      <strong>{{ job.company }}</strong> · {{ job.location }}
                    </p>
                  </div>
                </div>
                <p class="cv-experience__summary">{{ job.summary[lang] }}</p>
                <div class="cv-experience__achievements" v-if="job.achievements?.[lang]?.length">
                  <span class="cv-experience__label">{{ l.keyAchievements }}</span>
                  <ul role="list">
                    <li v-for="(a, j) in job.achievements[lang]" :key="j">{{ a }}</li>
                  </ul>
                </div>
              </li>
            </ol>
          </section>

          <!-- Previous roles -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-previous`">
            <h2 :id="`cv-${lang}-previous`" class="cv-section__title">{{ l.previousRoles }}</h2>
            <ul class="cv-previous" role="list">
              <li v-for="(p, i) in previousRoles" :key="i">
                <strong>{{ p.role[lang] }}</strong>
                <span> · {{ p.company }}</span>
                <time class="cv-previous__period"> · {{ p.period[lang] }}</time>
              </li>
            </ul>
          </section>

          <!-- Education -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-education`">
            <h2 :id="`cv-${lang}-education`" class="cv-section__title">{{ l.education }}</h2>
            <ol class="cv-education">
              <li v-for="(ed, i) in education" :key="i">
                <time class="cv-education__period">{{ ed.period }}</time>
                <div>
                  <h3 class="cv-education__degree">{{ pickLocalized(ed.degree) }}</h3>
                  <p class="cv-education__school">{{ pickLocalized(ed.school) }}</p>
                </div>
              </li>
            </ol>
          </section>

          <!-- Skills -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-skills`">
            <h2 :id="`cv-${lang}-skills`" class="cv-section__title">{{ l.skills }}</h2>
            <div class="cv-skills">
              <div v-for="(cat, i) in skills" :key="i" class="cv-skills__group">
                <h3 class="cv-skills__cat">{{ cat.category[lang] }}</h3>
                <ul class="cv-skills__list" role="list">
                  <li v-for="(item, j) in cat.items" :key="j" class="cv-skill" :class="`cv-skill--${item.level}`">
                    <span class="cv-skill__name">{{ pickLocalized(item.name) }}</span>
                    <span class="cv-skill__meta">
                      <span class="cv-skill__years">{{ item.years }} {{ item.years > 1 ? l.years : l.yearsSingular }}</span>
                      <span class="cv-skill__level">{{ levelLabels[item.level][lang] }}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Projects -->
          <section class="cv-section" :aria-labelledby="`cv-${lang}-projects`">
            <h2 :id="`cv-${lang}-projects`" class="cv-section__title">{{ l.projects }}</h2>
            <ul class="cv-projects" role="list">
              <li v-for="(p, i) in projects" :key="i" class="cv-project">
                <div class="cv-project__head">
                  <h3 class="cv-project__name">
                    <a :href="p.url" target="_blank" rel="noopener">
                      {{ p.name }}
                      <i class="material-icons" aria-hidden="true">north_east</i>
                    </a>
                  </h3>
                  <span class="cv-project__role">{{ p.role[lang] }}</span>
                </div>
                <p class="cv-project__desc">{{ p.desc[lang] }}</p>
                <p class="cv-project__stack">{{ p.stack }}</p>
              </li>
            </ul>
          </section>
        </main>

        <!-- ===== Sidebar ===== -->
        <aside class="cv-side" :aria-label="lang === 'fr' ? 'Coordonnées' : 'Contact details'">
          <section class="cv-side__section">
            <h2 class="cv-side__title">{{ l.contact }}</h2>
            <ul class="cv-contact" role="list">
              <li>
                <i class="material-icons" aria-hidden="true">mail</i>
                <a :href="`mailto:${identity.email}`">{{ identity.email }}</a>
              </li>
              <li>
                <i class="material-icons" aria-hidden="true">call</i>
                <a :href="`tel:${identity.phone.replace(/\s/g, '')}`">{{ identity.phone }}</a>
              </li>
              <li>
                <i class="material-icons" aria-hidden="true">language</i>
                <a :href="identity.portfolio" target="_blank" rel="noopener">{{ l.portfolio }}</a>
              </li>
              <li>
                <i class="material-icons" aria-hidden="true">code</i>
                <a :href="identity.github" target="_blank" rel="noopener">GitHub</a>
              </li>
              <li>
                <i class="material-icons" aria-hidden="true">article</i>
                <a :href="identity.blog" target="_blank" rel="noopener">{{ identity.blog.replace('https://', '') }}</a>
              </li>
            </ul>
          </section>

          <section class="cv-side__section">
            <h2 class="cv-side__title">{{ l.languages }}</h2>
            <ul class="cv-languages" role="list">
              <li v-for="(lng, i) in languages" :key="i">
                <span class="cv-languages__name">{{ lng.name[lang] }}</span>
                <span class="cv-languages__level">{{ lng.level[lang] }}</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>

      <footer class="cv-footer">
        <NuxtLink to="/" class="cv-back">
          <span class="cv-back__arrow">←</span>
          <span>{{ $t('backToArticles') }}</span>
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  identity, profile, experience, previousRoles, education,
  skills, projects, languages, levelLabels, labels, sourceFiles,
} from '~/data/cv.js'

const lang = ref('fr')

function setLang(v) {
  lang.value = v
  if (typeof window !== 'undefined') {
    localStorage.setItem('cv-lang', v)
    history.replaceState(null, '', `?lang=${v}`)
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get('lang')
  const saved = localStorage.getItem('cv-lang')
  const initial = (fromUrl === 'en' || fromUrl === 'fr')
    ? fromUrl
    : (saved === 'en' || saved === 'fr')
      ? saved
      : (navigator.language?.startsWith('en') ? 'en' : 'fr')
  lang.value = initial
})

const l = computed(() => labels[lang.value])

function pickLocalized(value) {
  if (value && typeof value === 'object' && (value.fr || value.en)) {
    return value[lang.value] || value.fr || value.en
  }
  return value
}

function print() {
  window.print()
}

useHead(() => ({
  title: lang.value === 'fr'
    ? 'CV — Jean-Luc Houédanou'
    : 'Résumé — Jean-Luc Houédanou',
  meta: [
    {
      name: 'description',
      content: lang.value === 'fr'
        ? 'Curriculum vitæ de Jean-Luc Houédanou — développeur web full-stack et directeur solutions digitales basé à Abidjan.'
        : 'Résumé of Jean-Luc Houédanou — full-stack web developer and digital solutions director based in Abidjan.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: lang.value === 'fr' ? 'CV — Jean-Luc Houédanou' : 'Résumé — Jean-Luc Houédanou' },
    { property: 'og:type', content: 'profile' },
  ],
  htmlAttrs: {
    lang: lang.value,
  },
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: identity.name,
        email: `mailto:${identity.email}`,
        telephone: identity.phone,
        url: identity.portfolio,
        address: { '@type': 'PostalAddress', addressLocality: 'Abidjan', addressCountry: 'CI' },
        sameAs: [identity.github, identity.blog],
        jobTitle: lang.value === 'fr' ? 'Directeur solutions digitales' : 'Digital Solutions Director',
      }),
    },
  ],
}))
</script>

<style lang="scss" scoped>
.cv-wrapper {
  background: transparent;
  font-family: var(--font-body);
  color: var(--text-primary);
  line-height: 1.65;
}

.cv-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* ==========================================
   Toolbar
   ========================================== */
.cv-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  flex-wrap: wrap;
}

.cv-toolbar__lang {
  display: inline-flex;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}

.cv-toolbar__lang-btn {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  padding: 0.5rem 0.9rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  & + & {
    border-left: 1px solid var(--border-color);
  }

  &:hover {
    color: var(--accent);
  }

  &.is-active {
    background: var(--accent);
    color: #0a0a0f;
    box-shadow: inset 0 0 0 1px var(--accent);
  }
}

.cv-toolbar__actions {
  display: inline-flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cv-toolbar__action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;

  .material-icons {
    font-size: 0.95rem;
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: var(--neon-glow-teal);
    transform: translateY(-1px);
  }
}

/* ==========================================
   Header
   ========================================== */
.cv-header {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.cv-header__photo {
  position: relative;
  flex-shrink: 0;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
    box-shadow: var(--neon-glow-teal);
  }
}

.cv-header__intro {
  flex: 1;
  min-width: 0;
}

.cv-header__eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.cv-header__name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.02;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.cv-header__subtitle {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin: 0 0 0.85rem;
  max-width: 600px;
}

.cv-header__location {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin: 0;

  .material-icons {
    font-size: 1rem;
    color: var(--accent-magenta);
  }
}

/* ==========================================
   Grid layout
   ========================================== */
.cv-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 3rem;
}

.cv-main {
  min-width: 0;
}

/* ==========================================
   Section primitives
   ========================================== */
.cv-section {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.cv-section__title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.55rem, 2.4vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin: 0 0 1.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.45em;
    bottom: 0.3em;
    width: 3px;
    background: var(--accent);
    border-radius: 2px;
  }
}

/* ==========================================
   Profile
   ========================================== */
.cv-profile p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 0.85rem;

  &:last-child { margin-bottom: 0; }
}

/* ==========================================
   Experience
   ========================================== */
.cv-experience {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-experience__item {
  position: relative;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);
  }
}

.cv-experience__head {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  margin-bottom: 0.85rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.cv-experience__period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  padding-top: 0.3rem;
}

.cv-experience__role {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  margin: 0 0 0.2rem;
}

.cv-experience__company {
  font-family: var(--font-sans);
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin: 0;

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
}

.cv-experience__summary {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0 0 1rem;
}

.cv-experience__achievements {
  border-top: 1px dashed var(--border-color);
  padding-top: 1rem;
}

.cv-experience__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent-magenta);
  margin-bottom: 0.65rem;
}

.cv-experience__achievements ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-experience__achievements li {
  position: relative;
  padding: 0.25rem 0 0.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--text-secondary);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75em;
    width: 12px;
    height: 1px;
    background: var(--accent);
  }
}

/* ==========================================
   Previous roles
   ========================================== */
.cv-previous {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: var(--font-sans);
}

.cv-previous li {
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.95rem;
  color: var(--text-secondary);

  &:last-child { border-bottom: none; }

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
}

.cv-previous__period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

/* ==========================================
   Education
   ========================================== */
.cv-education {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-education li {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child { border-bottom: none; }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}

.cv-education__period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  padding-top: 0.15rem;
}

.cv-education__degree {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  margin: 0 0 0.2rem;
}

.cv-education__school {
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin: 0;
}

/* ==========================================
   Skills
   ========================================== */
.cv-skills {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.cv-skills__group {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  padding: 1.25rem 1.25rem 1rem;
}

.cv-skills__cat {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin: 0 0 0.85rem;
}

.cv-skills__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-skill {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.45rem 0;
  border-bottom: 1px dashed var(--border-color);

  &:last-child { border-bottom: none; }
}

.cv-skill__name {
  font-family: var(--font-sans);
  font-size: 0.92rem;
  color: var(--text-primary);
  font-weight: 500;
}

.cv-skill__meta {
  display: inline-flex;
  align-items: baseline;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.cv-skill__years {
  color: var(--text-muted);
}

.cv-skill__level {
  padding: 0.1rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: 2px;
  text-transform: uppercase;
}

.cv-skill--expert .cv-skill__level { color: var(--accent); }
.cv-skill--advanced .cv-skill__level { color: var(--accent-magenta); }
.cv-skill--intermediate-plus .cv-skill__level { color: var(--accent-violet); }
.cv-skill--intermediate .cv-skill__level { color: var(--accent-amber); }

/* ==========================================
   Projects
   ========================================== */
.cv-projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.cv-project {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  padding: 1.1rem 1.25rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);
    transform: translateY(-2px);
  }
}

.cv-project__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.cv-project__name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin: 0;

  a {
    color: var(--text-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    transition: color 0.25s ease;

    .material-icons {
      font-size: 0.85rem;
      color: var(--accent);
    }

    &:hover {
      color: var(--accent);
    }
  }
}

.cv-project__role {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent-magenta);
}

.cv-project__desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 0 0.5rem;
}

.cv-project__stack {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin: 0;
}

/* ==========================================
   Sidebar
   ========================================== */
.cv-side {
  position: sticky;
  top: 90px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cv-side__section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  padding: 1.25rem 1.4rem;
}

.cv-side__title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin: 0 0 1rem;
}

.cv-contact {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.45rem 0;
    border-bottom: 1px dashed var(--border-color);
    font-size: 0.88rem;
    color: var(--text-secondary);

    &:last-child { border-bottom: none; }

    .material-icons {
      font-size: 1rem;
      color: var(--accent);
      flex-shrink: 0;
    }

    a {
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.2s ease;
      word-break: break-all;

      &:hover {
        color: var(--accent);
      }
    }
  }
}

.cv-languages {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.55rem 0;
    border-bottom: 1px dashed var(--border-color);

    &:last-child { border-bottom: none; }
  }
}

.cv-languages__name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.cv-languages__level {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
}

/* ==========================================
   Footer
   ========================================== */
.cv-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.cv-back {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 0.85rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition: all 0.25s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    box-shadow: var(--neon-glow-teal);

    .cv-back__arrow {
      transform: translateX(-4px);
    }
  }
}

.cv-back__arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 980px) {
  .cv-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cv-side {
    position: static;
    order: -1;
  }
}

@media (max-width: 640px) {
  .cv-container {
    padding: 2rem 1rem 3rem;
  }

  .cv-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .cv-projects {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   Print styles — drop neon, keep readable
   ========================================== */
@media print {
  :deep(body)::before,
  :deep(body)::after { display: none !important; }

  .cv-toolbar,
  .cv-footer { display: none !important; }

  .cv-wrapper {
    color: #000;
    background: #fff;
  }

  .cv-container { max-width: none; padding: 0; }

  .cv-grid { gap: 1.5rem; }

  .cv-section__title::before { background: #000 !important; }

  .cv-header__photo img,
  .cv-experience__item,
  .cv-skills__group,
  .cv-project,
  .cv-side__section {
    box-shadow: none !important;
    border-color: #000 !important;
  }

  .cv-header__name,
  .cv-section__title,
  .cv-experience__role,
  .cv-education__degree,
  .cv-project__name a,
  .cv-languages__name {
    color: #000 !important;
  }

  .cv-header__eyebrow,
  .cv-experience__period,
  .cv-skills__cat,
  .cv-side__title,
  .cv-languages__level {
    color: #555 !important;
  }
}
</style>
