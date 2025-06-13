#!/usr/bin/env node

/**
 * Script pour vérifier et annoncer le sitemap
 * L'API de ping Google est dépréciée depuis juin 2023
 */

const submitSitemapToGoogle = async () => {
  const sitemapUrl = 'https://houedanou.com/sitemap_index.xml'
  
  try {
    console.log('🔍 Vérification du sitemap...')
    
    // Vérifier que le sitemap est accessible
    const response = await fetch(sitemapUrl)
    
    if (response.ok) {
      const content = await response.text()
      console.log('✅ Sitemap accessible et valide!')
      console.log(`📋 URL du sitemap: ${sitemapUrl}`)
      console.log(`📄 Taille: ${content.length} caractères`)
      
      // Compter le nombre d'URLs
      const urlCount = (content.match(/<loc>/g) || []).length
      console.log(`🔗 Nombre d'URLs dans le sitemap: ${urlCount}`)
      
      console.log('\n📝 Actions recommandées:')
      console.log('1. Ajouter votre sitemap dans Google Search Console:')
      console.log('   → https://search.google.com/search-console')
      console.log('2. Soumettre votre sitemap manuellement dans l\'onglet "Sitemaps"')
      console.log(`3. URL à soumettre: ${sitemapUrl}`)
      console.log('4. Vérifier les erreurs d\'indexation dans le rapport "Couverture"')
      
    } else {
      console.log('⚠️ Sitemap non accessible:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

// Exécuter le script
submitSitemapToGoogle()
