<template>
    <div class="youtube-container">
        <div class="youtube-thumbnail" @click="openModal" role="button" tabindex="0" @keydown.enter="openModal" aria-label="Lire la vidéo YouTube">
            <img :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`" :alt="`Miniature vidéo YouTube: ${id}`">
            <div class="play-button"></div>
        </div>
        <div v-if="isModalOpen" class="youtube-modal" role="dialog" aria-modal="true" aria-label="Lecteur vidéo YouTube" @keydown.escape="closeModal">
            <div class="modal-overlay" @click="closeModal"></div>
            <div class="modal-content">
                <button class="close-button" @click="closeModal" aria-label="Fermer la vidéo" ref="closeBtn">×</button>
                <iframe :src="`https://www.youtube.com/embed/${id}?autoplay=1`" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen title="Vidéo YouTube"></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const isModalOpen = ref(false)
const closeBtn = ref(null)

const openModal = () => {
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
    nextTick(() => {
        closeBtn.value?.focus()
    })
}

const closeModal = () => {
    isModalOpen.value = false
    document.body.style.overflow = ''
}

onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>

<style scoped>
.youtube-container {
    margin: 2rem 0;
}

.youtube-thumbnail {
    position: relative;
    cursor: pointer;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

.youtube-thumbnail img {
    width: 100%;
    height: auto;
    display: block;
}

.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 68px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 14px;
    transition: background-color 0.2s ease;
}

.youtube-thumbnail:hover .play-button {
    background-color: rgba(255, 0, 0, 0.85);
}

.play-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 12px 0 12px 20px;
    border-color: transparent transparent transparent white;
}

.youtube-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
}

.modal-content {
    position: relative;
    width: 80%;
    height: 80%;
    max-width: 960px;
    padding: 20px;
}

iframe {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

.close-button {
    position: absolute;
    top: -40px;
    right: 0;
    background: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 50%;
    line-height: 1;
    transition: transform 0.2s ease;
}

.close-button:hover {
    transform: scale(1.1);
}
</style>
