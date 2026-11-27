import { useI18n } from 'vue-i18n'
import { brandImageText } from '~/utils/image-text.js'

/**
 * Renvoie `imgText(texte)`, qui ajoute la mention du blog dans la langue de la
 * page. À utiliser pour l'`alt` et le `title` de chaque image.
 */
export function useImageText() {
  const { locale } = useI18n()
  return (text) => brandImageText(text, locale.value)
}
