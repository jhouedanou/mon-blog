import { ref } from 'vue'

/**
 * Source de l'embed actuellement monté, partagée par tous les lecteurs de la
 * page. Les iframes des fournisseurs sont cross-origin : on ne peut pas leur
 * demander de se mettre en pause. Démonter l'iframe est le seul moyen fiable
 * de couper le son, d'où un seul lecteur monté à la fois.
 */
const activeEmbedSrc = ref(null)

export function useEmbedPlayer() {
    return { activeEmbedSrc }
}
