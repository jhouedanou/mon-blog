<script setup>
import RSSFeedCards from "./components/RSSFeedCards.vue";
import "bulma/css/bulma.min.css";
</script>

<template>
  <div class="container">

    <RSSFeedCards />
  </div>
</template>

<style>
html {
  background: white;
}

body {
  background: white;
}

.hero-body {
  align-items: center;
  justify-content: center;
}

.icon {
  margin-top: 2rem;
}
</style>
