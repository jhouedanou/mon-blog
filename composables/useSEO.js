// Composable pour faciliter l'utilisation des métadonnées SEO
export const useSEO = (data = {}) => {
  const route = useRoute()
  
  const seoData = {
    title: data.title || 'Blog de Jean-Luc Houédanou',
    description: data.description || 'Blog personnel de Jean-Luc Houédanou - Développeur web et défenseur du bon sens',
    image: data.image || '/images/default-og.webp',
    keywords: data.keywords || 'Jean-Luc Houédanou, développeur web, blog, technologie'
  }

  // Configuration directe avec useHead
  useHead({
    title: seoData.title,
    meta: [
      { name: 'description', content: seoData.description },
      { name: 'keywords', content: seoData.keywords },
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { 
        property: 'og:image', 
        content: seoData.image.startsWith('http') ? seoData.image : `https://houedanou.com${seoData.image}`
      },
      { property: 'og:url', content: `https://houedanou.com${route.path}` },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { 
        name: 'twitter:image', 
        content: seoData.image.startsWith('http') ? seoData.image : `https://houedanou.com${seoData.image}`
      }
    ],
    link: [
      { rel: 'canonical', href: `https://houedanou.com${route.path}` }
    ]
  })

  return seoData
}
