import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"
import { authorization } from '@/middleware/authorize';

const router = Router();

const smsController = bootstrap.createSmsController();

router
.post('/api/number/send-sms', authorization, smsController.sendSmsToNumber.bind(smsController))

export default router;