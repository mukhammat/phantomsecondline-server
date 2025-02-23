import { ISmsService } from "@/services/sms.service";
import { UserService } from "@/services/user.service";
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";

export class SmsController {
    constructor(private smsService: ISmsService, private userService: UserService) {
    }

    async sendSmsToNumber(req: IRequest, env:Env): Promise<Response> {
        const { number, text }: { number: string; text: string } =
            await req.json();
        const id = req.user.id;
        const db = env.DB;
        const message = await this.smsService.sendSmsToNumber(
            number,
            text,
            id,
            db
        );
        await this.userService.deductBalance(id, message.price, db);
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