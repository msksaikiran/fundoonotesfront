import { Component, OnInit } from '@angular/core';
import {Note} from 'src/app/models/note';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {NoteService} from "src/app/service/note.service";
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {


open:boolean;
note:Note =new Note();
notes:any[];

title=new FormControl(this.note.title);
 description=new FormControl(this.note.description)
  //token: string;
  constructor(
    private snackbar: MatSnackBar,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private httpservice: UserService,
    private formBuilder: FormBuilder,
    private dataservice: DataService) { }

  ngOnInit() {
   
     }
  
  onOpen(){
    this.open=true;
    
  }
  
  onClose(){
    this.open=false;
      console.log(this.note);
     
      this.noteService.postRequest("users/"+localStorage.getItem("token"),this.note).subscribe(
      
      (Response:any)=>{
        
        if(Response.statusCode===200){
          this.dataservice.changeMessage("createNote")
          console.log(Response);
          this.snackbar.open("Note Creation Successfull","undo",{duration:2500})
        }else{
          console.log(Response);
          this.snackbar.open(
            "Note Not unSuccessfull","undo",
            {duration:2500}
          )
        }
      }
    )
  }
}
