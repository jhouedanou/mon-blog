# Guide d'indexation Google pour Nuxt sur Vercel

## 🚀 Déploiement sur Vercel

### 1. Commandes de déploiement
```bash
# Génération locale
npm run generate

# Déploiement automatique via Git
git add .
git commit -m "Update sitemap configuration"
git push origin main
```

### 2. Configuration Vercel
Le fichier `vercel.json` est déjà configuré pour optimiser les en-têtes du sitemap.

## 📋 Configuration du Sitemap

### URLs générées automatiquement :
- **Sitemap principal** : https://houedanou.com/sitemap_index.xml
- **Sitemap français** : https://houedanou.com/__sitemap__/fr-FR.xml  
- **Sitemap anglais** : https://houedanou.com/__sitemap__/en-US.xml
- **Robots.txt** : https://houedanou.com/robots.txt

### Vérification du sitemap :
```bash
npm run submit-sitemap
```

## 🔍 Indexation Google

### 1. Google Search Console
1. Accédez à [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété `houedanou.com` 
3. Vérifiez la propriété via DNS ou fichier HTML
4. Dans "Sitemaps", ajoutez : `https://houedanou.com/sitemap_index.xml`

### 2. Vérification de l'indexation
```bash
# Vérifier si une page est indexée
site:houedanou.com/fr/facebook-nest-pas-un-grin

# Vérifier l'indexation globale
site:houedanou.com
```

### 3. Demande d'indexation manuelle
1. Dans Google Search Console
2. Utiliser l'outil "Inspection d'URL"
3. Demander l'indexation pour les nouvelles pages

## ⚡ Optimisations SEO intégrées

### Métadonnées automatiques :
- ✅ Title et description personnalisés
- ✅ Open Graph (Facebook, Twitter)
- ✅ Canonical URLs
- ✅ Hreflang pour les langues
- ✅ Balises d'images optimisées

### Fonctionnalités :
- ✅ Sitemap XML multilangue
- ✅ Robots.txt optimisé
- ✅ Pre-rendering statique
- ✅ URLs SEO-friendly
- ✅ Images optimisées (WebP)

## 🔧 Commandes utiles

```bash
# Générer et vérifier
npm run generate
npm run submit-sitemap

# Vérifier les erreurs
npm run seo-check

# Prévisualiser localement
npm run preview
```

## 📊 Monitoring de l'indexation

### À surveiller dans Google Search Console :
1. **Couverture** : Pages indexées vs erreurs
2. **Sitemaps** : Pages soumises vs découvertes
3. **Performances** : Clics, impressions, CTR
4. **Améliorations** : Core Web Vitals, Mobile-friendly

### Délais d'indexation normaux :
- **Nouvelles pages** : 1-7 jours
- **Pages mises à jour** : 1-3 jours
- **Sitemap complet** : 1-2 semaines

## 🎯 Actions prioritaires

1. ✅ **Configurer Google Search Console**
2. ✅ **Soumettre le sitemap principal**
3. ✅ **Vérifier robots.txt**
4. ✅ **Configurer Google Analytics** (déjà fait)
5. ✅ **Optimiser les Core Web Vitals**

## 📝 Notes importantes

- Les URLs sont automatiquement ajoutées au sitemap lors de la création de nouveaux articles
- Le sitemap se met à jour à chaque déploiement
- Vercel gère automatiquement le cache et la compression
- Les redirections 301 sont importantes lors de changements d'URLs

---

**Prochaine étape** : Soumettre le sitemap dans Google Search Console et surveiller l'indexation sur 7-14 jours.
