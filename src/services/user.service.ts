import { IUserRepository } from "@/repositories/user.repository";

export interface IUserService {
    register(phone_id: string, db: D1Database);
    hasSufficientBalance(amount: number, user_id: string, db: D1Database):Promise<boolean>;
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

    async hasSufficientBalance(amount: number, user_id: string, db: D1Database):Promise<boolean> {
        const balance = await this.userRepository.getBalance(user_id, db);
        if(!balance) {
            throw Error("Не достаточно баланса!");
        }

        return amount >= balance;
    }
}
