import { Router } from 'itty-router'
import { TwilioController } from '@/controllers/twilio.controller'
import {authorization} from "@/middleware/authorize"

const router = Router();
const twilioController = TwilioController.create()

router
  .get('/api/countries', twilioController.getAvailableCountries.bind(twilioController))
  .post('/api/sendMessage', twilioController.sendSmsToNumber.bind(twilioController))
  .post('/api/set-webhook', twilioController.setWebhook.bind(twilioController))
  .get('/api/calls', twilioController.getCalls.bind(twilioController))
  .get('/api/country/:iso', twilioController.getAvailableNumbersByIso.bind(twilioController))
  .post('/api/call', twilioController.callToNumber.bind(twilioController))
  .post('/api/connect-call', twilioController.connectCall.bind(twilioController))


export default router;