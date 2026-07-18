<template>
  <div class="privacy-page">
    <article class="privacy-page__container">
      <header class="privacy-page__header">
        <span class="privacy-page__eyebrow">— Transparence</span>
        <h1>Politique de confidentialité</h1>
        <p>Cette page explique quelles données peuvent être collectées lorsque vous consultez le blog de Jean-Luc Houédanou.</p>
        <time datetime="2026-07-18">Dernière mise à jour : 18 juillet 2026</time>
      </header>

      <div class="privacy-page__content">
        <section>
          <h2>Responsable du site</h2>
          <p>
            Le site <strong>houedanou.com</strong> est édité par Jean-Luc Houédanou, développeur web et administrateur systèmes basé à Abidjan, Côte d’Ivoire.
          </p>
          <p>
            Contact : <a href="mailto:jeanluc@houedanou.com">jeanluc@houedanou.com</a>
          </p>
        </section>

        <section>
          <h2>Données collectées</h2>
          <p>
            Le site ne demande pas de compte et ne propose pas de formulaire d’inscription. Des données techniques peuvent toutefois être transmises automatiquement par votre navigateur : adresse IP, type d’appareil, navigateur, pages consultées, date et durée de visite.
          </p>
          <p>
            Ces informations servent à mesurer la fréquentation, assurer la sécurité du site et comprendre quels articles sont utiles aux lecteurs.
          </p>
        </section>

        <section>
          <h2>Services tiers</h2>
          <ul>
            <li><strong>Google Analytics 4</strong> mesure l’audience et les parcours de consultation.</li>
            <li><strong>Infolinks</strong> peut afficher des formats publicitaires et utiliser des technologies de suivi liées à la publicité.</li>
            <li><strong>ShareThis</strong> fournit les boutons de partage social présents sur certains articles.</li>
            <li><strong>Disqus</strong> est chargé uniquement lorsque vous choisissez d’afficher les commentaires.</li>
            <li><strong>YouTube</strong>, Google Fonts et Material Icons peuvent transmettre des requêtes à Google lorsque leurs ressources sont utilisées.</li>
          </ul>
          <p>
            Ces services peuvent déposer des cookies ou lire des identifiants techniques selon leur propre politique de confidentialité. Consultez leurs pages officielles pour connaître leurs pratiques et leurs options de contrôle.
          </p>
        </section>

        <section>
          <h2>Cookies et stockage local</h2>
          <p>
            Le blog utilise le stockage local du navigateur pour mémoriser votre préférence de thème clair ou sombre. Cette préférence reste sur votre appareil et n’est pas envoyée à Jean-Luc Houédanou.
          </p>
          <p>
            Les services d’analyse, de publicité et de partage peuvent utiliser leurs propres cookies. Vous pouvez les limiter depuis les réglages de votre navigateur ou les outils de contrôle proposés par ces services.
          </p>
        </section>

        <section>
          <h2>Durée de conservation</h2>
          <p>
            Les données statistiques sont conservées selon les réglages du service d’analyse utilisé. Les messages envoyés par e-mail sont conservés uniquement le temps nécessaire pour répondre à la demande ou assurer le suivi d’un échange.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Selon votre lieu de résidence, vous pouvez demander l’accès, la rectification, la suppression ou la limitation de l’utilisation de vos données personnelles. Pour toute demande, écrivez à <a href="mailto:jeanluc@houedanou.com">jeanluc@houedanou.com</a> en précisant l’objet de votre demande.
          </p>
        </section>

        <section>
          <h2>Liens externes</h2>
          <p>
            Les articles peuvent contenir des liens vers des sites externes, notamment GitHub, YouTube, des services logiciels ou d’anciens articles. Leurs pratiques de confidentialité sont indépendantes de celle de ce blog.
          </p>
        </section>

        <section>
          <h2>Évolution de cette politique</h2>
          <p>
            Cette page peut être mise à jour lorsque le site ajoute un service, modifie ses outils de mesure ou change son fonctionnement. La date affichée en haut de page indique la dernière version publiée.
          </p>
        </section>
      </div>

      <footer class="privacy-page__footer">
        <NuxtLink to="/" class="privacy-page__back">← Retour aux articles</NuxtLink>
        <NuxtLink to="/a-propos" class="privacy-page__back">À propos de Jean-Luc →</NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup>
useHead({
  title: 'Politique de confidentialité — Le Blog de Jean-Luc Houédanou',
  meta: [
    {
      name: 'description',
      content: 'Politique de confidentialité du blog de Jean-Luc Houédanou : données collectées, cookies, services tiers et droits des visiteurs.',
    },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<style lang="scss" scoped>
.privacy-page { font-family: var(--font-body); }

.privacy-page__container {
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
}

.privacy-page__header {
  margin-bottom: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
}

.privacy-page__eyebrow {
  display: block;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.privacy-page h1 {
  margin: 0 0 1rem;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 4.8rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.privacy-page__header p {
  max-width: 62ch;
  margin: 0 0 1rem;
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.privacy-page__header time {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.privacy-page__content section {
  margin-bottom: 2.6rem;
}

.privacy-page h2 {
  margin: 0 0 0.85rem;
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 550;
  color: var(--text-primary);
}

.privacy-page p,
.privacy-page li {
  font-size: 1.04rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

.privacy-page p { margin: 0 0 0.9rem; }

.privacy-page ul {
  margin: 0.5rem 0 1rem;
  padding-left: 1.4rem;
}

.privacy-page li { margin-bottom: 0.65rem; }

.privacy-page a {
  color: var(--text-primary);
  text-decoration-color: var(--accent);
  text-underline-offset: 0.2em;

  &:hover { color: var(--accent); }
}

.privacy-page__footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.privacy-page__back {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
}

@media (max-width: 640px) {
  .privacy-page__container { padding: 3rem 1rem 4rem; }
  .privacy-page__footer { align-items: flex-start; flex-direction: column; }
}
</style>
