import { TwilioService } from "@/services/twilio.service"; // Импортируем сервисы
import { TwilioRepository } from "@/repositories/twilio.repository";

import { IRequestStrict } from 'itty-router'

export class TwilioController {
    constructor(private twilioService:TwilioService) {
    }

    static create() {
        const twilioRepository = new TwilioRepository();
        const twilioService = new TwilioService(twilioRepository);
        return new TwilioController(twilioService);
    }

    // Метод для получения доступных стран
    async getAvailableCountries(req: Request): Promise<Response> {
        const countries = await this.twilioService.getAvailableCountries();
        return new Response(JSON.stringify({ countries }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Метод для получения информации о стране по ISO
    async getAvailableNumbersByIso(req: IRequestStrict): Promise<Response> {
        const {iso} = req.params;
        const countryData =
            await this.twilioService.getAvailableNumbersByIso(iso);
        return new Response(JSON.stringify(countryData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Звонок на телефон
    async callToNumber(req: Request): Promise<Response> {
        const { number }: { number:string } =
        await req.json();
        const call = await this.twilioService.callToNumber(number);
        console.log(call);
        return new Response(JSON.stringify(call), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async connectCall(req: Request): Promise<Response> {
        const call = await this.twilioService.connectCall();
        return new Response(JSON.stringify(call), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async sendSmsToNumber(req: Request): Promise<Response> {
        const { number, text }: { number: string; text: string } =
            await req.json();
        const message = await this.twilioService.sendSmsToNumber(
            number,
            text
        );
        return new Response(JSON.stringify(message), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async setWebhook(req:Request): Promise<Response> {
        const { sid, smsWebhook, callWebhook }: { sid: string; smsWebhook: string, callWebhook:string } =
            await req.json();

        await this.twilioService.setWebhook(sid, smsWebhook, callWebhook);
        return new Response("Success", {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async createNumber(req: Request): Promise<Response> {
        const { number }: { number:string } =
                await req.json();
        await this.twilioService.createNumber(number);
        return new Response("Success", {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getCalls(req: Request) {
        const url = new URL(req.url);
        const number = url.pathname.split("/")[3];

        const calls = await this.twilioService.getCalls(number);
        console.log(calls);
        return new Response(JSON.stringify({ calls }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}
