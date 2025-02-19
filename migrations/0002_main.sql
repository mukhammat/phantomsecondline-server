-- Migration number: 0002 	 2025-02-18T20:29:44.952Z
DROP TABLE users;
DROP TABLE numbers;
DROP TABLE messages;
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

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender VARCHAR(20) NOT NULL, -- отправитель (раньше "from")
  receiver VARCHAR(20) NOT NULL, -- получатель (раньше "to")
  "text" TEXT NOT NULL,
  is_outgoing INTEGER DEFAULT 0 CHECK (is_outgoing IN (0, 1)), -- 0 = входящее, 1 = исходящее
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Автоустановка времени создания
  user_id INTEGER NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);