// src/models/user.model.ts
export interface User {
    id: string; // Уникальный идентификатор пользователя
    phone_id: string; // Идентификатор телефона
    balance: number;
}