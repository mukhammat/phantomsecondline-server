import { UserService } from "@/modules/user/user.service";
import { Env } from "@/common/utils/environment";
import { z } from "zod";

const UserValidation = {
    registerUser: z.object({ phone_id: z.string().min(1) }),
}

export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    async registerUser(req: Request, env:Env):Promise<Response> {
        const { phone_id } = UserValidation.registerUser.parse(await req.json());
        await this.userService.register(phone_id, env.DB);
        return new Response(JSON.stringify({ "message": "Success", "status": 200 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}