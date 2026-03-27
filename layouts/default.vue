<template>
    <div class="layout">
        <main class="main">
            <slot />
        </main>

        <footer class="footer">
            <div class="footer-content">
                <p>&copy; {{ new Date().getFullYear() }} Jean-Luc Houédanou. Tous droits réservés.</p>
                <div class="social-icons">
                    <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://facebook.com/votre-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="https://github.com/votre-profil" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://instagram.com/votre-profil" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com/votre-profil" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.layout {
    font-family: 'Inter', sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main {
    flex-grow: 1;
    padding: 2rem 1rem;
}

.footer {
    border-top: 1px solid var(--border-color);
    padding: 1rem 0;
    margin-top: 2rem;
    background: var(--bg-card);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-secondary);
}

.social-icons {
    margin-top: 0;
}

.social-icons a {
    color: var(--text-secondary);
    font-size: 1.5rem;
    margin-right: 1rem;
    transition: color 0.3s ease;
}

.social-icons a:hover {
    color: #2EC4B6;
}

@media screen and (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
    }
}
</style>
