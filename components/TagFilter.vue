<template>
    <div class="tag-filter" v-if="tags.length">
        <button
            v-for="tag in tags"
            :key="tag"
            class="tag-filter__tag"
            :class="{ 'tag-filter__tag--active': selectedTags.includes(tag) }"
            :style="getTagStyle(tag)"
            @click="toggleTag(tag)"
            :aria-pressed="selectedTags.includes(tag)"
        >
            {{ tag }}
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    tags: {
        type: Array,
        default: () => []
    },
    selectedTags: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:selectedTags'])

// Palette de couleurs vives pour les tags
const tagPalette = [
    '#00BBF9', // bleu
    '#FF6F61', // corail
    '#2EC4B6', // turquoise
    '#F5B700', // or
    '#9B5DE5', // violet
    '#55D6BE', // vert menthe
    '#FF85A1', // rose
    '#FFA62B', // orange
    '#48BF84', // vert
    '#6C63FF', // indigo
    '#E84855', // rouge
    '#00CFC1', // cyan
]

// Couleur stable par tag (basée sur un hash simple)
const tagColorCache = {}
function getTagColor(tag) {
    if (tagColorCache[tag]) return tagColorCache[tag]
    let hash = 0
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % tagPalette.length
    tagColorCache[tag] = tagPalette[index]
    return tagPalette[index]
}

function getTagStyle(tag) {
    const color = getTagColor(tag)
    const isActive = props.selectedTags.includes(tag)
    return {
        '--tag-color': color,
        borderColor: color,
        background: isActive ? color : 'transparent',
        color: isActive ? '#fff' : color,
    }
}

function toggleTag(tag) {
    const current = [...props.selectedTags]
    const index = current.indexOf(tag)
    if (index >= 0) {
        current.splice(index, 1)
    } else {
        current.push(tag)
    }
    emit('update:selectedTags', current)
}
</script>

<style lang="scss" scoped>
.tag-filter {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    margin-bottom: 0;
    overflow-x: auto;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.25rem;

    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
    }
}

.tag-filter__tag {
    padding: 0.3rem 0.85rem;
    border: 2px solid;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: capitalize;
    background: none;
    flex-shrink: 0;
    white-space: nowrap;

    &:hover {
        opacity: 0.85;
        transform: translateY(-1px);
    }
}
</style>
