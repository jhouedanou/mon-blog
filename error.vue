<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-title">404</h1>
      <h2 class="error-subtitle">Page non trouvée</h2>
      <p class="error-message">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div class="error-actions">
        <NuxtLink to="/" class="btn btn-primary">
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '404 - Page non trouvée | Blog de Jean-Luc Houédanou',
  meta: [
    { name: 'description', content: 'La page que vous recherchez n\'existe pas.' },
    { name: 'robots', content: 'noindex,nofollow' }
  ]
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
}

.error-container {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
}

.error-title {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.error-subtitle {
  font-size: 2rem;
  margin: 1rem 0;
  color: #f8f9fa;
}

.error-message {
  font-size: 1.2rem;
  margin: 2rem 0;
  line-height: 1.6;
  color: #e9ecef;
}

.error-actions {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #03a87c;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #028f69;
}
</style>
