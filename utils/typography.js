// Typographie française à l'affichage : espace fine insécable avant « : ; ! ? »
// et à l'intérieur des guillemets, pour qu'un signe ne parte jamais seul en
// début de ligne dans un titre. Le texte source (front matter, JSON-LD, balise
// <title>) n'est pas modifié : seuls les titres affichés passent par ici.
const NNBSP = ' '

export function frenchSpacing(text, locale = 'fr') {
  if (!text) return ''
  // L'anglais ne met pas d'espace avant la ponctuation haute.
  if (locale !== 'fr') return String(text)
  return String(text)
    .replace(/[   ]+([:;!?»])/g, `${NNBSP}$1`)
    .replace(/«[   ]+/g, `«${NNBSP}`)
}
