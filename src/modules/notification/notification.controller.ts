import { z } from "zod";
import { IRequestStrict } from "itty-router";
import { INumberService } from "@/modules/number/number.service";

export class NotifactionController {
    constructor(private numberService:INumberService) {
    }
}