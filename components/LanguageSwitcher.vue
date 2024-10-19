<template>
    <div class="language-switcher">
        <select v-model="$i18n.locale" @change="changeLanguage">
            <option v-for="locale in $i18n.locales" :key="locale.code" :value="locale.code">
                {{ locale.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSwitchLocalePath } from '#i18n'

const { locale, locales } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()

function changeLanguage(event) {
    const newLocale = event.target.value
    router.push(switchLocalePath(newLocale))
    setTimeout(() => {
        window.location.reload()
    }, 100)
}
</script>

<style scoped>
.language-switcher {
    margin-left: 1rem;
}
</style>
