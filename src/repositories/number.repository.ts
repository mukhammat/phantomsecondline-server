export interface INumberRepository {
    create(number:string, user_id:string, db: D1Database):Promise<D1Result>;
    findByNumber(phone: string, db: D1Database):Promise<D1Result>;
    getUserNumbers(user_id:string, db: D1Database):Promise<D1Result>;
    getUserNumber(user_id:string, db: D1Database):Promise<Record<string, unknown>>
}

export class NumberRepository implements INumberRepository {
    /**
     * Создает новый номер в базе данных.
     * @param {string} number - Номер телефона.
     * @param {number} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async create(number:string, user_id:string, db: D1Database):Promise<D1Result> {
        const stmt = db.prepare(`INSERT INTO numbers (local_number, user_id) VALUES (?,?)`);
        const result = await stmt.bind(number, user_id).run();
        return result;
    }

    /**
     * Ищет номер в базе данных.
     * @param {string} phone - Номер телефона.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async findByNumber(number: string, db: D1Database):Promise<D1Result> {
        const stmt = db.prepare(`SELECT * FROM numbers WHERE local_number = ?`);
        const result = await stmt.bind(number).run();
        return result;
    }

    /**
     * Ищет номера пользователя в базе данных.
     * @param {string} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async getUserNumbers(user_id:string, db: D1Database):Promise<D1Result> {
        console.log(user_id);
        const stmt = db.prepare(`SELECT * FROM numbers WHERE user_id = ?`);
        const result = await stmt.bind(user_id).run();
        return result;
    }

    /**
     * Ищет первый номер пользователя в базе данных.
     * @param {string} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async getUserNumber(user_id:string, db: D1Database):Promise<Record<string, unknown>> {
        console.log(user_id);
        const stmt = db.prepare(`SELECT * FROM numbers WHERE user_id = ?`);
        const result = await stmt.bind(user_id).first();
        return result;
    }
}