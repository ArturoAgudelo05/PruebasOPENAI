import OpenAI from "openai";

export const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY)