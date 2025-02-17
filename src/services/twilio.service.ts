import { Country } from "@/types";
import { TwilioRepository } from "@/repositories/twilio.repository";

export interface ITwilioService {
    getAvailableCountries(): Promise<any>;
    connectCall(): Promise<any>;
    setWebhook(sid: string, smsWebhook: string, callWebhook: string): Promise<void>;
}

export class TwilioService implements ITwilioService {
    constructor(private twilioRepository: TwilioRepository) {
    }

    async getAvailableCountries(): Promise<Country[]> {
        return await this.twilioRepository.getAvailableCountries();
    }

    async connectCall() {
        return await this.twilioRepository.connectCall();
    }

    async setWebhook(sid:string, smsWebhook:string, callWebhook:string) {
        return await this.twilioRepository.setWebhook(sid, smsWebhook, callWebhook);
    }
}
