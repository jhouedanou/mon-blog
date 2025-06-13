// Gestion du fichier robots.txt côté serveur
export default defineEventHandler(() => {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://houedanou.com/sitemap_index.xml

# Interdire l'indexation de certains répertoires si nécessaire
# Disallow: /admin/
# Disallow: /private/

# Permettre l'accès aux images et assets
Allow: /images/
Allow: /_nuxt/
Allow: /favicon.ico`

  setHeader('Content-Type', 'text/plain')
  return robotsContent
})
