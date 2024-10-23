import { AppUser } from "../_models/app-user";

export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    appUser: AppUser,
}