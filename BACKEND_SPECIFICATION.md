1. Contexto del Proyecto
Desarrollar un servicio API REST que actúe como puente entre un perfil de usuario físico y el modelo de lenguaje Groq (llama-3.3-70b-versatile) para generar planes de entrenamiento y nutrición personalizados.

2. Requerimientos de Salida (Entregables de la IA)
La IA debe generar los siguientes archivos siguiendo esta especificación:

README.md: Tutorial de instalación, comandos npm y guía de uso.

database.sql: Script de creación de base de datos y tablas.

.env.example: Plantilla de variables con keys vacías.

Estructura de archivos completa: Código fuente organizado en capas (/config, /controllers, /services, /routes).

3. Especificaciones Técnicas
Stack: Node.js, Express, MySQL (mysql2/promise), Axios, CORS.

IA Model: Groq API vía endpoint compatible con OpenAI.

Prompt Engineering: El servicio debe enviar un system_prompt que obligue a la IA a responder únicamente en formato JSON.

4. Arquitectura de Datos (MySQL)
Base de datos: gym_app

Tabla users: id, username, password, email.

Tabla user_profiles: user_id (FK), age, gender (enum), weight, height, goal (enum: volumen, definicion, recomposicion), days_available, last_generated_plan (JSON).

5. Definición de Endpoints
POST /api/plan/generate
Body esperado: user_id, age, gender, weight, height, goal, days_available.

Lógica:

Validar que los campos requeridos no sean nulos.

Enviar los datos al llmService.

El llmService debe limpiar la respuesta de la IA (remover bloques de código markdown) y parsear a objeto JSON.

Guardar el objeto JSON resultante en la columna last_generated_plan.

Retornar el objeto JSON al cliente con status 201.

6. Formato de Respuesta del Plan (JSON Schema)
JSON
{
  "rutina": [{ "dia": "string", "ejercicios": ["string"] }],
  "dieta": {
    "calorias_diarias": "number",
    "distribucion_macros": { "proteina": "string", "carbos": "string", "grasas": "string" },
    "ejemplo_comida": "string"
  }
}