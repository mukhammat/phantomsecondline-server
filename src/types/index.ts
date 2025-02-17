import { IRequestStrict } from "itty-router/types/IRequestStrict";
import {UserModel} from "@/models/user.model"

export interface Country {
    country: string;
    iso: string;
}

export type IRequest = {  
user: UserModel,
} & IRequestStrict