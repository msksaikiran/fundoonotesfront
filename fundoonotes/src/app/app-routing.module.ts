import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { RestPasswordComponent } from './component/rest-password/rest-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
  {
    path:" ",
    component: LoginComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"forgotPassword",
    component:ForgotPasswordComponent
  },
  {
    path:"resetPassword/:token",
    component:RestPasswordComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
