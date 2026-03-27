<template>
  <div v-if="isOpen" class="youtube-modal" role="dialog" aria-modal="true" aria-label="Lecteur vidéo YouTube" @keydown.escape="closeModal">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content" ref="modalContent">
      <button class="close-button" @click="closeModal" aria-label="Fermer la vidéo" ref="closeBtn">×</button>
      <iframe
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        title="Vidéo YouTube"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  videoId: String,
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const closeBtn = ref(null)

const videoUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}`
})

const closeModal = () => {
  emit('close')
}

watch(() => props.isOpen, (val) => {
  if (val) {
    nextTick(() => {
      closeBtn.value?.focus()
    })
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
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
