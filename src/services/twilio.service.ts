import { Country } from "@/types";
import { TwilioRepository } from "@/repositories/twilio.repository";

export interface ITwilioService {
    getAvailableCountries(): Promise<any>;
    getAvailableNumbersByIso(iso: string): Promise<any>;
    callToNumber(number: string): Promise<any>;
    connectCall(): Promise<any>;
    sendSmsToNumber(number: string, text: string): Promise<any>;
    setWebhook(sid: string, smsWebhook: string, callWebhook: string): Promise<void>;
    createNumber(number: string);
    getCalls(number: string): Promise<any>;
}

export class TwilioService implements ITwilioService {
    constructor(private twilioRepository: TwilioRepository) {
    }

    async getAvailableCountries(): Promise<Country[]> {
        return await this.twilioRepository.getAvailableCountries();
    }

    async getAvailableNumbersByIso(iso: string): Promise<any> {
        const numbers =
            await this.twilioRepository.getLocalNumbersByCountryIso(iso);
        console.log(numbers)

        const prices = await this.twilioRepository.getNumersPrices(iso);
        const salePrice =
            prices.phoneNumberPrices.find(
                (value) => value.number_type === "local"
            ).base_price * 5;

        return numbers.map((n) => ({
            friendlyName: n.friendlyName,
            phoneNumber: n.phoneNumber,
            isoCountry: n.isoCountry,
            locality: n.locality,
            //sid: n.sid,
            salePrice,
        }));
    }

    async callToNumber(number: string) {
        return await this.twilioRepository.callToNumber(number);
    }

    async connectCall() {
        return await this.twilioRepository.connectCall();
    }

    async sendSmsToNumber(number: string, text: string) {
        return await this.twilioRepository.sendSmsToNumber(number, text);
    }

    async setWebhook(sid:string, smsWebhook:string, callWebhook:string) {
        return await this.twilioRepository.setWebhook(sid, smsWebhook, callWebhook);
    }

    async createNumber(number: string) {
        return await this.twilioRepository.createNumber(number);
    }

    async getCalls(number:string) {
        return await this.twilioRepository.getCalls(number);
    }
}
