import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { NoteService } from 'src/app/service/note.service';
import { LabelNote } from 'src/app/models/labelNote';
import { Trash } from 'src/app/models/trash';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-label-note',
  templateUrl: './label-note.component.html',
  styleUrls: ['./label-note.component.scss'],
})
export class LabelNoteComponent implements OnInit {

  @Input() labelInfo: any;
  label = [];
  message: string
  todayDate: Date = new Date();
  noteId: Trash = new Trash();
  constructor( private snackbar:MatSnackBar,private labelservice:LabelService,private route:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder, private dataservice:DataService,private noteService: NoteService, private userservice: UserService,) { }
  ngOnInit() {
    this.getUser();
    this.dataservice.currentMessage.subscribe(
      message => {
        console.log(this.labelInfo);
        this.message = message, this.getallabels()
      }
    )
    
  }

  reminder: String;
  noteid: Number;
  colDetails = [];
  colUserDetails = [];
  userName: String;
  image: string;
  image2: string;
  baseUrl = environment.baseProfileUrl;
  UserPrf: string;

  getUser() {

    this.userservice.getRequest(localStorage.getItem("token")).subscribe(
      (Response: any) => {
        //console.log("*********************Users11****************************")
        // console.log(Response)
        // console.log(this.labelInfo.nid)
        this.noteid = this.labelInfo.nid;
        this.UserPrf = Response;
        this.colUserDetails = Response.note;
      });
    
    this.userservice.getRequest("getuserBynoteid?nid=" + this.labelInfo.nid).subscribe(
      (Response: any) => {
        console.log(Response)
        this.colDetails = Response;
        this.image = this.baseUrl;
      });
  }

  ln: [];
  getallabels(){
    
      this.noteService.getRequest("notesdetails/"+this.labelInfo.nid).subscribe(
        (Response: any) => {
          console.log("label Note geeting...");
          console.log(Response.notes.reminder);
         
          // Adding reminder to chip
          this.reminder = Response.notes.reminder;
        // Adding Label to chip
          this.label = Response.notes.label;
          
          console.log(this.label)
          
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
  }

  labelNote: LabelNote = new LabelNote();
  onDelete(labels:any) {
    
    console.log(labels);
    console.log(labels.lId);
    this.labelNote.lname = labels.lableName;
    this.labelNote.nId = this.labelInfo.nid;
  
    console.log(this.labelInfo)
      this.labelservice.postRequest("removelabels/"+localStorage.getItem("token"), this.labelNote).subscribe(
        (Response: any) => {
    
          if (Response.statusCode === 200) {
            this.dataservice.changeMessage("lable")
            
            console.log(Response);
            this.snackbar.open("Lable Creation Successfull", "undo", { duration: 2500 })
          }
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
      
  }
  
 
  onDeleteRem() {
    
    this.noteId.nid= this.labelInfo.nid;
  
    console.log(this.labelInfo.nid)
      this.noteService.putRequest("removeRemainder/"+localStorage.getItem("token"),this.noteId).subscribe(
        (Response: any) => {
    
          if (Response.statusCode === 200) {
            this.dataservice.changeMessage("lable")
            
            console.log(Response);
            this.snackbar.open("Lable Creation Successfull", "undo", { duration: 2500 })
          }
         
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
      
  }
  

  }

