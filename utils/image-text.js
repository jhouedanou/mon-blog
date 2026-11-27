// Mention du blog ajoutée à l'`alt` et au `title` de toutes les images du site,
// à la demande de l'auteur (novembre 2026) : « <description> - Le Blog de
// Jean-Luc Houédanou » sur les pages françaises, « <description> - Jean-Luc
// Houédanou's Blog » sur les pages anglaises.
import { SITE_NAME } from './site.js'

export const IMAGE_BRAND = {
  fr: SITE_NAME,
  en: "Jean-Luc Houédanou's Blog",
}

/**
 * Ajoute la mention du blog à un texte d'image. Texte vide : la mention seule.
 * La mention n'est pas doublée si le texte la contient déjà.
 */
export function brandImageText(text, locale = 'fr') {
  const brand = IMAGE_BRAND[locale] || IMAGE_BRAND.fr
  const clean = String(text || '').trim()
  if (!clean) return brand
  if (clean.toLowerCase().includes(brand.toLowerCase())) return clean
  return `${clean} - ${brand}`
}

/** Langue d'un chemin : `/en` et `/en/…` sont en anglais, le reste en français. */
export function localeFromPath(path) {
  return /^\/en(\/|$)/.test(path || '') ? 'en' : 'fr'
}
