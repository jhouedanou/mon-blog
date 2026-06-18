<template>
  <div class="about-wrapper">
    <article class="about-container">
      <header class="about-header">
        <div class="about-header__avatar">
          <img src="/images/1837389.webp" alt="Jean-Luc Houédanou" width="120" height="120" />
        </div>
        <h1 class="about-header__title">Jean-Luc Houédanou</h1>
        <p class="about-header__subtitle">Développeur web full-stack & Administrateur systèmes</p>
        <p class="about-header__location">
          <i class="material-icons">location_on</i> Abidjan, Côte d'Ivoire
        </p>
      </header>

      <div class="about-content">
        <section class="about-section">
          <h2>Qui suis-je ?</h2>
          <p>
            Jean-Luc Houédanou est développeur web full-stack et administrateur systèmes basé à Abidjan, Côte d'Ivoire. Titulaire d'un Master en gestion du commerce électronique et d'un certificat en gestion de l'information et des systèmes (Université de Sherbrooke, Canada), il cumule plus de 15 ans d'expérience dans le développement web, l'intégration front-end et l'administration serveur.
          </p>
          <p>
            Blogueur tech sur houedanou.com, il y partage ses chroniques sur l'innovation numérique, la transformation digitale en Afrique et ses pérégrinations technologiques.
          </p>
          <p>
            Passionné de photographie 360 degrés et de visite virtuelle à ses heures perdues, il capture des panoramas immersifs depuis les bords de la lagune Ébrié.
          </p>
        </section>

        <section class="about-section about-skills">
          <h2>Compétences</h2>
          <div class="about-skills__grid">
            <div class="about-skill">
              <i class="material-icons">code</i>
              <h3>Développement web</h3>
              <p>Full-stack, intégration front-end, Vue.js, Nuxt, Node.js</p>
            </div>
            <div class="about-skill">
              <i class="material-icons">dns</i>
              <h3>Administration systèmes</h3>
              <p>Serveurs Linux, cPanel, CyberPanel, VPS, hébergement</p>
            </div>
            <div class="about-skill">
              <i class="material-icons">edit</i>
              <h3>Blogging tech</h3>
              <p>Innovation numérique, transformation digitale en Afrique</p>
            </div>
            <div class="about-skill">
              <i class="material-icons">360</i>
              <h3>Photographie 360° & Visite virtuelle</h3>
              <p>Panoramas immersifs, visites virtuelles interactives</p>
            </div>
          </div>
        </section>

        <section class="about-section about-contact">
          <h2>Me retrouver</h2>
          <div class="about-contact__links">
            <a href="https://houedanou.com" target="_blank" rel="noopener noreferrer" class="about-contact__link">
              <i class="material-icons">language</i>
              houedanou.com
            </a>
            <a href="/feed.xml" target="_blank" class="about-contact__link">
              <i class="material-icons">rss_feed</i>
              Flux RSS
            </a>
            <a href="https://github.com/jhouedanou" target="_blank" rel="noopener noreferrer" class="about-contact__link">
              <i class="material-icons">code</i>
              GitHub
            </a>
          </div>
        </section>
      </div>

      <footer class="about-footer">
        <NuxtLink to="/" class="back-to-articles">
          <span class="back-arrow">&larr;</span> {{ $t("backToArticles") }}
        </NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup>
useHead({
  title: 'À propos - Jean-Luc Houédanou',
  meta: [
    { name: 'description', content: 'Jean-Luc Houédanou - Développeur web full-stack et administrateur systèmes basé à Abidjan, Côte d\'Ivoire.' },
  ]
})
</script>

<style lang="scss" scoped>
.about-wrapper {
  font-family: var(--font-body);
  color: var(--text-primary);
  line-height: 1.7;
  background: transparent;
}

.about-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border-color);
}

.about-header__avatar {
  margin-bottom: 2rem;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid var(--accent);
    opacity: 0.4;
    animation: avatarPulse 3s ease-in-out infinite;
  }

  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
    box-shadow: var(--neon-glow-teal);
  }
}

@keyframes avatarPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50%      { transform: scale(1.06); opacity: 0.15; }
}

.about-header__title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.25rem, 5vw, 3.4rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
}

.about-header__subtitle {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin: 0 0 1rem 0;
}

.about-header__location {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0;

  .material-icons {
    font-size: 1rem;
    color: var(--accent-magenta);
  }
}

.about-section {
  margin-bottom: 3.5rem;

  h2 {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    font-weight: 400;
    letter-spacing: -0.025em;
    color: var(--text-primary);
    margin: 0 0 1.5rem 0;
    padding-left: 1.25rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      bottom: 0.3em;
      width: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  p {
    font-family: var(--font-body);
    font-size: 1.05rem;
    line-height: 1.78;
    color: var(--text-secondary);
    margin: 0 0 1.25rem 0;
  }
}

.about-skills__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.about-skill {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);

    .material-icons {
      color: var(--accent);
    }
  }

  .material-icons {
    font-size: 1.85rem;
    color: var(--accent-magenta);
    margin-bottom: 0.85rem;
    transition: color 0.3s ease;
  }

  h3 {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: -0.015em;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
  }

  p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.55;
  }
}

.about-contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.about-contact__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  background: var(--bg-card);
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  transition: all 0.25s ease;

  .material-icons {
    font-size: 1rem;
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
    box-shadow: var(--neon-glow-teal);
    transform: translateY(-2px);
  }
}

.about-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.back-to-articles {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
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

    .back-arrow {
      transform: translateX(-4px);
    }
  }
}

.back-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
  font-size: 1rem;
}

@media screen and (max-width: 640px) {
  .about-container {
    padding: 2.5rem 1rem;
  }

  .about-header {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
  }

  .about-skills__grid {
    grid-template-columns: 1fr;
  }

  .about-contact__links {
    flex-direction: column;
  }
}
</style>
