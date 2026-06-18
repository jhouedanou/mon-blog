<template>
    <div class="tag-filter" v-if="tags.length">
        <div class="tag-filter__scroll" role="group" :aria-label="$t('filterByTag')">
            <button
                v-for="tag in tags"
                :key="tag"
                class="tag-filter__pill"
                :class="{ 'is-active': selectedTags.includes(tag) }"
                :style="{ '--tag-color': getTagColor(tag) }"
                :aria-pressed="selectedTags.includes(tag)"
                :aria-label="ariaLabelFor(tag)"
                @click="toggleTag(tag)"
            >
                <span class="tag-filter__name">{{ tag }}</span>
                <span v-if="counts[tag]" class="tag-filter__count" aria-hidden="true">{{ counts[tag] }}</span>
            </button>

            <button
                v-if="selectedTags.length"
                class="tag-filter__clear"
                @click="clear"
                :aria-label="$t('clearTagFilters')"
            >
                <i class="material-icons" aria-hidden="true">close</i>
                <span>{{ $t('clearTagFilters') }}</span>
            </button>
        </div>

        <NuxtLink to="/tags" class="tag-filter__all-link" :aria-label="$t('allTags')">
            {{ $t('allTags') }} →
        </NuxtLink>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getTagColor } from '~/utils/tags.js'

const { t } = useI18n()

const props = defineProps({
    tags: {
        type: Array,
        default: () => [],
    },
    selectedTags: {
        type: Array,
        default: () => [],
    },
    counts: {
        type: Object,
        default: () => ({}),
    },
})

const emit = defineEmits(['update:selectedTags'])

function ariaLabelFor(tag) {
    const count = props.counts[tag]
    const isActive = props.selectedTags.includes(tag)
    const state = isActive ? t('tagActive') : t('tagInactive')
    return count
        ? `${tag} — ${count} ${count > 1 ? t('articles') : t('article')} — ${state}`
        : `${tag} — ${state}`
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

function clear() {
    emit('update:selectedTags', [])
}
</script>

<style lang="scss" scoped>
.tag-filter {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.tag-filter__scroll {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    flex: 1;
    min-width: 0;

    @media (max-width: 700px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 0.35rem;

        &::-webkit-scrollbar {
            height: 4px;
        }
        &::-webkit-scrollbar-thumb {
            background: var(--border-strong);
            border-radius: 4px;
        }
    }
}

.tag-filter__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.7rem;
    border: 1px solid var(--border-color);
    border-left: 3px solid var(--tag-color, var(--accent));
    border-radius: 2px;
    background: var(--bg-card);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: lowercase;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;

    &:hover {
        color: var(--tag-color, var(--accent));
        border-color: var(--tag-color, var(--accent));
        transform: translateY(-1px);
    }

    &.is-active {
        background: var(--tag-color, var(--accent));
        border-color: var(--tag-color, var(--accent));
        color: #0a0a0f;
        box-shadow: 0 0 16px color-mix(in srgb, var(--tag-color, var(--accent)) 40%, transparent);

        .tag-filter__count {
            background: rgba(10, 10, 15, 0.2);
            color: #0a0a0f;
        }
    }
}

.tag-filter__name {
    font-weight: 600;
    letter-spacing: 0.06em;
}

.tag-filter__count {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    padding: 0.05rem 0.35rem;
    border-radius: 2px;
    background: var(--bg-elevated);
    color: var(--text-muted);
    transition: background 0.2s ease, color 0.2s ease;
}

.tag-filter__clear {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.65rem;
    border: 1px dashed var(--accent-magenta);
    border-radius: 2px;
    background: transparent;
    color: var(--accent-magenta);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-icons {
        font-size: 0.95rem;
    }

    &:hover {
        background: var(--accent-magenta);
        color: #0a0a0f;
    }
}

.tag-filter__all-link {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s ease;
    flex-shrink: 0;

    &:hover {
        color: var(--accent);
    }
}
</style>
