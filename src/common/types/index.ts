import { IRequestStrict } from "itty-router/types/IRequestStrict";
import {UserModel} from "@/modules/user"

export interface Country {
    country: string;
    iso: string;
}

export type IRequest = {  
user: UserModel,
} & IRequestStrict