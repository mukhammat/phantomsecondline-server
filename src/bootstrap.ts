import { NumberRepository } from "@/modules/number/number.repository";
import { NumberService } from "@/modules/number/number.service";
import { NumberController } from "@/modules/number/number.controller";
import { UserController } from "@/modules/user/user.controller";
import { UserRepository } from "@/modules/user/user.repository";
import { UserService } from "@/modules/user/user.service";
import { TwilioService } from "@/common/services/twilio.service";
import { SmsService } from "@/modules/sms/sms.service";
import { SmsController } from "@/modules/sms/sms.controller";
import { CallService } from "@/modules/call/call.service";
import { CallController } from "@/modules/call/call.controller";


export default {
    createNumberController: () => {
        const numberRepository = new NumberRepository();
        const twilioService = new TwilioService();
        const service =  new NumberService(numberRepository, twilioService);
        return new NumberController(service);
    },
    createUserController: () => {
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        return new UserController(userService);
    },
    createSmsController: () => {
        const twilioService = new TwilioService();
        const numberRepository = new NumberRepository();
        const smsService = new SmsService(twilioService, numberRepository);
        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)
        return new SmsController(smsService, userService);
    },
    createCallController: () => {
        const twilioService = new TwilioService();
        const numberRepository = new NumberRepository();
        const callService = new CallService(numberRepository,twilioService);
        return new CallController(callService);
    }
}