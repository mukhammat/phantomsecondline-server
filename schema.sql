CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_id VARCHAR NOT NULL UNIQUE,
  balance REAL NOT NULL DEFAULT 0
);

-- Создание таблицы numbers
CREATE TABLE numbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  local_number VARCHAR(20) NOT NULL UNIQUE,
  "sid" VARCHAR NOT NULL UNIQUE,
  iso VARCHAR(5) NOT NULL,
  user_id INTEGER NOT NULL,  -- Связь с users.id (Один пользователь - несколько номеров)
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);