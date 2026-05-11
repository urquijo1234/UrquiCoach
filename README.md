# UrquiCoach Backend API

API REST construida con **Node.js + Express + MySQL** para generar planes de entrenamiento y nutrición personalizados usando **Groq** con el modelo **llama-3.3-70b-versatile**.

## 1) Requisitos

- Node.js 18+
- MySQL 8+
- npm

## 2) Instalación

```bash
npm install
```

## 3) Configuración de credenciales

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

2. Completa las variables en `.env`:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_password
MYSQL_DATABASE=gym_app
GROQ_API_KEY=tu_api_key_de_groq
GROQ_BASE_URL=https://api.groq.com/openai/v1
```

### ¿Dónde consigo la credencial?

- **GROQ_API_KEY**: se obtiene en la consola de Groq (sección API Keys).
- Asegúrate de no subir `.env` al repositorio.

## 4) Base de datos

Ejecuta el script SQL para crear base y tablas:

```bash
mysql -u root -p < database.sql
```

## 5) Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

## 6) Endpoint principal

### POST `/api/plan/generate`

Body esperado:

```json
{
  "user_id": 1,
  "age": 28,
  "gender": "masculino",
  "weight": 78,
  "height": 176,
  "goal": "recomposicion",
  "days_available": 5
}
```

Respuesta (201):

```json
{
  "rutina": [{ "dia": "Lunes", "ejercicios": ["Sentadilla 4x8"] }],
  "dieta": {
    "calorias_diarias": 2400,
    "distribucion_macros": {
      "proteina": "35%",
      "carbos": "45%",
      "grasas": "20%"
    },
    "ejemplo_comida": "Pollo con arroz y verduras"
  }
}
```

## 7) Estructura de carpetas

```bash
src/
  config/
  controllers/
  routes/
  services/
  utils/
```
