import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes:[];
 
  constructor(private snackbar:MatSnackBar,private noteService: NoteService,private dataservice: DataService,
    private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,
    public dialog: MatDialog) { }

  message:string;
  token: string;
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message => {
        ; this.message = message, this.getallNotes()   
      }
    )
  }
  getallNotes() {
    this.token = localStorage.getItem("token");
    console.log(this.token)
    this.noteService.getRequest("getAlltrashed/"+this.token).subscribe(
      (Response:any)=>{
        
        this.notes=Response.notes;
        console.log("Archieve====>",this.notes)
      }
    )
  }

}
