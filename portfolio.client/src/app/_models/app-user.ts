import { Social } from "./social";
import { UserTechnology } from "./user-technology";

export interface AppUser
{
    id?:string,
    userName:string,
    email:string,
    name:string,
    occupationName?:string,
    displayDescription?:string,
    refreshToken?:string,
    password?:string,
    social: Social,
    technologies?: UserTechnology[]
}