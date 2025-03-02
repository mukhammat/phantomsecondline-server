import { ICallService } from "@/modules/call/call.service"
import { IRequest } from "@/common/types";
import { Env } from "@/common/utils/environment";
import { z } from "zod";

const CallValidation = {
    callToNumber: z.object({ to: z.string()
    .regex(/^\+?\d+$/, "Номер должен содержать только цифры и может начинаться с +")
    .min(10, "Минимум 10 символов")
    .max(20, "Номер не больше 20 символов")}),
}

export class CallController {
    constructor(private callService: ICallService) {
    }

    async callToNumber(req: IRequest, env:Env): Promise<Response> {
        const { to } = CallValidation.callToNumber.parse(await req.json());

        const message = await this.callService.callToNumber(
            to,
            req.user.id,
            env.DB
        );
        return new Response(JSON.stringify(message), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getCalls(req: IRequest, env:Env) {
        const calls = this.callService.getCalls(req.user.id, env.DB);
        return new Response(JSON.stringify(calls), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async handleCallWebhook(req:IRequest) {
        return new Response(JSON.stringify({message: "Success"}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}