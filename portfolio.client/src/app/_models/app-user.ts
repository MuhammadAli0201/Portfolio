export interface AppUser
{
    id?:string,
    userName:string,
    email:string,
    name:string,
    displayText?:string,
    displayDescription?:string,
    refreshToken?:string,
    phoneNumber?:string,
    password?:string
}