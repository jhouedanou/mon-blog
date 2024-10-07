import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
  const { prompt } = getQuery(event);
  try {
    const response = await openai.images.generate({
      prompt: `Tech illustration for: ${prompt}`,
      n: 1,
      size: "512x512",
    });
    return response.data[0].url;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image DALL-E:', error);
    return null;
  }
});