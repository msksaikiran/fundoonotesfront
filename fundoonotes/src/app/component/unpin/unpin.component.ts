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
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { Trash } from 'src/app/models/trash';

@Component({
  selector: 'app-unpin',
  templateUrl: './unpin.component.html',
  styleUrls: ['./unpin.component.scss']
})
export class UnpinComponent implements OnInit {

  trash: Trash = new Trash();
  @Input() noteid: any;
  
  //toggle: boolean = true;
  
  constructor(private snackbar: MatSnackBar,
    private viewservice: ViewService,
    private noteService: NoteService,
    private data: DataService,
    private route:ActivatedRoute,private router:Router,
     public dialog: MatDialog,
    private formBuilder:FormBuilder
    
    ) { }
  notes:[];
  token: string;
  
  ngOnInit()
  {
    
       this.data.currentMessage.subscribe(
         message => { ; this.getallNotes() });
  }

  getallNotes() {
    this.token=localStorage.getItem("token");
      this.noteService.getRequest("users/"+this.token).subscribe(
        (Response:any)=>{
          
          this.notes=Response;
          console.log(this.notes)
          
        }  
      )
    }
  
  onUpdate(note: any): void {
      const dialogRef = this.dialog.open(NoteupdateComponent);
      
  }
  
}
