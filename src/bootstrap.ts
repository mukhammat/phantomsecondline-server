import { TwilioRepository } from "@/repositories/twilio.repository";


import { NumberRepository } from "@/repositories/number.repository";
import { NumberService } from "@/services/number.service";
import { NumberController } from "@/controllers/number.controller";
export const createNumberController = () => {
    const numberRepository = new NumberRepository();
    const twilioRepository = new TwilioRepository();
    const service =  new NumberService(numberRepository, twilioRepository);
    return new NumberController(service);
}

import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
export const createUserController = () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    return new UserController(userService);
}