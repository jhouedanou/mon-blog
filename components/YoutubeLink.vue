<template>
    <div class="youtube-thumbnail" @click="openModal">
        <img :src="`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`" alt="YouTube Thumbnail">
        <div class="play-button"></div>
    </div>
    <YoutubePopup :video-id="videoId" :is-open="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { ref } from 'vue'
import YoutubePopup from './YoutubePopup.vue'

const props = defineProps({
    videoId: String
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
.youtube-thumbnail {
    position: relative;
    cursor: pointer;
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
</style>
