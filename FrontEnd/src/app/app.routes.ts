import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { MenuInicialComponent } from './pages/menu-inicial/menu-inicial.component'; // Import do MenuInicialComponent
import { authGuard } from './services/auth-guard.service'; // Import da função de guarda
import { SearchComponent } from './pages/search/search.component';
import { SignUpProfessionalComponent } from './pages/sign-up-professional/sign-up-professional.component';
import { SignUpClientComponent } from './pages/sign-up-client/sign-up-client.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full" // Redireciona para login
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "signupprof",
    component: SignUpProfessionalComponent,
  },
  {
    path: "signupcli",
    component: SignUpClientComponent,
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [authGuard] // Protege a rota com o guarda
  },
  {
    path: "menu-inicial",
    component: MenuInicialComponent,
    canActivate: [authGuard] // Protege a rota com o guarda
  },
  {
    path: "search",
    component: SearchComponent,
    canActivate: [authGuard] // Protege a rota com o guarda
  },
  {
    path: "calendar",
    component: CalendarComponent,
    canActivate: [authGuard] // Protege a rota com o guarda
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard] // Protege a rota com o guarda
  },

];
