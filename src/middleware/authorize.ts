import { RequestHandler } from 'itty-router'
import { UserRepository } from "@/repositories/user.repository";
import { Env } from "@/utils/environment";
import { IRequest } from "@/types"
import { UserModel } from '@/models/user.model';

export const authorization:RequestHandler<IRequest> = async (req, env:Env) => {
    try {
        const phoneId = req.headers.get("X-Phone-Id");
        
        if (!phoneId) {
            return new Response(JSON.stringify({ message: "No phoneId provided" }), { 
                status: 401, 
                headers: { "Content-Type": "application/json" } 
            });
        }
    
        const users = await new UserRepository().findByPhoneID(phoneId, env.DB) as { results: UserModel[] };
    
        if (users.results.length === 0) {
            return new Response(JSON.stringify({ message: "Unauthorized phoneId" }), { 
                status: 403, 
                headers: { "Content-Type": "application/json" } 
            });
        }
        
        req.user = users.results[0];
    } catch (error) {
        return new Response(
            JSON.stringify({
              message: error.message,
            }),
            {
              status: error.status,
              headers: { 'Content-Type': 'application/json' },
            },
        );
    }
};