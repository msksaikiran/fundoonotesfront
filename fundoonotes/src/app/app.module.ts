import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MatInputModule, MatSnackBarModule, MatNavList } from "@angular/material";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatListModule} from '@angular/material/list';
//import { MatNavl} from "@angular/material/";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { FlexLayoutModule } from '@angular/flex-layout';
import { from } from "rxjs";
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { RestPasswordComponent } from './component/rest-password/rest-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatDividerModule} from '@angular/material/divider';
import { EditlabelComponent } from './component/editlabel/editlabel.component';
import { NoteupdateComponent } from './component/noteupdate/noteupdate.component';
import { HttpService } from './service/http.service';
import { NoteComponent } from './component/note/note.component';
import { IconComponent } from './component/icon/icon.component';
import { NoteDetailsComponent } from './component/note-details/note-details.component';
//import { MatDialogRef } from "@angular/material/dialog";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RestPasswordComponent,
    DashboardComponent,
    EditlabelComponent,
    NoteupdateComponent,
    NoteComponent,
    IconComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
  //  MatDialogRef,
    //MatNavList,
    MatDividerModule,
  //  MatDialogRef,
    //MAT_DIALOG_DATA,
    FlexLayoutModule
  ],
  providers: [HttpService],
  entryComponents:[
    NoteupdateComponent,
    EditlabelComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
