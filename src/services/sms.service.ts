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
        const result = await this.numberRepository.getOneOrFail(user_id, db);
        const messageInstance = await this.twilioRepository.sendSmsToNumber(number, text, result.local_number);
        return messageInstance.status;
    }

    async getAll(user_id: string, db:D1Database) {
        const result = await this.numberRepository.getOneOrFail(user_id, db);
        const outbound = await this.twilioRepository.getOutboundSms(result.local_number);
        const inbound = await this.twilioRepository.getInboundSms(result.local_number);
        const allMessages = [...outbound, ...inbound];
        return allMessages.sort((a, b) => new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime());
    }
}