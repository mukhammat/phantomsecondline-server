import { NumberModel } from "@/models/number.model";
import { INumberRepository } from "@/repositories/number.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface ISmsService {
    sendSmsToNumber(number: string, text: string, user_id: string,  db: D1Database);
}

export class SmsService implements ISmsService {
    constructor(private twilioRepository: ITwilioRepository, private numberRepository:INumberRepository) {
    }

    async sendSmsToNumber(number: string, text: string, user_id: string, db: D1Database) {
        const numbers = await this.numberRepository.getUserNumbers(user_id, db) as { results: NumberModel[] };
        if(numbers.results.length > 1) {
            return numbers.results;
        }
        return await this.twilioRepository.sendSmsToNumber(number, text, numbers.results[0].local_number);
    }
}