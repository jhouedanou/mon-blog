export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('youtube-link', defineAsyncComponent(() => 
    import('@/components/YoutubeLink.vue')
  ))
})
