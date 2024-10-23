import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AppUser } from '../_models/app-user';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from '../_dtos/login-dto';
import { LoginResponse } from '../_dtos/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string = `${environment.apiUrl}/Auth`;
  constructor(private http:HttpClient) { }
  
  login = async (credentials:LoginDTO) :Promise<LoginResponse> => await firstValueFrom(this.http.post<LoginResponse>(`${this.url}/login`, credentials)); 
  signup = async (appUser:AppUser) : Promise<AppUser> => await firstValueFrom(this.http.post<AppUser>(`${this.url}/signup`,appUser)); 
  isUserAlreadyExist = async (username:string) : Promise<boolean> => await firstValueFrom(this.http.get<boolean>(`${this.url}/username/${username}`)); 
}
