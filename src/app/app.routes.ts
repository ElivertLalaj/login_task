import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/AuthGuard';

export const routes: Routes = [
    {path: '' , component: LoginComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'home' , component: HomeComponent,  canActivate: [AuthGuard]},

    
    
];
