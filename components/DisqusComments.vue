<template>
    <div id="disqus_thread"></div>
</template>

<script>
export default {
    props: {
        pageUrl: {
            type: String,
            required: true
        },
        pageIdentifier: {
            type: String,
            required: true
        }
    },
    mounted() {
        if (process.client) {
            this.loadDisqus()
        }
    },
    methods: {
        loadDisqus() {
            var disqus_config = function () {
                this.page.url = this.pageUrl
                this.page.identifier = this.pageIdentifier
            }

                ; (function () {
                    var d = document, s = d.createElement('script')
                    s.src = 'https://houedanou.disqus.com/embed.js'
                    s.setAttribute('data-timestamp', +new Date())
                        ; (d.head || d.body).appendChild(s)
                })()
        }
    }
}
</script>
