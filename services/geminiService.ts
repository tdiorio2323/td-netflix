import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface RawRecommendation {
  title: string;
  plot: string;
}

export const generateRecommendations = async (prompt: string): Promise<AIRecommendation[]> => {
  try {
    // Step 1: Generate movie ideas (title and plot)
    const movieIdeasPrompt = `Based on the following request, recommend 3 unique and imaginative movie ideas. For each movie, provide a title and a short, intriguing plot summary that would make a great movie poster.
    Request: "${prompt}"`;
    
    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: movieIdeasPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "The imaginative title of the movie." },
              plot: { type: Type.STRING, description: "A short, engaging plot summary for the movie." },
            },
            required: ["title", "plot"],
          },
        },
      },
    });

    const rawRecommendations: RawRecommendation[] = JSON.parse(textResponse.text.trim());

    if (rawRecommendations.length === 0) {
      return [];
    }

    // Step 2: Generate a poster for each movie idea concurrently
    const recommendationPromises = rawRecommendations.map(async (rec) => {
      const imagePrompt = `Create a visually stunning movie poster for a film titled "${rec.title}". The plot is: "${rec.plot}". The poster should be dramatic, cinematic, and high-detail, capturing the essence of the story. Avoid putting any text on the poster.`;
      
      const imageResponse = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '3:4', // Ideal aspect ratio for posters
        },
      });

      const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
      const posterUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

      return {
        ...rec,
        posterUrl,
      };
    });

    const fullRecommendations = await Promise.all(recommendationPromises);
    return fullRecommendations;

  } catch (error) {
    console.error("Error generating recommendations:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
       throw new Error("Your API key is not valid. Please check it and try again.");
    }
    throw new Error("Failed to get AI recommendations. The service might be busy. Please try again later.");
  }
};