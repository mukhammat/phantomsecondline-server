import { Router } from 'itty-router'
import userRouter from '@/modules/user/user.router'
import numberRouter from '@/modules/number/number.router'
import smsRouter from '@/modules/sms/sms.router'
import callRouter from '@/modules/call/call.router'
import swaggerRouter from '@/swagger'
import { errorHandler } from "@/common/middleware/error-handler"

import {TwilioService} from '@/common/services/twilio.service'

const router = Router({
  catch: errorHandler
});

router.get('/balance', async () => {
  const twilioService = new TwilioService();
  const balance = await twilioService.getVoiceCallPricing("+15638000884", "+17752621091");
    return new Response(
      JSON.stringify(balance),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
})

router.all('/api/*', numberRouter.fetch);
router.all('/api/user/*', userRouter.fetch);
router.all('/api/sms/*', smsRouter.fetch);
router.all('/api/call/*', callRouter.fetch);
router.all('/swagger/*', swaggerRouter.fetch);
router.all('*', ()=> {
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
});

export default router
