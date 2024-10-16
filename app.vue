<template>
  <NuxtLayout>
    <header class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">

            <NuxtLink to="/">
              <img alt="le Blog de Jean Luc Houédanou" src="/images/1837389.webp" height="320">
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

useHead({
  title: 'Le blog de Jean Luc Houédanou'
});

</script>
<style lang="scss">
html {

  background: #EEE;
}

main {
  background: #EEE;
}
</style>