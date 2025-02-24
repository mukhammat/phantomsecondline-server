import { HttpError } from "@/error/http-error";
import { NumberModel } from "@/models/number.model";

export interface INumberRepository {
    create(number:string, user_id:string, db: D1Database):Promise<D1Result>;
    findByNumber(phone: string, db: D1Database):Promise<NumberModel | null>;
    getAll(user_id:string, db: D1Database, options?: { limit?: number; offset?: number }):Promise<D1Result>;
    getOne(user_id:string, db: D1Database):Promise<NumberModel | null>
    getOneOrFail(user_id:string, db: D1Database, message?: string):Promise<NumberModel>;
    delete(sid: string, db: D1Database):Promise<void>;
}

export class NumberRepository implements INumberRepository {
    private readonly TABLE_NAME = 'numbers';
    private readonly DEFAULT_LIMIT = 10;
    private readonly DEFAULT_OFFSET = 0;

    /**
     * Создает новый номер в базе данных.
     * @param {string} number - Номер телефона.
     * @param {number} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async create(number:string, user_id:string, db: D1Database):Promise<D1Result> {
        const stmt = db.prepare(`INSERT INTO ${this.TABLE_NAME} (local_number, user_id) VALUES (?,?)`);
        const result = await stmt.bind(number, user_id).run();
        return result;
    }

    /**
     * Ищет номер в базе данных.
     * @param {string} number - Номер телефона.
     * @param {D1Database} db - База данных
     * @returns {Promise<NumberModel | null>} Результат выполнения запроса.
     */
    async findByNumber(number: string, db: D1Database): Promise<NumberModel | null> {
        const stmt = db.prepare(
            `SELECT * FROM ${this.TABLE_NAME} WHERE local_number = ?`
        );
        return await stmt.bind(number).first() || null;
    }

    /**
     * Ищет номера пользователя в базе данных.
     * @param {string} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @param {Object} options - Параметры пагинации
     * @param {number} [options.limit=10] - Количество записей на странице
     * @param {number} [options.offset=0] - Смещение от начала
     * @returns {Promise<D1Result>} Результат выполнения запроса.
     */
    async getAll( user_id: string, db: D1Database, options?: { limit?: number; offset?: number }): Promise<D1Result> {
        const limit = options?.limit || this.DEFAULT_LIMIT;
        const offset = options?.offset || this.DEFAULT_OFFSET;

        const stmt = db.prepare(
            `SELECT * FROM ${this.TABLE_NAME} 
             WHERE user_id = ? 
             LIMIT ? OFFSET ?`
        );
        return await stmt.bind(user_id, limit, offset).run();
    }

    /**
     * Выводит первый номер пользователя в базе данных.
     * @param {string} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @returns {Promise<NumberModel | null>} Результат выполнения запроса.
     */
    async getOne(user_id:string, db: D1Database):Promise<NumberModel | null> {
        const stmt = db.prepare(`SELECT * FROM ${this.TABLE_NAME} WHERE user_id = ? LIMIT 1`);
        return await stmt.bind(user_id).first() || null;
    }

    /**
     * Выводит первый номер пользователя в базе данных или ошибку.
     * @param {string} user_id - Идентификатор пользователя.
     * @param {D1Database} db - База данных
     * @param {string} message - Сообщения об ошибке
     * @returns {Promise<NumberModel>} Результат выполнения запроса.
     */
    async getOneOrFail( user_id:string, db: D1Database, message: string = "You don't have active number" ):Promise<NumberModel> {
        const number = await this.getOne(user_id, db);
        if(!number) {
            throw new HttpError(message,404);
        }
        return number;
    }

    /**
     * Удаляет с бд номер
     * @param sid 
     * @param db
     * @returns Promice<void>
     */
    async delete(sid: string, db: D1Database):Promise<void> {
        const deleteStmt = db.prepare(`DELETE FROM ${this.TABLE_NAME} WHERE sid = ?`);
        await deleteStmt.bind(sid).run();
    }
}