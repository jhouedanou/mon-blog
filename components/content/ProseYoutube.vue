<template>
    <div class="youtube-container">
        <div class="youtube-thumbnail" @click="openModal">
            <img :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`" alt="YouTube Thumbnail">
            <div class="play-button"></div>
        </div>
        <div v-if="isModalOpen" class="youtube-modal">
            <div class="modal-overlay" @click="closeModal"></div>
            <div class="modal-content">
                <button class="close-button" @click="closeModal">×</button>
                <iframe :src="`https://www.youtube.com/embed/${id}`" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}
</script>

<style scoped>
.youtube-container {
    margin: 2rem 0;
}

.youtube-thumbnail {
    position: relative;
    cursor: pointer;
    width: 100%;
}

.youtube-thumbnail img {
    width: 100%;
    height: auto;
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
    margin: 5% auto;
    padding: 20px;
}

iframe {
    width: 100%;
    height: 100%;
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
}
</style>
