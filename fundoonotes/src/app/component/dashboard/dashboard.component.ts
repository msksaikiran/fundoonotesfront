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

  //constructor() { }
  //ngOnInit(){}

  
  constructor(
    private snackbar: MatSnackBar,
    private labelService: LabelService,
    private noteservice: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    private viewservice: ViewService) { }
  
  appName: string;
  open: boolean;
  token: string;
  
  ngOnInit() {
    this.appName = "FundooNote";
    this.token = this.route.snapshot.paramMap.get("token");
  }
  
  onNotes() {
    this.appName = "Keep";
   //this.router.navigate(['dashboard/userT/notes/'+this.token])
  }

}
