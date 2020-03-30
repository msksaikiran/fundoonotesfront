import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-label-note',
  templateUrl: './label-note.component.html',
  styleUrls: ['./label-note.component.scss']
})
export class LabelNoteComponent implements OnInit {

  @Input() labelInfo: any;
  label = [];
  message: string
  
  constructor( private snackbar:MatSnackBar,private labelservice:LabelService,private route:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder, private dataservice:DataService,private noteService: NoteService) { }
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message => {
        console.log(this.labelInfo); this.message = message, this.getallabels()
      }
    )
  }

  getallabels(){
    
    
      this.noteService.getRequest("notes/"+this.labelInfo.nid).subscribe(
        (Response:any)=>{
          console.log("&&&&&&&&&&&&&&&&&++++++++++++++=================");
          this.label=Response.notes.label;
          console.log(this.label)
          
        }  
      ) 
  }

}
