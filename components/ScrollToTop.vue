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
    border-radius: 50%;
    border: none;
    background: #2EC4B6;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(46, 196, 182, 0.35);
    transition: all 0.2s ease;
    z-index: 90;

    .material-icons {
        font-size: 1.4rem;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 24px rgba(46, 196, 182, 0.45);
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
