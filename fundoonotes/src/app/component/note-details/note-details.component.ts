import { Component, OnInit,Input } from '@angular/core';
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

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  //nt:displayNotes
  notes:[];
  data1: any[];
  wrap:string ="wrap";
  direction:string="row";
  view: any;
  

  constructor(private snackbar: MatSnackBar,
    private viewservice: ViewService,
    private noteService: NoteService,
    private data: DataService,
    private route:ActivatedRoute,private router:Router,
  //  public dialog: MatDialog
    private formBuilder:FormBuilder,
    
    ) { }

    message:string;
  token: string;
 

 
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
      this.data.currentMessage.subscribe(
        message => {this.message = message,this.getallNotes()});

        this.viewservice.getView().subscribe(
          (res) => {
                      this.view = res;
                      this.direction = this.view.data;
                      
                      console.log(this.direction);
                       
            });  
    }
    getallNotes(){
      this.noteService.getRequest("users/"+this.token).subscribe(
        (Response:any)=>{
          
          this.notes=Response;
          console.log(this.notes)
          
        }  
      )
    }
    // onUpdate(note:any): void {
    //   console.log("note",note);
    //   console.log(note)
    //     const dialogRef = this.dialog.open(NoteupdateComponent, {
    //    height:'300px',
    //    width:'300px',
    //       data: { 
    //              'title': note.title,
    //               'description':note.description,
    //               'noteId':note.noteId
    //             }
          
    //     });
    //   }
  
  
}
