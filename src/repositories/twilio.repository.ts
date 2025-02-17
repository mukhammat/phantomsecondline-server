import twilio, { twiml } from "twilio";
import { Country } from "@/types";

const accountSid =
    process.env.TWILIO_ACCOUNT_SID || "AC7d4be67e548f20db1cb36046b5086b88";
const authToken =
    process.env.TWILIO_AUTH_TOKEN || "aee33f974254f81fb1af063688a21815";
const client = twilio(accountSid, authToken);

export interface ITwilioRepository {
    getAvailableCountries(): Promise<Country[]>;
    getLocalNumbersByCountryIso(iso: string);
    getNumersPrices(iso: string);
    callToNumber(toNumber: string);
    connectCall(): Promise<string>;
    sendSmsToNumber(number: string, text: string);
    setWebhook(sid: string, smsWebhook: string, callWebhook: string): Promise<void>;
    createNumber(number: string);
    getCalls(number: string);
    deleteNumber(sid:string);
}

export class TwilioRepository {
    async getAvailableCountries(): Promise<Country[]> {
        const countries =
            await client.pricing.v1.phoneNumbers.countries.list();
        return countries.map((c) => ({
            iso: c.isoCountry,
            country: c.country,
        }));
    }

    async getLocalNumbersByCountryIso(iso: string) {
        const locals = await client.availablePhoneNumbers(iso).local.list({
            limit:20
        });
        return locals;
    }

    async getNumersPrices(iso: string) {
        const prices = await client.pricing.v1.phoneNumbers
            .countries(iso)
            .fetch();
        return prices;
    }

    //На данный момент не работает
    async callToNumber(toNumber: string) {
        const call = await client.calls.create({
            //url: `http://localhost:8787/api/connect-call`,
            twiml: `<Response><Say language="ru-RU">Зайнаб, зайнаб зайнаб ваш телефон был взломан если что!!!?</Say></Response>`,
            from: "+18312176505",
            to: toNumber,
        });
        return call.sid;
    }
    
    async connectCall() {
        const twiml = new twilio.twiml.VoiceResponse();
        
        const dial = twiml.dial({});
        dial.conference("room-1");
    
        
        return twiml.toString();
    }
    
    // Отправка смс на номер
    async sendSmsToNumber(number: string, text: string) {
        const message = await client.messages.create({
            body: text,
            from: "+18286757829",
            to: number,
        });
        return message;
    }

    // Установка webhook для sms
    async setWebhook(sid:string, smsWebhook:string, callWebhook:string): Promise<void> {
        const incomingPhoneNumbers = await client.incomingPhoneNumbers.list({
            limit: 20,
        });
        console.log(incomingPhoneNumbers);
        await client.incomingPhoneNumbers(sid).update({ smsUrl: smsWebhook, voiceUrl:callWebhook  });
        return;
    }

    async createNumber(number: string) {
        const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
            phoneNumber: number,
        });

        if(incomingPhoneNumber === undefined) {
            return "no number"
        }
        
        return incomingPhoneNumber;
    }

    async getCalls (number: string) {
        const calls = await client.calls.list({ from: number, limit: 10 });
        console.log(calls);
        return calls;
    }

    async deleteNumber (sid: string) {
        const deletedPhoneNumber = await client.incomingPhoneNumbers(sid).remove();
        console.log(deletedPhoneNumber);
        return deletedPhoneNumber;
    }
}
