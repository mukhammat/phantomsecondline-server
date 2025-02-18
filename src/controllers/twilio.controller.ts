import { TwilioService } from "@/services/twilio.service"; // Импортируем сервисы
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";

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

    async setWebhook(req:IRequest, env:Env): Promise<Response> {
        const {  smsWebhook, callWebhook }: { sid: string; smsWebhook: string, callWebhook:string } =
            await req.json();

        await this.twilioService.setWebhook(req.user.id, smsWebhook, callWebhook, env.DB);
        return new Response("Success", {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}
