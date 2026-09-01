import { OG_CARDS } from '../data/og-cards.js'
import { DEFAULT_OG_IMAGE } from './site.js'

/**
 * Carte sociale à déclarer en og:image pour une image d'article.
 *
 * X et LinkedIn ne rendent pas le WebP (40 des 42 images d'articles) : on
 * sert la carte JPEG 1200x630 générée hors ligne, ou la carte par défaut.
 * Lecture d'un manifeste statique plutôt que d'une sonde disque : même
 * résultat au prerender, sur le client et dans le Worker.
 */
export function ogImageFor(articleImage) {
  if (!articleImage) return DEFAULT_OG_IMAGE
  const key = String(articleImage).split('?')[0]
  return OG_CARDS[key] || OG_CARDS[key.replace(/^\//, '')] || DEFAULT_OG_IMAGE
}
