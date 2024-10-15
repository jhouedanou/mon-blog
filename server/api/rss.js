import axios from 'axios'

export default defineEventHandler(async (event) => {
  const feedUrl = 'https://feeds.feedburner.com/houedanou/mezt'
  try {
    const response = await axios.get(feedUrl)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du flux RSS:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération du flux RSS'
    })
  }
})
