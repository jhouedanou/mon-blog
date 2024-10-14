<template>
  <NuxtLayout>
    <header class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">

            <NuxtLink to="/">
              <NuxtImg src="/images/1837389.jpeg" format="webp" quality="80" height="320" placeholder loading="lazy"
                fallback>
              </NuxtImg>le Blog de Jean Luc Houédanou
            </NuxtLink>
          </h1>
        </div>
      </div>
    </header>
    <main class="section">
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<script setup>
// L'import d'ArticleList n'est plus nécessaire ici
</script>
<style lang="scss">
html {

  background: #EEE;
}

main {
  background: #EEE;
}
</style>