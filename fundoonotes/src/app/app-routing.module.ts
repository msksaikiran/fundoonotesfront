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
import { SearchnotesComponent } from './component/searchnotes/searchnotes.component';
import { ImageuploadComponent } from './component/imageupload/imageupload.component';
import { NoteDetailsComponent } from './component/note-details/note-details.component';
import { CollabarateVerifyComponent } from './component/collabarate-verify/collabarate-verify.component';
import { AuthGuardService } from 'src/app/service/guards/auth-guard.service';
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
    path:"upload",
    component:ImageuploadComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "archive",
        component: ArchiveComponent
      },
      {
        path: "notes",
        component: NoteDetailsComponent
      },
      {
        path: "trash",
        component: TrashComponent
      },
      {
        path: "labelNotes/:p1",
        component: LabelNotesdetailsComponent
      },
      {
        path: "search",
        component:SearchnotesComponent
      }
    ]
  },
    {
        path:"allLabels",
        component:EditlabelComponent
    },
     {
        path: "collabrateNote",
        component:CollabarateVerifyComponent
      }
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
