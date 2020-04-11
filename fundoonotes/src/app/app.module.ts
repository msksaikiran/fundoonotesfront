import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MatInputModule, MatSnackBarModule, MatNavList} from "@angular/material";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatListModule} from '@angular/material/list';
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
// import { HttpService } from './service/http.service';
import { NoteComponent } from './component/note/note.component';
import { IconComponent } from './component/icon/icon.component';
import { NoteDetailsComponent } from './component/note-details/note-details.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { GetLabelComponent } from './component/get-label/get-label.component';
import { MatCheckboxModule } from '@angular/material';
import { UnpinComponent } from './component/unpin/unpin.component';
import { LabelNoteComponent } from './component/label-note/label-note.component';
import { MatChipsModule } from '@angular/material';
import { LabelNotesdetailsComponent } from './component/label-notesdetails/label-notesdetails.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material/';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SearchnotePipe } from './pipes/searchnote.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { SearchnotesComponent } from './component/searchnotes/searchnotes.component';
import { ImageuploadComponent } from './component/imageupload/imageupload.component';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';

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
    NoteDetailsComponent,
    ArchiveComponent,
    TrashComponent,
    EditlabelComponent,
    GetLabelComponent,
    UnpinComponent,
    LabelNoteComponent,
    LabelNotesdetailsComponent,
    SearchnotePipe,
    SearchnotesComponent,
    ImageuploadComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    FileUploadModule,
    FlexLayoutModule
  ],
  //providers: [HttpService],
  entryComponents:[
    NoteupdateComponent,
    EditlabelComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
