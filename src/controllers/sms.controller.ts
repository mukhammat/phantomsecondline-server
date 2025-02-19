import { ISmsService } from "@/services/sms.service";
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";

export class SmsController {
    constructor(private smsService: ISmsService) {
    }

    async sendSmsToNumber(req: IRequest, env:Env): Promise<Response> {
        const { number, text }: { number: string; text: string } =
            await req.json();
        const message = await this.smsService.sendSmsToNumber(
            number,
            text,
            req.user.id,
            env.DB
        );
        return new Response(JSON.stringify(message), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getAll(req:IRequest, env: Env):Promise<Response> {
        const messages = await this.smsService.getAll(req.user.id, env.DB);

        if(!messages) {
            return new Response(JSON.stringify({messages: "Не найдено!"}), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(messages), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}