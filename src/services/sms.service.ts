import { HttpError } from "@/error/http-error";
import { NumberModel } from "@/models/number.model";
import { SmsModel } from "@/models/sms.model";
import { INumberRepository } from "@/repositories/number.repository";
import { ISmsRepository } from "@/repositories/sms.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface ISmsService {
    sendSmsToNumber(number: string, text: string, user_id: string,  db: D1Database);
}

export class SmsService implements ISmsService {
    constructor(
        private smsRepository: ISmsRepository,
        private twilioRepository: ITwilioRepository, 
        private numberRepository:INumberRepository
    ) {
    }

    async sendSmsToNumber(number: string, text: string, user_id: string, db: D1Database) {
        const hasNumber = await this.numberRepository.getOne(user_id, db) as NumberModel | null;
        if(!hasNumber) {
            return null;
        }
        const messageInstance = await this.twilioRepository.sendSmsToNumber(number, text, hasNumber.local_number);
        await this.smsRepository.create({user_id:user_id, sender: hasNumber.local_number, receiver: number, text: text, is_outgoing: 1 },db);
        return messageInstance.status;
    }
}