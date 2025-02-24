import { Router } from 'itty-router'
import bootstrap from '@/bootstrap';

const router = Router();
const twilioController = bootstrap.createTwilioController()

router
  .get('/api/countries', twilioController.getAvailableCountries.bind(twilioController))

export default router;