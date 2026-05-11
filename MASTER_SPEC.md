📄 URQUICOACH - Master Project Specification (SDD)
Versión: 1.0.0
Arquitectura: Full-Stack SPA (React + Node.js) con Integración LLM
Metodología: Spec-Driven Development (SDD)

1. Visión General del Proyecto
"UrquiCoach" es una aplicación web inteligente diseñada para generar planes de entrenamiento y nutrición hiper-personalizados. El sistema actúa como un puente entre la recopilación de datos biométricos del usuario y un motor de Inteligencia Artificial (Groq/Llama 3), procesando la información para devolver un plan estructurado, determinista y renderizable en la interfaz gráfica.

2. Arquitectura del Sistema
El proyecto se divide en tres capas totalmente desacopladas:

Frontend (Cliente): Single Page Application (SPA) construida con React y Vite.

Backend (API Rest): Servidor Node.js con Express, encargado de la seguridad, la orquestación de datos y la comunicación con la API de IA.

Base de Datos (Persistencia): MySQL relacional para el control de identidad y almacenamiento de perfiles de usuario.

3. Especificación de Base de Datos (MySQL)
Tabla: users (Gestión de Identidad)
Responsable de la autenticación del sistema.

id: INT (Primary Key, Auto-incremental)

username: VARCHAR(50) (Único)

email: VARCHAR(100) (Único)

password: VARCHAR(255) (Almacenamiento de Hash bcrypt, NUNCA texto plano)

created_at: TIMESTAMP (Default CURRENT_TIMESTAMP)

Tabla: user_profiles (Datos Biométricos y Memoria)
Relación 1:1 con la tabla users. Almacena la última configuración y el plan generado (Persistencia Inteligente).

user_id: INT (Primary Key, Foreign Key -> users.id, ON DELETE CASCADE)

age: INT

gender: VARCHAR(50) (Flexibilidad de entrada sobre ENUM para evitar errores de truncado)

weight: DECIMAL(5,2)

height: INT

goal: VARCHAR(50)

days_available: INT

last_generated_plan: JSON (Almacena el output puro de la IA para consultas futuras sin recargar la API externa)

4. Especificación del Backend (API REST)
4.1. Seguridad y Middlewares
CORS: Habilitado para permitir peticiones desde el cliente web.

Autenticación: Implementación de JWT (JSON Web Tokens). Las rutas protegidas requieren el header Authorization: Bearer <token>.

Encriptación: Uso de bcryptjs con Salt Round = 10 para contraseñas.

4.2. Endpoints
POST /api/auth/register

Recibe: username, email, password.

Acción: Encripta y guarda el usuario.

POST /api/auth/login

Recibe: email, password.

Devuelve: JWT Token y datos básicos del usuario.

POST /api/plan/generate (Ruta Protegida)

Recibe: Datos biométricos en el body. (El user_id se extrae del JWT por seguridad).

Acción:

Limpia los datos de entrada.

Construye el prompt con contexto dinámico.

Realiza la llamada a Groq API.

Limpia la respuesta asegurando formato JSON estricto.

Guarda el plan en user_profiles (Upsert: ON DUPLICATE KEY UPDATE).

Devuelve: Estructura JSON del plan.

5. Especificación de Integración de IA (Groq/Llama 3)
Para asegurar el determinismo en las respuestas del LLM, se define un SYSTEM_PROMPT estricto con las siguientes reglas:

Debe actuar como un entrenador de élite.

Prohibido generar texto introductorio o de despedida.

Salida obligatoria: Formato JSON puro.

Contrato de Datos (Data Contract) JSON
El frontend asume que el backend siempre devolverá esta estructura exacta:

JSON
{
  "rutina": [
    {
      "dia": "string (ej: lunes)",
      "ejercicios": ["string", "string", "string"]
    }
  ],
  "dieta": {
    "calorias_diarias": "number",
    "distribucion_macros": {
      "proteina": "string (ej: 150g)",
      "carbos": "string",
      "grasas": "string"
    },
    "ejemplo_comida": "string"
  }
}
6. Especificación del Frontend (UI/UX)
6.1. Lineamientos de Diseño
Estética: Dark Mode Deportivo. Backgrounds oscuros (#121212, zinc-900), acentos en verde (emerald-400) y naranja (orange-400).

Framework: ReactJS (Vite) + Tailwind CSS.

Responsividad: Mobile-first approach para visualización de tablas en móviles.

6.2. Componentes Clave y Estado
Axios Interceptor: Configurado en api.js para adjuntar automáticamente el token JWT en cada petición saliente.

AuthContext: Gestor de estado global para mantener la sesión del usuario persistente en el localStorage.

ProtectedRoute: Componente de enrutamiento que redirige al /login si no hay sesión activa.

Dashboard: * Formulario de captura de datos con Error Handling y botón con estado de carga (Spinner).

Renderizado Dinámico: Iteración del JSON recibido para construir visualmente "Tarjetas de Rutina" y un "Panel de Macros" de fácil lectura.