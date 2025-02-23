import { Country } from "@/types";
import { TwilioRepository } from "@/repositories/twilio.repository";
import { NumberRepository } from "@/repositories/number.repository";

export interface ITwilioService {
    getAvailableCountries(): Promise<Country[]>;
    setWebhook(user_id: string, smsWebhook: string, callWebhook: string,  db: D1Database);
}

export class TwilioService implements ITwilioService {
    constructor(private twilioRepository: TwilioRepository, private numberRepository: NumberRepository) {
    }

    async getAvailableCountries(): Promise<Country[]> {
        const countries = await this.twilioRepository.getAvailableCountries();
        return countries.map((c) => ({
            iso: c.isoCountry,
            country: c.country,
        }));
    }

    async setWebhook(user_id:string, smsWebhook:string, callWebhook:string, db: D1Database) {
        const result = await this.numberRepository.getOneOrFail(user_id, db);
        return this.twilioRepository.setWebhook(result.sid, smsWebhook, callWebhook);
    }
}
