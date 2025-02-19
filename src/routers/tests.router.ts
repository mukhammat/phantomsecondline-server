import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"
import { authorization } from '@/middleware/authorize';
import { SmsRepository } from '@/repositories/sms.repository';
import { IRequest } from '@/types';
import { Env } from '@/utils/environment';

const router = Router();

router.get('/api/test/check', authorization, async (req:IRequest, env:Env) => {
  try {
    const smsRepository = new SmsRepository();
    const result = await smsRepository.create({user_id: req.user.id, sender: "+96654384554", receiver: "+12678787686", text: "Привет! Как дела?", is_outgoing:1 }, env.DB);
    console.log(result);
    const sms = await smsRepository.getAll(req.user.id, env.DB);
    return new Response(JSON.stringify(sms), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;