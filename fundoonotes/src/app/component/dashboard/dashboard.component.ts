import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar ,MatDialog} from '@angular/material';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { LabelService } from 'src/app/service/label.service';
import { DataService } from 'src/app/service/data.service';
import { BehaviorSubject } from 'rxjs';
import { ViewService } from 'src/app/service/view.service';
import { NoteService } from 'src/app/service/note.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  snackBar: any;

  
  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private httpservice: UserService,
    private noteservice: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    public dialog: MatDialog,
    private viewservice: ViewService) { }
  
  appName: string;
  open: boolean;
  token: string;
  image: string;

  ngOnInit() {
    this.appName = "FundooNote";
    this.image = localStorage.getItem("image");
  }
  
  onNotes() {
    this.token = localStorage.getItem("token");
    
    this.appName = "Keep";
    this.router.navigate(['dashboard/notes'])
  }
  onArchive() {
   
    this.appName = "Archieve";
    this.router.navigate(['dashboard/archive'])
  }
  onTrash() {
   
    this.appName = "Trash";
    this.router.navigate(['dashboard/trash'])
  }

  account() {
    localStorage.clear();
    this.router.navigate(['login'])
  }


  refresh() {
    this.dataservice.changeMessage("refresh");
  }
  openDialogLabel(notes: any) {

    const dialogRef = this.dialog.open(EditlabelComponent);
  }

  list: boolean = true;
  grid: boolean = false;

  changeView() {
    if (this.list) {
      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }
    this.viewservice.getView();
  }
  
  label = [];

  getallabels() {
    this.labelservice.getRequest("user/" + localStorage.getItem("token")).subscribe(
      (Response: any) => {
            
        this.label = Response.result;
        console.log(this.label)
      }

    )
  }

  Profile() {
    this.httpservice.postRequest("uploadProfile/"+localStorage.getItem("token"),"").subscribe((response: any) => {
        
      if (response.token !=null) {
        console.log(response);
        //localStorage.setItem("token", response.token);
        this.snackBar.open(
          "Login Successfull",
          "undo",

          { duration: 25000}
        );
        //this.router.navigate(["/dashboard/notes/"]);
      } else {
        console.log(response);
        //console.log("Login:" + this.login.email);
        this.snackBar.open("Login Failed", "undo", { duration: 25000});
      }
    });
  }
 
}
