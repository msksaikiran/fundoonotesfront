import { Component, OnInit,Input } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user'
import { MatSnackBar,MatDialog, MatDialogConfig } from '@angular/material';
// import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from 'src/app/service/view.service';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';

import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { Trash } from 'src/app/models/trash';
import { not } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  notes:[];
  data1: any[];
  wrap:string ="wrap";
  direction:string="row";
  view: any;
  toggle: boolean = false;

  trash: Trash = new Trash();

  constructor(private snackbar: MatSnackBar,
    private viewservice: ViewService,
    private noteService: NoteService,
    private data: DataService,
    private route:ActivatedRoute,private router:Router,
    public dialog: MatDialog,
    private httpservice: UserService,
    private formBuilder:FormBuilder
    
    ) { }

  message:string;
  token: string;
  open: boolean;

 
  ngOnInit() {
     
      this.data.currentMessage.subscribe(
        message => {this.message = message,this.getallNotes()});
            
        this.viewservice.getView().subscribe(
          (res) => {
                      this.view = res;
                      this.direction = this.view.data;
                      console.log("direction..................."+this.view.data)
                      console.log(this.direction);
                       
            });  
  }

  getallNotes() {
    this.token=localStorage.getItem("token");
      this.noteService.getRequest("users/"+this.token).subscribe(
        (Response:any)=>{
          
          this.notes=Response;
          console.log(this.notes)
          
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
    }
  
  onUpdate(note: any): void {
    
    console.log(note);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data =
    {
      
      'title': note.title,
      'description': note.description,
      'nid': note.nid,
      'color':note.colour
    };
    let dialogRef = this.dialog.open(NoteupdateComponent, dialogConfig);
    
  }
  
  pin(note:any) {
        console.log("pin")
       
        this.trash.nid = note.nid;
        console.log(this.trash);
        this.token=localStorage.getItem("token");
        this.noteService.putRequest("pin/" + this.token, this.trash).subscribe(
          (Response: any) => {
            
            if (Response.statusCode === 200) {
              
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
          },
          (error: any) => {
            console.error(error);
            console.log(error.error.message);
            this.snackbar.open(error.error.message, "undo", { duration: 25000 });
          });
      
  }
  
  unpin(note:any) {
    this.trash.nid = note.nid;
    console.log(this.trash);
    this.token=localStorage.getItem("token");
    this.noteService.putRequest("unpin/" + this.token, this.trash).subscribe(
      (Response: any) => {
      
        if (Response.statusCode === 200) {
         
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
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
  }
}

