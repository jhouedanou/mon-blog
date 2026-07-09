<template>
    <div class="disqus-wrapper">
        <div v-if="!loaded" class="disqus-placeholder">
            <button class="disqus-load-btn" @click="loadDisqus" aria-label="Afficher les commentaires Disqus">
                <i class="material-icons">comment</i>
                Afficher les commentaires
            </button>
        </div>
        <div id="disqus_thread"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    pageUrl: {
        type: String,
        required: true
    },
    pageIdentifier: {
        type: String,
        required: true
    }
})

const loaded = ref(false)

function loadDisqus() {
    if (loaded.value) return
    loaded.value = true

    window.disqus_config = function () {
        this.page.url = props.pageUrl
        this.page.identifier = props.pageIdentifier
    }

    const d = document
    const s = d.createElement('script')
    s.src = 'https://houedanou.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    ;(d.head || d.body).appendChild(s)
}
</script>

<style lang="scss" scoped>
.disqus-wrapper {
    margin-top: 2rem;
}

.disqus-placeholder {
    text-align: center;
    padding: 2rem 0;
}

.disqus-load-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: transparent;
    border: 1px solid var(--accent);
    border-radius: 2px;
    padding: 0.85rem 1.75rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent);
    cursor: pointer;
    transition: all 0.25s ease;

    .material-icons {
        font-size: 1.1rem;
    }

    &:hover {
        background: var(--accent);
        color: var(--accent-contrast);
        box-shadow: var(--card-shadow-hover);
    }
}
</style>
