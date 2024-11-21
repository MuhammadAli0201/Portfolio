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
export class AppUserService {
  private url: string = `${environment.apiUrl}/Auth`;
  user?: AppUser;
  constructor(private http: HttpClient) {
    this.user = {
      id: '1',
      name: "Muhammad Ali",
      userName: "muhammadali0201",
      email: 'aliawan0201@gmail.com',
      occupationName: "Software Engineer",
      displayDescription: `I am a dedicated engineer who focuses on creating both websites and
                mobile apps. I am skilled in building web APIs and integrating them with mobile and web applications. I work with a
                variety of modern technologies, enabling me to provide creative solutions that meet my clients' needs and improve user
                experiences.`,
      refreshToken: '',
      password: 'string',
      social: {
        id: '1',
        linkedIn: 'https://www.linkedin.com/in/muhammad-ali-b9838b240/',
        gmail: '',
        github: '',
        userId: '1'
      },
      technologies: [
        {
          id: '1',
          userId: '1',
          title: "ASP.NET Core",
        },
        {
          id: '1',
          userId: '1',
          title: "EF Core"
        },
        {
          id: '1',
          userId: '1',
          title: "MS SQL Server",
        },
        {
          id: '1',
          userId: '1',
          title: "Angular",
        },
        {
          id: '1',
          userId: '1',
          title: "NG-Zorro"
        },
        {
          id: '1',
          userId: '1',
          title: "Html"
        },
        {
          id: '1',
          userId: '1',
          title: "CSS",
        },
        {
          id: '1',
          userId: '1',
          title: "JavaScript"
        },
        {
          id: '1',
          userId: '1',
          title: "TypeScript"
        },
        {
          id: '1',
          userId: '1',
          title: "Flutter"
        },
        {
          id: '1',
          userId: '1',
          title: "Firebase"
        }
      ]
    }
  }

  login = async (credentials: LoginDTO): Promise<LoginResponse> => await firstValueFrom(this.http.post<LoginResponse>(`${this.url}/login`, credentials));
  signup = async (appUser: AppUser): Promise<AppUser> => await firstValueFrom(this.http.post<AppUser>(`${this.url}/signup`, appUser));
  isUserAlreadyExist = async (username: string): Promise<boolean> => await firstValueFrom(this.http.get<boolean>(`${this.url}/username/${username}`));
}
