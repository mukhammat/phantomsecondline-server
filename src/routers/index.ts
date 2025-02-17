import { Router } from 'itty-router'
import twilioRouter from './twilio.router'
import userRouter from './user.router'
import numberRouter from './number.router'
import { errorHandler } from "@/middleware/error-handler"
import smsRouter from './sms.router'
import callRouter from './call.router'

const router = Router({
  catch: errorHandler
});

router.all('/api/*', numberRouter.fetch);
router.all('/api/*', twilioRouter.fetch);
router.all('/api/*', userRouter.fetch);
router.all('/api/*', smsRouter.fetch);
router.all('/api/*', callRouter.fetch);

router.all('*', ()=> {
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
});

export default router
