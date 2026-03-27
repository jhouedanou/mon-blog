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
  background: var(--bg-card);
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
  line-height: 1.7;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.about-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header__avatar {
  margin-bottom: 1.5rem;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #2EC4B6;
    box-shadow: 0 4px 20px rgba(46, 196, 182, 0.2);
  }
}

.about-header__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.about-header__subtitle {
  font-size: 1.15rem;
  color: #2EC4B6;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.about-header__location {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;

  .material-icons {
    font-size: 1.1rem;
  }
}

.about-section {
  margin-bottom: 2.5rem;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #2EC4B6;
    display: inline-block;
  }

  p {
    font-family: 'Merriweather', serif;
    font-size: 1.05rem;
    line-height: 1.85;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
  }
}

.about-skills__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 1rem;
}

.about-skill {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-shadow);
  }

  .material-icons {
    font-size: 2rem;
    color: #2EC4B6;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.4rem 0;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }
}

.about-contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.about-contact__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  .material-icons {
    font-size: 1.2rem;
    color: #2EC4B6;
  }

  &:hover {
    border-color: #2EC4B6;
    background: rgba(46, 196, 182, 0.06);
  }
}

.about-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.back-to-articles {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #2EC4B6;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-hover);

    .back-arrow {
      transform: translateX(-3px);
    }
  }
}

.back-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
  font-size: 1.2rem;
}

@media screen and (max-width: 640px) {
  .about-header__title {
    font-size: 1.75rem;
  }

  .about-skills__grid {
    grid-template-columns: 1fr;
  }

  .about-contact__links {
    flex-direction: column;
  }
}
</style>
