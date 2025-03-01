import { z } from "zod";
import { ISmsService } from "@/modules/sms/sms.service";
import { UserService } from "@/modules/user/user.service";
import { IRequest } from "@/common/types";
import { Env } from "@/common/utils/environment";

export class SmsController {
    constructor(private smsService: ISmsService, private userService: UserService) {
    }

    async sendSmsToNumber(req: IRequest, env:Env): Promise<Response> {
        const { number, text } = z.object({
                number: z.string()
                .min(10, "Номер должен содержать минимум 10 символов")
                .max(20, "Номер должен содержать максимум 20 символов")
                .regex(/^\+?\d+$/, "Номер должен содержать только цифры и может начинаться с +"),
                text: z.string()
                .min(1, "Текст сообщения не может быть пустым")
                .max(1000, "Текст сообщения не должен превышать 1000 символов"),
            }).parse(await req.json());
            
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

    async handleSmsWebhook(req:IRequest) {
        return new Response(JSON.stringify({message: "Success"}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}