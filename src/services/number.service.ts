import { HttpError } from "@/error/http-error";
import { Number } from "@/models/number.model";
import { INumberRepository } from "@/repositories/number.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface INumberService {
    buyNumber(number:string, user_id:string, db: D1Database);
    getUserNumber(user_id:string, db: D1Database);
    deleteNumber(user_id:string, db: D1Database);
}

export class NumberService implements INumberService {
    constructor(private numberRepository: INumberRepository, private twilioRepository: ITwilioRepository) {
    }

    async buyNumber(number:string, user_id:string, db: D1Database) {
        const isNumber = await this.numberRepository.findByNumber(number, db);
        if(isNumber.results.length >= 1) {
            throw new HttpError("Номер не доступен!", 404);
        }

        const userNumbers = await this.numberRepository.getUserNumbers(user_id, db);
        if(userNumbers.results.length >= 1) {
            throw new HttpError("Вы не можете иметь больше 1 номера!", 404);
        }

        const newNumber = await this.twilioRepository.createNumber(number);
        await this.numberRepository.create(number, user_id, db);
        return newNumber;
    }

    async getUserNumber(user_id:string, db: D1Database) {
        const numbers = await this.numberRepository.getUserNumbers(user_id, db);
        if(numbers.results.length > 1) {
            return numbers.results;
        }
        return numbers.results[0];
    }

    async deleteNumber(user_id:string, db: D1Database) {
        const numbers = await this.numberRepository.getUserNumbers(user_id, db);
        if(numbers.results.length > 1) {
            throw new HttpError("Номер не найден", 404);
        }
        console.log(numbers.results[0]);
        return 0;
        //const remove = await this.twilioRepository.deleteNumber(numbers.results[0].sid);
    }
}