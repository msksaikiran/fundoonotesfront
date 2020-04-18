import { Component, OnInit,Inject } from '@angular/core';
 import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayNotes } from 'src/app/models/diplayNotes';
@Component({
  selector: 'app-noteupdate',
  templateUrl: './noteupdate.component.html',
  styleUrls: ['./noteupdate.component.scss']
})
export class NoteupdateComponent implements OnInit {

  note:[];
  updateNote: DisplayNotes = new DisplayNotes();

  constructor(
    private snackbar: MatSnackBar,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datas: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  
  {
     this.note = data;
  }
  
 title=new FormControl(this.data.title);
 color=this.data.color;
 description = new FormControl(this.data.description);
 noteId = this.data.nid;

  ngOnInit() {
    this.getallNotes();
  }
  
  notes: [];
  token: string;
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
  
  onClose() {
    console.log(this.data.nid);
    this.updateNote.title = this.data.title;
    this.updateNote.description = this.data.description;
    this.updateNote.nid = this.data.nid;

    console.log(this.updateNote);
    this.noteService.putRequest("update/"+localStorage.getItem("token"),this.updateNote).subscribe(
      
      (Response:any)=>{
        
        if(Response.statusCode===200){
          this.datas.changeMessage("noteUpdate")
          console.log(Response);
          this.snackbar.open(
            "Note Updation Successfull","undo",
            {duration:2500}
          )
        }else{
          console.log(Response);
          this.snackbar.open(
            "note Updation unSuccessfull","undo",
            {duration:2500}
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
