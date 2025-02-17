import { NumberRepository } from "@/repositories/number.repository";
import { TwilioRepository } from "@/repositories/twilio.repository";
import { NumberModel } from "@/models/number.model";

export interface ICallService {
    callToNumber(to:string, user_id:string, db:D1Database);
    getCalls(user_id:string, db: D1Database);
}

export class CallService implements ICallService {
    constructor(private numberRepository:NumberRepository, private twilioRepository:TwilioRepository){}

    async callToNumber(to:string, user_id:string, db:D1Database) {
        const numbers = await this.numberRepository.getUserNumbers(user_id, db) as { results: NumberModel[] };
        if(numbers.results.length > 1) {
            return numbers.results;
        }
        return await this.twilioRepository.callToNumber(to, numbers.results[0].local_number);
    }

    async getCalls(user_id:string, db: D1Database) {
        const numbers = await this.numberRepository.getUserNumbers(user_id, db) as { results: NumberModel[] };
        if(numbers.results.length > 1) {
            return numbers.results;
        }
        return await this.twilioRepository.getCalls(numbers.results[0].local_number);
    }
}