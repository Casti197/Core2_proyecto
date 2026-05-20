import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askMentor(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Actúa como un experto en antropología y relaciones de pareja para una materia de universidad llamada Persona y Afectividad. Eres un mentor académico y emocional. Tus respuestas deben ser breves, profundas, empáticas y basadas en valores que fomenten el diálogo en la pareja.",
        temperature: 0.7,
      }
    });

    return response.text || "Lo siento, no pude procesar tu duda en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, tuve un error de conexión con mis circuitos de sabiduría.";
  }
}
