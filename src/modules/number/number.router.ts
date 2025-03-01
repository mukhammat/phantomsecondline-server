import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"
import { authorization } from '@/common/middleware/authorize';

const router = Router();

const numberController = bootstrap.createNumberController();

router
.post('/api/number/buy-number', authorization, numberController.buyNumber.bind(numberController))
.get('/api/number/my-number', authorization, numberController.getMyNumber.bind(numberController))
.delete('/api/number/delete', authorization, numberController.deleteNumber.bind(numberController))
.get('/api/number/available-numbers/:iso', numberController.getAvailableNumbersByIso.bind(numberController))
.get('/api/countries', numberController.getAvailableCountries.bind(numberController));

export default router;