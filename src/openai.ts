import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY no está definida. Por favor, asegúrate de que tu variable de entorno esté configurada correctamente.");
}

export const genAI = new GoogleGenerativeAI(geminiApiKey);

async function prueba() {
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const prompt = "Hola, puedes resumirme que es bun?";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

prueba();