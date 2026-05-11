Backend Specification: Fitness AI Service
Este documento sirve como la fuente de verdad (Single Source of Truth) para la generación de código mediante IA. Cualquier implementación debe seguir estrictamente estas definiciones.

1. Stack Tecnológico
Runtime: Node.js (Express.js)

Base de Datos: MySQL 8.0+

Cliente HTTP: Axios

IA Engine: Groq API (Model: llama-3.3-70b-versatile)

Seguridad: CORS habilitado, Variables de entorno via .env

2. Definición de Datos (MySQL)
La base de datos se llama gym_app. Se requieren las siguientes tablas:

users: id (PK), username, password, email.

user_profiles:

id (PK)

user_id (FK -> users.id)

age (INT), gender (ENUM), weight (FLOAT), height (FLOAT), goal (ENUM), days_available (INT)

last_generated_plan (JSON) -> Campo crítico donde se almacena la respuesta de la IA.

3. Arquitectura de Software
Se debe seguir un patrón de Capas para asegurar la mantenibilidad:

/config: Gestión de la conexión a la base de datos (Pool de conexiones).

/services: Lógica de comunicación con APIs externas (Groq).

/controllers: Orquestación de la petición, validación y persistencia.

/routes: Definición de endpoints REST.

server.js: Punto de entrada y middleware global.

4. Flujo del Servicio generate-plan (POST)
Entrada: Recibe JSON con perfil físico del usuario.

Procesamiento IA:

Enviar prompt estructurado a Groq.

Prompt Requirement: Exigir respuesta en JSON puro.

Limpieza: El servicio debe ser capaz de extraer el JSON incluso si la IA lo envuelve en bloques de código markdown (json ... ).

Persistencia: Guardar el JSON resultante en user_profiles.last_generated_plan.

Salida: Devolver el plan generado al cliente con status 201.

5. Contrato del JSON de Salida (IA Response)
La IA debe responder obligatoriamente con este esquema:

JSON
{
  "rutina": [
    { "dia": "string", "ejercicios": ["string"] }
  ],
  "dieta": {
    "calorias_diarias": "number",
    "distribucion_macros": { "proteina": "string", "carbos": "string", "grasas": "string" },
    "ejemplo_comida": "string"
  }
}