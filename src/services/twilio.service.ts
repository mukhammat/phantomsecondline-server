import { Country } from "@/types";
import { TwilioRepository } from "@/repositories/twilio.repository";
import { NumberRepository } from "@/repositories/number.repository";
import { NumberModel } from "@/models/number.model";

export interface ITwilioService {
    getAvailableCountries(): Promise<any>;
    setWebhook(user_id: string, smsWebhook: string, callWebhook: string,  db: D1Database);
}

export class TwilioService implements ITwilioService {
    constructor(private twilioRepository: TwilioRepository, private numberRepository: NumberRepository) {
    }

    async getAvailableCountries(): Promise<Country[]> {
        return await this.twilioRepository.getAvailableCountries();
    }

    async setWebhook(user_id:string, smsWebhook:string, callWebhook:string, db: D1Database) {
        const num = (await this.numberRepository.getUserNumbers(user_id, db)).results[0] as NumberModel;
        return this.twilioRepository.setWebhook(num.sid, smsWebhook, callWebhook);
    }
}
