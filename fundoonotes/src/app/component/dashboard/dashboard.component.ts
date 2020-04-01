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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
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
  
  ngOnInit() {
    this.appName = "FundooNote";
    
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

  openDialogLabel(notes: any) {

    const dialogRef = this.dialog.open(EditlabelComponent);
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
}
