<template>
    <div class="video-container">
        <div class="video-wrapper" @click="showVideo = true">
            <img :src="`https://img.youtube.com/vi/${video}/sddefault.jpg`" :alt="title">
            <div class="play-overlay">▶️</div>
        </div>

        <Teleport to="body" v-if="showVideo">
            <div class="modal" @click.self="showVideo = false">
                <div class="modal-content">
                    <iframe :src="`https://www.youtube.com/embed/${video}?autoplay=1`" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
const props = defineProps({
    video: String,
    title: String
})

const showVideo = ref(false)
</script>

<style scoped>
.video-container {
    position: relative;
    width: 100%;
    margin: 2em 0;
}

.video-wrapper {
    position: relative;
    cursor: pointer;
}

.video-wrapper img {
    width: 100%;
    height: auto;
}

.play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4em;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    width: 80%;
    height: 80%;
}

.modal-content iframe {
    width: 100%;
    height: 100%;
}
</style>
