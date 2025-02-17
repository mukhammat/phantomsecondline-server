import { z } from "zod";
import { INumberService } from "@/services/number.service";
import { IRequest } from "@/types";
import { Env } from "@/utils/environment";
import { IRequestStrict } from "itty-router";

export class NumberController {
    constructor(private numberService:INumberService) {
    }

    async buyNumber(req:IRequest, env:Env) {
        const { number } = z.object({ number: z.string().min(10).max(20) }).parse(await req.json());
        const newNumber = await this.numberService.buyNumber(number, req.user.id, env.DB);
        return new Response(JSON.stringify(newNumber), { status: 200 });
    }

    async getMyNumber(req: IRequest, env: Env) {
        const numbers = await this.numberService.getUserNumber(req.user.id, env.DB);
        return new Response(JSON.stringify(numbers), { status: 200 });
    }

    async deleteNumber(req: IRequest, env: Env) {
        await this.numberService.deleteNumber(req.user.id, env.DB);
        return new Response("Номер успешно удален!", { status: 200 });
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