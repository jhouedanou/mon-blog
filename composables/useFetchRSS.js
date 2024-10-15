import { ref } from 'vue'
import axios from 'axios'

export function useFetchRSS() {
  const feedItems = ref([])
  const error = ref(null)

  const fetchRSS = async (url) => {
    console.log("Début de fetchRSS avec l'URL:", url)
    try {
      const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
      console.log("Réponse reçue:", response)
      const data = response.data
      console.log("Données reçues:", data)
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(data.contents, 'text/xml')
      console.log("Document XML parsé:", xmlDoc)
      const entries = xmlDoc.querySelectorAll('entry')
      console.log("Nombre d'entrées trouvées:", entries.length)
      
      feedItems.value = Array.from(entries).slice(0, 25).map(entry => ({
        title: entry.querySelector('title').textContent,
        link: entry.querySelector('link[rel="alternate"]').getAttribute('href'),
        description: entry.querySelector('content').textContent.replace(/src="https:\/\/i0\.wp\.com\/www\.houedanou\.com/g, 'src="'),
        pubDate: entry.querySelector('published').textContent
      }))
      console.log("Éléments du flux traités:", feedItems.value)
    } catch (e) {
      console.error("Erreur dans fetchRSS:", e)
      error.value = e.message
    }
  }

  return { feedItems, error, fetchRSS }
}
