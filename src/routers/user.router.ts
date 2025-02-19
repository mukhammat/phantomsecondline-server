import { Router } from 'itty-router'
import bootstrap from "@/bootstrap"

const router = Router();

const userController = bootstrap.createUserController();

router
.post('/api/user/register', userController.registerUser.bind(userController));
export default router;
