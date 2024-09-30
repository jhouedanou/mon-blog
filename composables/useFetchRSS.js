import { ref } from 'vue'

export function useFetchRSS() {
  const feedItems = ref([])
  const error = ref(null)

  const fetchRSS = async (url) => {
    try {
     // const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
const response = await fetch(`https://feeds.feedburner.com/houedanou/mezt`)
      if (!response.ok) throw new Error('Erreur réseau lors de la récupération du flux RSS')
      const data = await response.json()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(data.contents, 'text/xml')
      const items = xmlDoc.querySelectorAll('item')
      
      feedItems.value = Array.from(items).map(item => ({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
        pubDate: item.querySelector('pubDate').textContent
      }))
    } catch (e) {
      error.value = e.message
    }
  }

  return { feedItems, error, fetchRSS }
}
