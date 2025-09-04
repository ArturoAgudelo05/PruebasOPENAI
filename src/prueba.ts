import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  throw new Error(
    `GEMINI_API_KEY no esta definida correctamente, Verificar que la variable de entorno este configurada correctamente`
  );
}

const gemAI = new GoogleGenerativeAI(geminiApiKey);

export const prueba = async (): Promise<void> => {
  const model = gemAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Explica qué es un closure siguiendo estas reglas:
  - Usa un lenguaje sencillo como si hablara con un principiante.
  - Da una definición en máximo 3 frases.
  - Muestra un ejemplo práctico en código con comentarios.
  - Relaciona el concepto con una metáfora de la vida cotidiana.`;

  const result = await model.generateContent({
    contents: [
      {
        //! como en gemini esta tal cual "system", este lo voy a usar para simularlo
        role: "user",
        parts: [
          { text: "Eres un profesor de javascript paciente y sarcastico." },
        ],
      },
      //* Pregunta que hace el usuario
      { role: "user", parts: [{ text: prompt }] },
      {
        //*  Simulcion de respuesta anterior del asistente
        role: "model",
        parts: [
          {
            text: "Un closure es cuando una función recuerda el contexto en el que fue creada.",
          },
        ],
      },
      {
        //* Aqui el usuario hace otra pregunta
        role: "user",
        parts: [{ text: "Dame otra metafora sobre los closures." }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.3,
      topK: 10,
      maxOutputTokens: 200,
    },
  });
  const response = result.response;
  const text = response.text() || "No se recibio texto";

  console.log(text);
};

prueba();
