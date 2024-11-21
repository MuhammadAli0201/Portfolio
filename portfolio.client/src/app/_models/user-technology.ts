import { AppUser } from "./app-user";
import { Technology } from "./technology";

export interface UserTechnology extends Technology {
    userId: string;
    user?: AppUser
}