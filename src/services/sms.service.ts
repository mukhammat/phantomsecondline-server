import { NumberModel } from "@/models/number.model";
import { INumberRepository } from "@/repositories/number.repository";
import { ITwilioRepository } from "@/repositories/twilio.repository";

export interface ISmsService {
    sendSmsToNumber(number: string, text: string, user_id: string,  db: D1Database);
    getAll(user_id: string, db:D1Database);
}

export class SmsService implements ISmsService {
    constructor(
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
        return messageInstance.status;
    }

    async getAll(user_id: string, db:D1Database) {
        const hasNumber = await this.numberRepository.getOne(user_id, db) as NumberModel | null;
        if(!hasNumber) {
            return hasNumber;
        }
        const outbound = await this.twilioRepository.getOutbound(hasNumber.local_number);
        const inbound = await this.twilioRepository.getInbound(hasNumber.local_number)
        const allMessages = [...outbound, ...inbound];
        return allMessages.sort((a, b) => new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime());
    }
}