<template>
  <div class="themes-index">
    <div class="themes-index__container">
      <header class="themes-index__header">
        <span class="themes-index__eyebrow">— Explorer le journal</span>
        <h1 class="themes-index__title">Les thématiques</h1>
        <p class="themes-index__lede">
          Des chemins éditoriaux pour retrouver les articles par sujet, plutôt que par date de publication.
        </p>
      </header>

      <nav class="themes-index__grid" aria-label="Thématiques du blog">
        <NuxtLink
          v-for="(theme, index) in themes"
          :key="theme.slug"
          :to="`/themes/${theme.slug}`"
          class="theme-index-card"
          :class="{ 'theme-index-card--featured': index === 0 }"
        >
          <span class="theme-index-card__number">0{{ index + 1 }}</span>
          <span class="theme-index-card__label">{{ theme.label }}</span>
          <h2>{{ theme.title }}</h2>
          <p>{{ theme.description }}</p>
          <span class="theme-index-card__link">Explorer <span aria-hidden="true">→</span></span>
        </NuxtLink>
      </nav>

      <footer class="themes-index__footer">
        <NuxtLink to="/" class="themes-index__back">← Retour aux articles</NuxtLink>
        <NuxtLink to="/tags" class="themes-index__back">Voir toutes les étiquettes →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { THEME_DEFINITIONS } from '~/data/editorial.js'

const themes = THEME_DEFINITIONS

useHead({
  title: 'Thématiques — Le Blog de Jean-Luc Houédanou',
  meta: [
    {
      name: 'description',
      content: 'Explorez les articles du blog par thématique : tutoriels, Apple, développement, Afrique numérique et opinions.',
    },
  ],
})
</script>

<style lang="scss" scoped>
.themes-index {
  font-family: var(--font-body);
}

.themes-index__container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
}

.themes-index__header {
  max-width: 760px;
  margin-bottom: 3rem;
}

.themes-index__eyebrow,
.theme-index-card__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.themes-index__eyebrow {
  margin-bottom: 1rem;
}

.themes-index__title {
  margin: 0 0 1.15rem;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.themes-index__lede {
  max-width: 62ch;
  margin: 0;
  font-size: 1.12rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.themes-index__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.theme-index-card {
  position: relative;
  display: flex;
  min-height: 260px;
  flex-direction: column;
  padding: 1.5rem;
  overflow: hidden;
  text-decoration: none;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: var(--card-shadow-hover);
  }

  &--featured {
    grid-row: span 2;
    min-height: 532px;
    background: linear-gradient(150deg, var(--bg-card), var(--accent-soft));
  }
}

.theme-index-card__number {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-faded);
}

.theme-index-card__label {
  margin-bottom: auto;
}

.theme-index-card h2 {
  max-width: 16ch;
  margin: 2rem 0 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.45rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

.theme-index-card p {
  max-width: 48ch;
  margin: 0 0 1.5rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.theme-index-card__link {
  display: inline-flex;
  gap: 0.5rem;
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.themes-index__footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.themes-index__back {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;

  &:hover { color: var(--accent); }
}

@media (max-width: 700px) {
  .themes-index__container { padding: 3rem 1rem 4rem; }
  .themes-index__grid { grid-template-columns: 1fr; }
  .theme-index-card--featured { grid-row: auto; min-height: 320px; }
  .themes-index__footer { flex-direction: column; }
}
</style>
