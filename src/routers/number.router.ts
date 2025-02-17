import { Router } from 'itty-router'
import { createNumberController } from "@/bootstrap"
import { authorization } from '@/middleware/authorize';

const router = Router();

const numberController = createNumberController();

router
.post('/api/number/buy-number', authorization, numberController.buyNumber.bind(numberController))
.get('/api/number/get-my-number', authorization, numberController.getMyNumber.bind(numberController))
.delete('/api/number/delete-number', authorization, numberController.deleteNumber.bind(numberController))

export default router;