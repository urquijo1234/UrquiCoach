const axios = require('axios');
const env = require('../config/env');
const { cleanJsonResponse } = require('../utils/cleanJsonResponse');

const SYSTEM_PROMPT = `Eres un entrenador personal y nutricionista experto. Responde únicamente en formato JSON válido, sin markdown, sin texto adicional y respetando exactamente esta estructura:
{
  "rutina": [{ "dia": "string", "ejercicios": ["string"] }],
  "dieta": {
    "calorias_diarias": number,
    "distribucion_macros": { "proteina": "string", "carbos": "string", "grasas": "string" },
    "ejemplo_comida": "string"
  }
}`;

async function generatePlanWithLLM(profile) {
  if (!env.groq.apiKey) {
    throw new Error('GROQ_API_KEY no está configurada');
  }

  const response = await axios.post(
    `${env.groq.baseUrl}/chat/completions`,
    {
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Genera un plan personalizado para este perfil: ${JSON.stringify(profile)}`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${env.groq.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  );

  const content = response.data?.choices?.[0]?.message?.content;
  return cleanJsonResponse(content);
}

module.exports = { generatePlanWithLLM };
