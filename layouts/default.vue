<template>
    <div class="layout">
        <div class="main">
            <slot />
        </div>

        <footer class="footer">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="footer-brand__mark">JLH</span>
                    <span class="footer-brand__wordmark">Journal<em>.</em></span>
                </div>
                <div class="footer-meta">
                    <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Jean-Luc Houédanou. Tous droits réservés.</p>
                    <nav class="footer-links" aria-label="Liens secondaires">
                        <NuxtLink to="/tags">Tags</NuxtLink>
                        <NuxtLink to="/themes">Thématiques</NuxtLink>
                        <NuxtLink to="/cv">CV</NuxtLink>
                        <NuxtLink to="/a-propos">À propos</NuxtLink>
                        <NuxtLink to="/confidentialite">Confidentialité</NuxtLink>
                        <a href="/feed.xml">RSS</a>
                        <a href="https://github.com/jhouedanou" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </nav>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.layout {
    font-family: var(--font-body);
    color: var(--text-primary);
    background-color: transparent;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
}

.main {
    flex-grow: 1;
    padding: 0;
    background: transparent;
}

/* ==========================================
   Footer
   ========================================== */
.footer {
    border-top: 1px solid var(--border-color);
    padding: 3rem 0 2.5rem;
    margin-top: 4rem;
    background: var(--bg-card);
    transition: background-color 0.3s ease, border-color 0.3s ease;
    position: relative;
}

.footer::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: var(--accent);
}

.footer-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    color: var(--text-secondary);
}

/* Brand */
.footer-brand {
    display: inline-flex;
    align-items: baseline;
    gap: 0.65rem;
    flex-shrink: 0;
}

.footer-brand__mark {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 0.32rem 0.5rem;
    border: 1px solid var(--border-strong);
    border-radius: 4px;
    color: var(--text-primary);
    line-height: 1;
}

.footer-brand__wordmark {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--text-primary);
}

.footer-brand__wordmark em {
    font-style: normal;
    color: var(--accent);
}

/* Meta — right side */
.footer-meta {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
    justify-content: flex-end;
}

.footer-copy {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
    margin: 0;
    text-transform: uppercase;
}

.footer-links {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin: 0;
}

.footer-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    padding: 0 0.72rem;
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-size: 0.86rem;
    font-weight: 600;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    text-decoration: none;
    transition: color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.footer-links a:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    transform: translateY(-1px);
}

@media screen and (max-width: 768px) {
    .footer {
        padding: 2.5rem 0 2rem;
    }

    .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        padding: 0 1rem;
    }

    .footer-meta {
        flex-direction: column;
        gap: 1.25rem;
        justify-content: center;
    }
}
</style>
