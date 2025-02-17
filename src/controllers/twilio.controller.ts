import { TwilioService } from "@/services/twilio.service"; // Импортируем сервисы
import { TwilioRepository } from "@/repositories/twilio.repository";

import { IRequestStrict } from 'itty-router'

export class TwilioController {
    constructor(private twilioService:TwilioService) {
    }

    async getAvailableCountries(req: Request): Promise<Response> {
        const countries = await this.twilioService.getAvailableCountries();
        return new Response(JSON.stringify({ countries }), {
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

    async setWebhook(req:Request): Promise<Response> {
        const { sid, smsWebhook, callWebhook }: { sid: string; smsWebhook: string, callWebhook:string } =
            await req.json();

        await this.twilioService.setWebhook(sid, smsWebhook, callWebhook);
        return new Response("Success", {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}
