<template>
    <div class="search-bar">
        <div class="search-bar__input-wrapper">
            <i class="material-icons search-bar__icon">search</i>
            <input
                type="search"
                v-model="query"
                :placeholder="$t('searchPlaceholder')"
                class="search-bar__input"
                :aria-label="$t('searchLabel')"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

// Pas de copie locale : un ref + watch perdait la valeur écrite par le parent
// (ex. `?q=` appliqué dans onMounted). Le computed reflète toujours le parent.
const query = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
</script>

<style lang="scss" scoped>
.search-bar {
    margin: 0;
}

.search-bar__input-wrapper {
    position: relative;
    max-width: 100%;
}

.search-bar__icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 1.2rem;
    pointer-events: none;
}

.search-bar__input {
    width: 100%;
    min-height: 50px;
    padding: 0.8rem 1rem 0.8rem 2.85rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.98rem;
    letter-spacing: 0;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;

    &::placeholder {
        color: var(--text-muted);
        font-family: var(--font-sans);
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.95rem;
    }

    &:focus-visible,
    &:focus {
        border-color: var(--accent-2);
        box-shadow: 0 0 0 3px var(--accent-2-soft);
    }
}
</style>
