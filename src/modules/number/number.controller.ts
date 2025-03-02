import { z } from "zod";
import { IRequestStrict } from "itty-router";
import { INumberService } from "@/modules/number/number.service";
import { IRequest } from "@/common/types";
import { Env } from "@/common/utils/environment";

const NumberValidation = {
    buyNumber: z.object({ number: z.string()
        .regex(/^\+?\d+$/, "Номер должен содержать только цифры и может начинаться с +")
        .min(10, "Минимум 10 символов")
        .max(20, "Номер не больше 20 символов") }),
    getAvailableNumbersByIso: z.object({ iso: z
        .string()
        .min(2, "Минимум 2 символов")
        .max(3, "Максимум 3 симвоа ") }),
}

export class NumberController {
    constructor(private numberService:INumberService) {
    }

    async buyNumber(req:IRequest, env:Env) {
        const { number } = NumberValidation.buyNumber.parse(await req.json());

        const host = req.headers.get("host");
        await this.numberService.buyNumber(number, req.user.id, host ,env.DB);
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
        const {iso} = z.object({ iso: z
            .string()
            .min(2, "Минимум 2 символов")
            .max(3, "Максимум 3 симвоа ") })
            .parse(req.params);
        const countryData =
            await this.numberService.getAvailableNumbersByIso(iso);
        return new Response(JSON.stringify(countryData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getAvailableCountries(req: Request): Promise<Response> {
        const countries = await this.numberService.getAvailableCountries();
        return new Response(JSON.stringify({ countries }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}