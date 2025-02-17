import { Router } from 'itty-router'
import bootstrap from '@/bootstrap';
import {authorization} from "@/middleware/authorize"

const router = Router();
const twilioController = bootstrap.createTwilioController()

router
  .get('/api/countries', twilioController.getAvailableCountries.bind(twilioController))
  .post('/api/set-webhook', authorization, twilioController.setWebhook.bind(twilioController))
  .post('/api/connect-call', authorization, twilioController.connectCall.bind(twilioController))


export default router;