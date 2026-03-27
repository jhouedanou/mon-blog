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

const tagColors = {
    tech: '#00BBF9',
    opinion: '#FF6F61',
    tutoriel: '#2EC4B6',
    productivité: '#F5B700',
    apple: '#9B5DE5',
    afrique: '#55D6BE',
}

function getTagStyle(tag) {
    const color = tagColors[tag] || '#2EC4B6'
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
