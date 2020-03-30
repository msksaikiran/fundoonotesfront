import { Component, OnInit,Input, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user'
import { MatSnackBar,MatDialog } from '@angular/material';
import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from 'src/app/service/view.service';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { displayNotes } from 'src/app/models/diplayNotes';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { Trash } from 'src/app/models/trash';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

   trash: Trash = new Trash();
    @Input() noteid: any;
    @Input() noteunpin: any;
    toggle: boolean;
  
  constructor(private snackbar: MatSnackBar,
    private viewservice: ViewService,
    private noteService: NoteService,
    private data: DataService,
    private route:ActivatedRoute,private router:Router,
     public dialog: MatDialog,
    private formBuilder:FormBuilder
    
    ) { }

  message:string;
  token: string;

  ngOnInit() {
  }

  isPinned: boolean=true;

  pinnedNote() {
    
    if (this.noteid.isPinned == 1) {
      this.trash.nid = this.noteid.nid;
  
      this.toggle = false;
      console.log(this.toggle)
      this.token=localStorage.getItem("token");
      this.noteService.putRequest("unpin/" + this.token, this.trash).subscribe(
        (Response: any) => {
          
          if (Response.statusCode === 200) {
            console.log(this.noteid)
           
            this.data.changeMessage('trash')
            console.log(Response);
            this.snackbar.open(
              "Note unpin successfull ", "undo",
              { duration: 2500 }
            )
          }else {
            console.log(Response);
            this.snackbar.open(
              "Note unpin unSuccessfull", "undo",
              { duration: 2500 }
            )
          }
        }
      )
                                                       
    } else if (this.noteid.isPinned==0) {

      this.trash.nid = this.noteid.nid;
     
       console.log(this.trash);
        this.toggle = true;
        console.log(this.toggle)
        this.token=localStorage.getItem("token");
        this.noteService.putRequest("pin/" + this.token, this.trash).subscribe(
          (Response: any) => {
           
            if (Response.statusCode === 200) {
              
              this.data.changeMessage('trash')
              console.log(Response);
              this.snackbar.open(
                "Note pin successfull ", "undo",
                { duration: 2500 }
              )
            }else {
              console.log(Response);
              this.snackbar.open(
                "Note pin unSuccessfull", "undo",
                { duration: 2500 }
              )
            }
          }
        )
      
      }
  //   },
  //     (error: any) => {
  //    console.log("error");
  //  });
} 






//first unpin to pin
  pin() {
    console.log("pin")
   
    this.trash.nid = this.noteid.nid;
    console.log(this.trash);
    this.token=localStorage.getItem("token");
    this.noteService.putRequest("pin/" + this.token, this.trash).subscribe(
      (Response: any) => {
        //console.log(this.noteunpin.noteId)
        if (Response.statusCode === 200) {
          //console.log(this.noteid)
          this.toggle=false;
          this.data.changeMessage('trash')
          console.log(Response);
          this.snackbar.open(
            "Note pin successfull ", "undo",
            { duration: 2500 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "Note pin unSuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )

  }

  unpin() {
    console.log("unpin")
    this.toggle=true;
    this.trash.nid = this.noteid.nid;
    console.log(this.trash);
    this.token=localStorage.getItem("token");
    this.noteService.putRequest("unpin/" + this.token, this.trash).subscribe(
      (Response: any) => {
       // console.log(this.noteunpin.noteId)
        if (Response.statusCode === 200) {
         // console.log(this.noteid)
         this.toggle=false;
          this.data.changeMessage('trash')
          console.log(Response);
          this.snackbar.open(
            "Note unpin successfull ", "undo",
            { duration: 2500 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "Note unpin unSuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )

  }
}
