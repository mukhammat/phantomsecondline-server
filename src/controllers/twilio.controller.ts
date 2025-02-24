import { TwilioService } from "@/services/twilio.service";

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
}
