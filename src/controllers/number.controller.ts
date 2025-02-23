import { z } from "zod";
import { INumberService } from "@/services/number.service";
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";
import { IRequestStrict } from "itty-router";
import { HttpError } from "@/error/http-error";

export class NumberController {
    constructor(private numberService:INumberService) {
    }

    async buyNumber(req:IRequest, env:Env) {
        const { number } = z.object({ number: z.string().min(10).max(20) }).parse(await req.json());
        await this.numberService.buyNumber(number, req.user.id, env.DB);
        return new Response(JSON.stringify({ "message": "Номер успешно куплен!", "status": 200 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getMyNumber(req: IRequest, env: Env) {
        const numbers = await this.numberService.getUserNumber(req.user.id, env.DB);
        return new Response(JSON.stringify(numbers), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async deleteNumber(req: IRequest, env: Env) {
        await this.numberService.deleteNumber(req.user.id, env.DB);
        return new Response(JSON.stringify({ "message": "Номер успешно удален!", "status": 200 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getAvailableNumbersByIso(req: IRequestStrict) {
        const {iso} = req.params;
        const countryData =
            await this.numberService.getAvailableNumbersByIso(iso);
        return new Response(JSON.stringify(countryData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}