<template>
  <div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">Site en construction</h1>
          <h2 class="subtitle is-3">
            Nous travaillons dur pour vous offrir une expérience exceptionnelle
            !
          </h2>
          <div class="mt-6">
            <span class="icon is-large">
              <i class="fas fa-cog fa-spin fa-3x"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<style>
body {
  background-color: #f5f5f5;
}

.hero-body {
  align-items: center;
  justify-content: center;
}

.icon {
  margin-top: 2rem;
}
</style>
