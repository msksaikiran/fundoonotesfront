import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { RestPasswordComponent } from './component/rest-password/rest-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NoteComponent } from './component/note/note.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { EditlabelComponent } from './component/editlabel/editlabel.component';
import { LabelNotesdetailsComponent } from './component/label-notesdetails/label-notesdetails.component';
const routes: Routes = [
  {
    path:"",
    component:LoginComponent
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
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "archive",
        component: ArchiveComponent
      },
      {
        path: "notes",
        component: NoteComponent
      },
      {
        path: "trash",
        component: TrashComponent
      },
      {
        path: "labelNotes",
        component: LabelNotesdetailsComponent
      }
    ]
  },
      {
        path:"allLabels",
        component:EditlabelComponent
      }
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
