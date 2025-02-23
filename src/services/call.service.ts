import { NumberRepository } from "@/repositories/number.repository";
import { TwilioRepository } from "@/repositories/twilio.repository";

export interface ICallService {
    callToNumber(to:string, user_id:string, db:D1Database);
    getCalls(user_id:string, db: D1Database);
}

export class CallService implements ICallService {
    constructor(private numberRepository:NumberRepository, private twilioRepository:TwilioRepository){}

    async callToNumber(to:string, user_id:string, db:D1Database) {
        const result = await this.numberRepository.getOneOrFail(user_id, db);
        return await this.twilioRepository.callToNumber(to, result.local_number);
    }

    async getCalls(user_id:string, db: D1Database) {
        const numbers = await this.numberRepository.getOneOrFail(user_id, db);
        return await this.twilioRepository.getCalls(numbers.local_number);
    }
}