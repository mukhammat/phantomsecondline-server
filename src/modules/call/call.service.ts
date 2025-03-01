import { NumberRepository } from "@/modules/number/number.repository";
import { ITwilioService } from "@/common/services/twilio.service";

export interface ICallService {
    callToNumber(to:string, user_id:string, db:D1Database);
    getCalls(user_id:string, db: D1Database);
}

export class CallService implements ICallService {
    constructor(private numberRepository:NumberRepository, private twilioService:ITwilioService){}

    async callToNumber(to:string, user_id:string, db:D1Database) {
        const result = await this.numberRepository.getOneOrFail(user_id, db);
        return await this.twilioService.callToNumber(to, result.local_number);
    }

    async getCalls(user_id:string, db: D1Database) {
        const numbers = await this.numberRepository.getOneOrFail(user_id, db);
        return await this.twilioService.getCalls(numbers.local_number);
    }
}