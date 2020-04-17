import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Trash } from 'src/app/models/trash';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { ViewService } from 'src/app/service/view.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  trash: Trash = new Trash();
  notes:[];
  wrap:string ="wrap";
  direction:string="row";
  view: any;

  constructor(private snackbar:MatSnackBar,private noteService: NoteService,private dataservice: DataService,
    private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private viewservice: ViewService,
    public dialog: MatDialog) { }

  message:string;
  token: string;
  
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message=>{;this.message=message,this.getallNotes()   
      }
    )

    this.viewservice.getView().subscribe(
      (res) => {
                  this.view = res;
                  this.direction = this.view.data;
                  console.log("direction..................."+this.view.data)
                  console.log(this.direction);
                   
      });  
    
  }
  getallNotes() {
    this.token = localStorage.getItem("token");
    console.log(this.token)
    this.noteService.getRequest("getAllArchieve/"+this.token).subscribe(
      (Response:any)=>{
        
        this.notes=Response.notes;
        console.log("Archieve=========>",this.notes)
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
        //console.log(this.noteunpin.noteId)
        if (Response.statusCode === 200) {
          
          this.dataservice.changeMessage('trash')
          console.log(Response);
          this.snackbar.open(
            "Note pin successfull ", "undo",
            { duration: 2500 }
          )
        } else {
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
}
