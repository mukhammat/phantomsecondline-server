import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"
import { authorization } from '@/middleware/authorize';

const router = Router();

const callController = bootstrap.createCallController()

router
.post('/api/call/voice-call', authorization, callController.callToNumber.bind(callController))
.get('/api/call/getCalls', authorization, callController.getCalls.bind(callController))

export default router;