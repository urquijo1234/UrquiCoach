CREATE DATABASE IF NOT EXISTS gym_app;
USE gym_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id INT PRIMARY KEY,
  age INT NOT NULL,
  gender ENUM('masculino', 'femenino', 'otro') NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  goal ENUM('volumen', 'definicion', 'recomposicion') NOT NULL,
  days_available INT NOT NULL,
  last_generated_plan JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_profiles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
