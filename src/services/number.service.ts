import { HttpError } from "@/error/http-error";
import { INumberRepository } from "@/repositories/number.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface INumberService {
    buyNumber(number:string, user_id:string, url: string, db: D1Database);
    getUserNumber(user_id:string, db: D1Database);
    deleteNumber(user_id:string, db: D1Database):Promise<void>
    getAvailableNumbersByIso(iso: string): Promise<any>
}

export class NumberService implements INumberService {
    private readonly SMS_WEBHOOK_PATH = "/api/sms/webhook";
    private readonly CALL_WEBHOOK_PATH = "/api/call/webhook";

    constructor(private numberRepository: INumberRepository, private twilioRepository: ITwilioRepository) {
    }

    private async setWebhooks(sid:string, url:string):Promise<void> {
        await this.twilioRepository.setWebhook(sid, `${url}${this.SMS_WEBHOOK_PATH}`, `${url}${this.CALL_WEBHOOK_PATH}`);
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

        const newNumber = await this.twilioRepository.createNumber(number);
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
        await this.twilioRepository.deleteNumber(number.sid);
    }

    async getAvailableNumbersByIso(iso: string): Promise<any> {
        const number =
            await this.twilioRepository.getLocalNumbersByCountryIso(iso);

        const prices = await this.twilioRepository.getNumersPrices(iso);
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
}