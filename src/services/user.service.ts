import { User } from "@/models/user.model";
import { IUserRepository } from "@/repositories/user.repository";

export interface IUserService {
    register(phone_id: string, db: D1Database);
}

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {
    }

    async register(phone_id: string, db: D1Database) {
        console.log("Service",phone_id);
        const isUser = await this.userRepository.findByPhoneID(phone_id, db);
        if (isUser.results.length === 0) {
            const user = await this.userRepository.create(phone_id, db);
            return user;
        }
        return isUser;
    }
}
