<template>
  <div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1" data-aos="fade-down">Site en construction</h1>
          <h2 class="subtitle is-3" data-aos="fade-up" data-aos-delay="200">
            Nous travaillons dur pour vous offrir une expérience exceptionnelle
            !
          </h2>
          <div class="mt-6" data-aos="zoom-in" data-aos-delay="400">
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
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
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
