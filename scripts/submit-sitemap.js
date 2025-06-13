#!/usr/bin/env node

/**
 * Script pour soumettre automatiquement le sitemap à Google
 * Utilisez ceci après chaque déploiement
 */

const submitSitemapToGoogle = async () => {
  const sitemapUrl = 'https://houedanou.com/sitemap.xml'
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  
  try {
    console.log('🚀 Soumission du sitemap à Google...')
    
    const response = await fetch(pingUrl)
    
    if (response.ok) {
      console.log('✅ Sitemap soumis avec succès à Google!')
      console.log(`📋 URL du sitemap: ${sitemapUrl}`)
    } else {
      console.log('⚠️  Erreur lors de la soumission:', response.statusText)
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

// Exécuter le script
submitSitemapToGoogle()
