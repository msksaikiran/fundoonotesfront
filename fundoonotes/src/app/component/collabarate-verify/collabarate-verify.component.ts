import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollabarateService } from 'src/app/service/collabarate.service';
import { LabelService } from 'src/app/service/label.service';
import { DataService } from 'src/app/service/data.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-collabarate-verify',
  templateUrl: './collabarate-verify.component.html',
  styleUrls: ['./collabarate-verify.component.scss']
})
export class CollabarateVerifyComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private noteService: NoteService,
    private collabrate:CollabarateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private labelservice: LabelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService) { }
    

  ngOnInit() {
  }

  email = new FormControl();
  token: String;
  noteid = this.data.noteid;
  @Input() noteInfo: any;
  //@Output()
  submit() {
    this.token = localStorage.getItem("token");
    console.log(this.email.value)
    console.log(this.noteid)
    
    this.collabrate.postRequest("add-coll/"+this.token+"?NoteId="+this.noteid+"&email="+this.email.value,"").subscribe(
        (Response:any)=>{
          this.snackbar.open("added collabrate sucessfully....", "undo", { duration: 2500});
           this.dataService.changeMessage("collabrater");
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
  }
}
