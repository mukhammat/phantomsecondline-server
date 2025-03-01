import { UserService } from "@/modules/user/user.service";
import { Env } from "@/common/utils/environment";
import { z } from "zod";

export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    async registerUser(req: Request, env:Env):Promise<Response> {
        const { phone_id } = z.object({ phone_id: z.string().min(1) }).parse(await req.json());
        const user = await this.userService.register(phone_id, env.DB);
        return new Response(JSON.stringify({ "message": "Success", "status": 200 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}