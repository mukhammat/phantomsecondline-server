import { SmsModel } from "@/modules/sms/sms.model";

export interface ISmsRepository {
    create(sms:SmsModel,db: D1Database):Promise<D1Result>;
    getAll(user_id: string, db: D1Database):Promise<Record<string, unknown>[]>;
}

export class SmsRepository {
    constructor() {}

    async create(sms:SmsModel,db: D1Database):Promise<D1Result> {
        const {sender, receiver, text, is_outgoing, user_id} = sms;
        const stmt = db.prepare(`INSERT INTO messages (sender, receiver, text, is_outgoing, user_id) VALUES (?,?,?,?,?)`);
        const result = await stmt.bind(sender, receiver, text, is_outgoing||0, user_id).run();
        return result;
    }

    async getAll(user_id: string, db: D1Database):Promise<Record<string, unknown>[]> {
        const stmt = db.prepare(`SELECT * FROM messages WHERE user_id = ? ORDER BY created_at DESC;`);
        const result = await stmt.bind(user_id).all();
        return result.results;
    }
}