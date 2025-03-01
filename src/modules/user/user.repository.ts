import { UserModel } from "@/modules/user/user.model";

export interface IUserRepository {
    create(phone_id: string, db: D1Database):Promise<D1Result>;
    findByPhoneID(phone_id: string, db: D1Database):Promise<D1Result>;
    getBalance( user_id:string, db: D1Database ):Promise<number | null>;
    deductBalance(user_id: string, amount: number, db: D1Database): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
    /**
     * Создает нового пользователя в базе данных.
     * @param {string} phone_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async create(phone_id: string, db: D1Database):Promise<D1Result> {
        console.log("Create", phone_id);
        const stmt = db.prepare(`INSERT INTO users (phone_id) VALUES (?)`);
        const result = await stmt.bind(phone_id).run();
        return result;
    }

    /**
     * Ищет пользователя в базе данных.
     * @param {string} phone_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async findByPhoneID(phone_id: string, db: D1Database):Promise<D1Result> {
        const stmt = db.prepare(`SELECT * FROM users WHERE phone_id = ?`);
        const result = await stmt.bind(phone_id).run();
        return result;
    }

    async getBalance( user_id:string, db: D1Database ):Promise<number | null> {
        const stmt = db.prepare(`SELECT balance FROM users WHERE id = ?`);
        const result:UserModel|null = await stmt.bind(user_id).first();
        return result?.balance;
    }

    async deductBalance(user_id: string, amount: number, db: D1Database): Promise<boolean> {
        const stmt = db.prepare(`UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?`);
        const result = await stmt.bind(amount, user_id, amount).run();
        return result.success;
    }
}