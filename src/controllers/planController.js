const pool = require('../config/db');
const { generatePlanWithLLM } = require('../services/llmService');

const REQUIRED_FIELDS = [
  'user_id',
  'age',
  'gender',
  'weight',
  'height',
  'goal',
  'days_available'
];

function validateRequiredFields(body) {
  const missing = REQUIRED_FIELDS.filter((field) => body[field] === null || body[field] === undefined);
  return missing;
}

async function generatePlan(req, res) {
  try {
    const missing = validateRequiredFields(req.body);
    if (missing.length) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        missing_fields: missing
      });
    }

    const profile = {
      user_id: req.body.user_id,
      age: req.body.age,
      gender: req.body.gender,
      weight: req.body.weight,
      height: req.body.height,
      goal: req.body.goal,
      days_available: req.body.days_available
    };

    const plan = await generatePlanWithLLM(profile);

    await pool.query(
      `INSERT INTO user_profiles (user_id, age, gender, weight, height, goal, days_available, last_generated_plan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         age = VALUES(age),
         gender = VALUES(gender),
         weight = VALUES(weight),
         height = VALUES(height),
         goal = VALUES(goal),
         days_available = VALUES(days_available),
         last_generated_plan = VALUES(last_generated_plan)`,
      [
        profile.user_id,
        profile.age,
        profile.gender,
        profile.weight,
        profile.height,
        profile.goal,
        profile.days_available,
        JSON.stringify(plan)
      ]
    );

    return res.status(201).json(plan);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar el plan',
      message: error.message
    });
  }
}

module.exports = { generatePlan };
