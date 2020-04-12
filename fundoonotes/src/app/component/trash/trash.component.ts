import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Trash } from 'src/app/models/trash';
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
  //@Input() noteInfo: any;
  trash: Trash = new Trash();
  restore(note:any) {
    console.log(note.nid);
    this.trash.nid = note.nid;
    console.log(this.trash);
    this.token = localStorage.getItem("token")
    this.noteService.putRequest("restore/" + this.token, this.trash).subscribe(
      (Response: any) => {

        if (Response.statusCode === 200) {
          this.dataservice.changeMessage('trash')
          
          console.log(Response);
          this.snackbar.open(
            "Note Trash", "undo",
            { duration: 2500 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "note unSuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )
  }
  delete(note:any) {
    console.log(note.nid);
    this.trash.nid = note.nid;
    console.log(this.trash);
    this.token = localStorage.getItem("token")
    this.noteService.postRequest("permenantDelete/" + this.token, this.trash).subscribe(
      (Response: any) => {
         console.log(Response.statusCode+"**********")
        if (Response.statusCode === 200) {
          this.dataservice.changeMessage('trash')
          
          console.log(Response);
          this.snackbar.open(
            "Note Trash", "undo",
            { duration: 2500 }
          )
        }
        else if(Response.status === 500) {
          console.log(Response.console.error());
          this.snackbar.open(
            "note not Trash", "undo",
            { duration: 2500 }
          )
        }
        },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
  }
}
