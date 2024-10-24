import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { PATHS } from './_constants/paths';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: PATHS.default, pathMatch: 'full', redirectTo: PATHS.welcome },
  { path: PATHS.welcome, component: WelcomeComponent },
  {
    path: PATHS.user, component: UserComponent,
    children: [
      { path: PATHS.default, pathMatch: 'full', redirectTo: PATHS.login },
      { path: PATHS.signup, component: SignupComponent },
      { path: PATHS.login, component: LoginComponent }
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
