<template>
  <div v-if="isOpen" class="youtube-modal">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <button class="close-button" @click="closeModal">×</button>
      <iframe 
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  videoId: String,
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const videoUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}`
})

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
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
