1. Objetivo del Proyecto
Construir una Single Page Application (SPA) en React.js que consuma los servicios de la API "UrquiCoach". El diseño debe ser moderno, responsivo (mobile-first) y con una estética de "Dark Mode" deportivo (estilo GymShark o Nike).

2. Restricciones Críticas (No tocar el Backend)
Independencia: El Frontend es un proyecto totalmente aparte. No debe modificar ninguna carpeta, base de datos o archivo del backend existente.

Comunicación: Se comunicará con el backend exclusivamente vía HTTP (Axios) a http://localhost:3000/api.

Seguridad: Debe manejar el Bearer Token en los headers de las peticiones protegidas.

3. Stack Tecnológico Sugerido
Framework: React.js (Vite preferiblemente por velocidad).

Estilos: Tailwind CSS (para un diseño "bonito" y rápido).

Iconos: Lucide-React o FontAwesome.

Navegación: React Router Dom.

Peticiones: Axios.

4. Estructura de Pantallas y Flujos
Landing / Login: * Formulario de inicio de sesión (Email/Password).

Link a Registro.

Al loguearse, guardar el token en localStorage.

Dashboard (Home):

Vista principal con un botón destacado: "Generar Nuevo Plan".

Si ya existe un plan en el perfil, mostrar un resumen visual.

Formulario de Datos Físicos (Stepper):

Input para: Edad, Género (Select), Peso, Altura, Objetivo (Select), Días disponibles.

Botón de "Generar con IA" (mostrar un Loader/Spinner mientras procesa).

Visualizador de Plan (La joya de la corona):

Rutina: Mostrar tarjetas por cada día de la semana con su lista de ejercicios.

Dieta: Un panel con los Macros (Proteína, Carbos, Grasas) en barras de progreso o círculos, y el plan de comidas bien organizado.

5. Contrato de Integración (Basado en Backend existente)
El Frontend debe enviar y recibir los datos exactamente como el Backend ya los procesa:

Endpoint Auth: POST /api/auth/login -> recibe {token, user}.

Endpoint Plan: POST /api/plan/generate -> envía el perfil y recibe el JSON con rutina y dieta.

6. Entregables Esperados
Instrucciones de instalación: Comandos npm create vite@latest, npm install.

Estructura de Carpetas: /src/components, /src/pages, /src/services, /src/context.

Manejo de Estado: Uso de AuthContext para proteger las rutas (no dejar entrar al Dashboard si no hay token).