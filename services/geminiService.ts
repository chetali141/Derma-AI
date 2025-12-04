import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RoutineData, QuizState } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY' });

const routineSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    skinType: { type: Type.STRING, description: "The determined skin type (e.g., Oily, Dry, Combination)" },
    summary: { type: Type.STRING, description: "A brief professional summary of the skin profile" },
    morning: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepName: { type: Type.STRING, description: "Generic step name (e.g., Cleanser)" },
          productCategory: { type: Type.STRING, description: "Neutral product category (e.g., Gel Cleanser)" },
          keyIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          reason: { type: Type.STRING, description: "Why this fits the user" }
        },
        required: ["stepName", "productCategory", "keyIngredients", "reason"]
      }
    },
    evening: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepName: { type: Type.STRING },
          productCategory: { type: Type.STRING },
          keyIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          reason: { type: Type.STRING }
        },
        required: ["stepName", "productCategory", "keyIngredients", "reason"]
      }
    },
    weekly: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepName: { type: Type.STRING },
          productCategory: { type: Type.STRING },
          keyIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          reason: { type: Type.STRING }
        },
        required: ["stepName", "productCategory", "keyIngredients", "reason"]
      }
    }
  },
  required: ["skinType", "summary", "morning", "evening"]
};

export const generateSkinRoutine = async (answers: QuizState): Promise<RoutineData> => {
  const model = "gemini-2.5-flash";
  const prompt = `
    Act as Derma-AI, a professional esthetician. 
    Analyze the user's skin profile based on these inputs:
    - Skin feel 1 hour after washing: ${answers.feel}
    - Primary Concern: ${answers.concern}
    - Sensitivity Level: ${answers.sensitivity}

    Task:
    1. Determine the skin type.
    2. Create a Morning and Evening routine using ONLY product categories (NO BRAND NAMES).
    3. Suggest key ingredients for each step.
    4. Keep the tone professional, supportive, and non-judgmental.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: routineSchema,
        systemInstruction: "You are Derma-AI. You MUST NOT recommend specific brand names. Focus purely on product types (e.g., 'Gel Cleanser') and active ingredients. Ensure safety and suitability.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as RoutineData;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error generating routine:", error);
    throw error;
  }
};

export const explainIngredient = async (ingredient: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const prompt = `Explain the skincare ingredient "${ingredient}". Include what it is, how it works, and which skin types benefit most. Keep it concise (under 100 words).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are Derma-AI. Provide educational, scientific, yet accessible explanations of skincare ingredients.",
      },
    });

    return response.text || "I couldn't find information on that ingredient.";
  } catch (error) {
    console.error("Error explaining ingredient:", error);
    return "Sorry, I'm having trouble retrieving that information right now.";
  }
};
