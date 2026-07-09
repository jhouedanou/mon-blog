<template>
    <div class="search-bar">
        <div class="search-bar__input-wrapper">
            <i class="material-icons search-bar__icon">search</i>
            <input
                type="search"
                v-model="query"
                :placeholder="$t('searchPlaceholder')"
                class="search-bar__input"
                aria-label="Rechercher un article"
                @input="$emit('update:modelValue', query)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const query = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    query.value = val
})
</script>

<style lang="scss" scoped>
.search-bar {
    margin-bottom: 0.75rem;
}

.search-bar__input-wrapper {
    position: relative;
    max-width: 100%;
}

.search-bar__icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 1.2rem;
    pointer-events: none;
}

.search-bar__input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.98rem;
    letter-spacing: 0;
    transition: all 0.2s ease;
    outline: none;

    &::placeholder {
        color: var(--text-muted);
        font-family: var(--font-sans);
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.95rem;
    }

    &:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-soft);
    }
}
</style>
