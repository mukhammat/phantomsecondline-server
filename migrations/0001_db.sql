-- Migration number: 0001 	 2025-02-13T16:27:35.886Z
DROP TABLE users;
DROP TABLE numbers;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_id VARCHAR NOT NULL UNIQUE,
  balance REAL NOT NULL DEFAULT 0
);

-- Создание таблицы numbers
CREATE TABLE numbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  local_number VARCHAR(20) NOT NULL UNIQUE,
  sid VARCHAR NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,  -- Связь с users.id (Один пользователь - несколько номеров)
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);