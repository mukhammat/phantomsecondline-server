import { Router } from 'itty-router'
import { UserController } from '@/controllers/user.controller'
import { createUserController } from '@/bootstrap';

const router = Router();

const userController = createUserController();

router
.post('/api/auth/register', userController.registerUser.bind(userController));
export default router;
