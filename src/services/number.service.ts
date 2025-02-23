import { HttpError } from "@/error/http-error";
import { INumberRepository } from "@/repositories/number.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface INumberService {
    buyNumber(number:string, user_id:string, db: D1Database);
    getUserNumber(user_id:string, db: D1Database);
    deleteNumber(user_id:string, db: D1Database);
    getAvailableNumbersByIso(iso: string): Promise<any>
}

export class NumberService implements INumberService {
    constructor(private numberRepository: INumberRepository, private twilioRepository: ITwilioRepository) {
    }

    async buyNumber(number:string, user_id:string, db: D1Database) {
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
        return newNumber;
    }

    async getUserNumber(user_id:string, db: D1Database) {
        return await this.numberRepository.getOneOrFail(user_id, db);
    }

    async deleteNumber(user_id:string, db: D1Database) {
        const number = await this.numberRepository.getOneOrFail(user_id, db);
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