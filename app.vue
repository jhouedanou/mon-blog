<script setup>
import RSSFeedCards from "./components/RSSFeedCards.vue";

import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<template>
  <div class="container">
    <section class="hero is-fullheight is-light">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 has-text-primary">Site en construction</h1>
          <h2 class="subtitle is-3 has-text-grey">
            Nous travaillons dur pour vous offrir une expérience exceptionnelle
            !
          </h2>
          <div class="mt-6">
            <span class="icon is-large has-text-info">
              <i class="fas fa-cog fa-spin fa-3x"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
    <RSSFeedCards />
  </div>
</template>

<style>
.hero-body {
  align-items: center;
  justify-content: center;
}

.icon {
  margin-top: 2rem;
}
</style>
