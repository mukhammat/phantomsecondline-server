// src/models/user.model.ts
export interface UserModel {
    id: string; // Уникальный идентификатор пользователя
    phone_id: string; // Идентификатор телефона
    balance: number;
}