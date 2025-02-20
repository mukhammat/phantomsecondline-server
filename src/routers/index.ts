import { Router } from 'itty-router'
import twilioRouter from './twilio.router'
import userRouter from './user.router'
import numberRouter from './number.router'
import { errorHandler } from "@/middleware/error-handler"
import smsRouter from './sms.router'
import callRouter from './call.router'
import testsRouter from './tests.router'
import swaggerRouter from '@/routers/swagger'

const router = Router({
  catch: errorHandler
});

router.all('/api/*', twilioRouter.fetch);
router.all('/api/number/*', numberRouter.fetch);
router.all('/api/user/*', userRouter.fetch);
router.all('/api/sms/*', smsRouter.fetch);
router.all('/api/call/*', callRouter.fetch);
router.all('/api/test/*', testsRouter.fetch)
router.all('/swagger/*', swaggerRouter.fetch);
router.all('*', ()=> {
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
});

export default router
