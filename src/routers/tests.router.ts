import { Router } from 'itty-router'
import { IRequest } from '@/types';
import { Env } from '@/utils/environment';
import { TwilioRepository } from '@/repositories/twilio.repository';
import { SmsService } from '@/services/sms.service';
import { NumberRepository } from '@/repositories/number.repository';
import { authorization } from '@/middleware/authorize';

const router = Router();

router.get('/api/test/getMessages', authorization, async (req:IRequest, env:Env) => {
  try {
    const twilioRrpo = new TwilioRepository();
    const numberRepo = new NumberRepository();
    const sms = new SmsService(twilioRrpo, numberRepo);
    const b = await sms.getAll(req.user.id, env.DB);
    return new Response(JSON.stringify(b), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
});

export default router;