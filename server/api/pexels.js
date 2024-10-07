import { createClient } from 'pexels';

const client = createClient('VOTRE_CLE_API_PEXELS');

export default defineEventHandler(async (event) => {
  try {
    const photos = await client.photos.search({ query: 'technology', per_page: 80 });
    const randomIndex = Math.floor(Math.random() * photos.photos.length);
    return photos.photos[randomIndex]?.src?.medium || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image Pexels:', error);
    return null;
  }
});