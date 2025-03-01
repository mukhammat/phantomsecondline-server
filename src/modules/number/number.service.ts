import { HttpError } from "@/common/error/http-error";
import { Country } from "@/common/types";
import { INumberRepository } from "@/modules/number/number.repository";
import { ITwilioService } from "@/common/services/twilio.service";

export interface INumberService {
    buyNumber(number:string, user_id:string, url: string, db: D1Database);
    getUserNumber(user_id:string, db: D1Database);
    deleteNumber(user_id:string, db: D1Database):Promise<void>;
    getAvailableNumbersByIso(iso: string): Promise<any>;
    getAvailableCountries(): Promise<Country[]>;
}

export class NumberService implements INumberService {
    private readonly SMS_WEBHOOK_PATH = "/api/sms/webhook";
    private readonly CALL_WEBHOOK_PATH = "/api/call/webhook";

    constructor(private numberRepository: INumberRepository, private twilioService: ITwilioService) {
    }

    private async setWebhooks(sid:string, url:string):Promise<void> {
        await this.twilioService.setWebhook(sid, `${url}${this.SMS_WEBHOOK_PATH}`, `${url}${this.CALL_WEBHOOK_PATH}`);
    }

    async buyNumber(number:string, user_id:string, host:string, db: D1Database) {
        const isNumber = await this.numberRepository.findByNumber(number, db);
        if(isNumber) {
            throw new HttpError("Номер не доступен!", 404);
        }

        const userNumbers = await this.numberRepository.getOne(user_id, db);
        if(userNumbers) {
            throw new HttpError("Вы не можете иметь больше 1 номера!", 404);
        }

        const newNumber = await this.twilioService.createNumber(number);
        await this.numberRepository.create(number, user_id, db);
        await this.setWebhooks(newNumber.sid, host);
        return newNumber;
    }

    async getUserNumber(user_id:string, db: D1Database) {
        return await this.numberRepository.getOneOrFail(user_id, db);
    }

    async deleteNumber(user_id:string, db: D1Database):Promise<void> {
        const number = await this.numberRepository.getOneOrFail(user_id, db);
        await this.numberRepository.delete(number.sid, db);
        await this.twilioService.deleteNumber(number.sid);
    }

    async getAvailableNumbersByIso(iso: string): Promise<any> {
        const number =
            await this.twilioService.getLocalNumbersByCountryIso(iso);

        const prices = await this.twilioService.getNumersPrices(iso);
        const salePrice =
            prices.phoneNumberPrices.find(
                (value) => value.number_type === "local"
            ).base_price * 5;

        return number.map((n) => ({
            friendlyName: n.friendlyName,
            phoneNumber: n.phoneNumber,
            isoCountry: n.isoCountry,
            locality: n.locality,
            //sid: n.sid,
            salePrice,
        }));
    }

    async getAvailableCountries(): Promise<Country[]> {
        const countries = await this.twilioService.getAvailableCountries();
        return countries.map((c) => ({
            iso: c.isoCountry,
            country: c.country,
        }));
    }
}