import { ICallService } from "@/services/call.service";
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";

export class CallController {
    constructor(private callService: ICallService) {
    }

    async callToNumber(req: IRequest, env:Env): Promise<Response> {
        const { to }: { to: string } =
            await req.json();
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
}