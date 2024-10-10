<template>
    <div class="layout">
        <!-- <header class="header">
            <div class="header-content">
                <NuxtLink to="/" class="logo">VotreBlog</NuxtLink>
                <nav class="nav">
                    <NuxtLink to="/" class="nav-link">Accueil</NuxtLink>
                    <NuxtLink to="/about" class="nav-link">À propos</NuxtLink>
                    <a href="#" class="nav-link" @click.prevent="toggleDarkMode">
                        {{ isDarkMode ? '☀️' : '🌙' }}
                    </a>
                </nav>
            </div>
        </header> -->

        <main class="main">
            <slot />
        </main>

        <footer class="footer">
            <div class="footer-content">
                <p>&copy; {{ new Date().getFullYear() }}Jean Luc Houedanou. Tous droits réservés.</p>
                <div class="social-links">
                    <a href="#" class="social-link">Twitter</a>
                    <a href="#" class="social-link">LinkedIn</a>
                    <a href="#" class="social-link">GitHub</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.body.classList.toggle('dark-mode', isDarkMode.value)
    localStorage.setItem('darkMode', isDarkMode.value)
}

onMounted(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
        isDarkMode.value = JSON.parse(savedDarkMode)
        document.body.classList.toggle('dark-mode', isDarkMode.value)
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');

.layout {
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--text-color);
    background-color: var(--bg-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    background-color: var(--bg-color);
    z-index: 1000;
}

.header-content,
.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Merriweather', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
}

.nav {
    display: flex;
    gap: 1rem;
}

.nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--accent-color);
}

.main {
    flex-grow: 1;
    padding: 2rem 1rem;
}

.footer {
    border-top: 1px solid var(--border-color);
    padding: 1rem 0;
    margin-top: 2rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: var(--accent-color);
}

:root {
    --text-color: #292929;
    --bg-color: #ffffff;
    --border-color: #e6e6e6;
    --accent-color: #03a87c;
}

body.dark-mode {
    --text-color: #e6e6e6;
    --bg-color: #1a1a1a;
    --border-color: #4a4a4a;
    --accent-color: #03a87c;
}
</style>