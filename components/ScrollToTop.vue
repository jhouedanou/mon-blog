<template>
    <Transition name="fade">
        <button
            v-if="isVisible"
            class="scroll-to-top"
            @click="scrollToTop"
            :aria-label="$t('scrollToTop')"
        >
            <i class="material-icons">arrow_upward</i>
        </button>
    </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

function onScroll() {
    isVisible.value = window.scrollY > 400
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: 1px solid var(--accent);
    background: var(--bg-card);
    color: var(--accent);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--neon-glow-teal), var(--card-shadow);
    transition: all 0.25s ease;
    z-index: 90;
    backdrop-filter: blur(8px);

    .material-icons {
        font-size: 1.3rem;
    }

    &:hover {
        background: var(--accent);
        color: #0a0a0f;
        transform: translateY(-3px);
        box-shadow: 0 0 40px var(--accent), var(--card-shadow);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
