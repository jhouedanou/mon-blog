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
    gap: 0.5rem;
    background: none;
    border: 2px solid #2EC4B6;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #2EC4B6;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-icons {
        font-size: 1.2rem;
    }

    &:hover {
        background: #2EC4B6;
        color: #fff;
    }
}

[data-theme="dark"] .disqus-load-btn {
    border-color: #2EC4B6;
    color: #2EC4B6;

    &:hover {
        background: #2EC4B6;
        color: #1a1a2e;
    }
}
</style>
