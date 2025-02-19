import { Country } from "@/types";
import { TwilioRepository } from "@/repositories/twilio.repository";
import { NumberRepository } from "@/repositories/number.repository";
import { NumberModel } from "@/models/number.model";
import { HttpError } from "@/error/http-error";

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
        const num = (await this.numberRepository.getUserNumbers(user_id, db)).results[0] as NumberModel;
        return this.twilioRepository.setWebhook(num.sid, smsWebhook, callWebhook);
    }
}
