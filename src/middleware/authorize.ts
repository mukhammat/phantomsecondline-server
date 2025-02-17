import { RequestHandler } from 'itty-router'
import { UserRepository } from "@/repositories/user.repository";
import { Env } from "@/utils/environment";
import { IRequest } from "@/types"
import { User } from '@/models/user.model';

export const authorization:RequestHandler<IRequest> = async (req, env:Env) => {
    const phoneId = req.headers.get("X-Phone-Id");
    console.log(phoneId)
    if (!phoneId) {
        return new Response(JSON.stringify({ message: "No phoneId provided" }), { 
            status: 401, 
            headers: { "Content-Type": "application/json" } 
        });
    }

    const users = await new UserRepository().findByPhoneID(phoneId, env.DB) as { results: User[] };

    if (users.results.length === 0) {
        return new Response(JSON.stringify({ message: "Unauthorized phoneId" }), { 
            status: 403, 
            headers: { "Content-Type": "application/json" } 
        });
    }
    
    req.user = users.results[0];
};