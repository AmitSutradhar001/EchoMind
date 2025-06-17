import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // ⚠️ DO NOT expose in production
});

export async function main(
  userText: string,
  personaPrompt: string
): Promise<string | undefined> {
  const combinedPrompt = `${personaPrompt}\n\nUser: ${userText}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: combinedPrompt }] }],
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.warn("No valid response text from Gemini.");
    return undefined;
  }

  return text;
}
