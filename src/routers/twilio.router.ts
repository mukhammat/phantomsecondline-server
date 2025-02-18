import { Router } from 'itty-router'
import bootstrap from '@/bootstrap';
import {authorization} from "@/middleware/authorize"

const router = Router();
const twilioController = bootstrap.createTwilioController()

router
  .get('/api/countries', twilioController.getAvailableCountries.bind(twilioController))
  .post('/api/set-webhook', authorization, twilioController.setWebhook.bind(twilioController))


export default router;