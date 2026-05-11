const express = require('express');
const { generatePlan } = require('../controllers/planController');
const verifyToken = require('../middleware/authMiddleware'); // Importar el middleware

const router = express.Router();

// Ahora esta ruta requiere el Token para funcionar
router.post('/generate', verifyToken, generatePlan);

module.exports = router;