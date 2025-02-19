import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"
import { authorization } from '@/middleware/authorize';

const router = Router();

const smsController = bootstrap.createSmsController();

router
.post('/api/sms/send', authorization, smsController.sendSmsToNumber.bind(smsController))
.get('/api/sms/get-all', authorization, smsController.getAll.bind(smsController))

export default router;