import { TwilioRepository } from "@/repositories/twilio.repository";
import { NumberRepository } from "@/repositories/number.repository";
import { NumberService } from "@/services/number.service";
import { NumberController } from "@/controllers/number.controller";
import { UserController } from "@/controllers/user.controller";
import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { TwilioService } from "@/services/twilio.service";
import { TwilioController } from "@/controllers/twilio.controller";
import { SmsService } from "@/services/sms.service";
import { SmsController } from "@/controllers/sms.controller";
import { CallService } from "@/services/call.service";
import { CallController } from "@/controllers/call.controller";


export default {
    createNumberController: () => {
        const numberRepository = new NumberRepository();
        const twilioRepository = new TwilioRepository();
        const service =  new NumberService(numberRepository, twilioRepository);
        return new NumberController(service);
    },
    createUserController: () => {
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        return new UserController(userService);
    },
    createTwilioController: () => {
        const twilioRepository = new TwilioRepository();
        const numberRepository = new NumberRepository();
        const twilioService = new TwilioService(twilioRepository, numberRepository);
        return new TwilioController(twilioService);
    },
    createSmsController: () => {
        const twilioRepository = new TwilioRepository();
        const numberRepository = new NumberRepository();
        const smsService = new SmsService(twilioRepository, numberRepository);
        return new SmsController(smsService);
    },
    createCallController: () => {
        const twilioRepository = new TwilioRepository();
        const numberRepository = new NumberRepository();
        const callService = new CallService(numberRepository,twilioRepository);
        return new CallController(callService);
    }
}