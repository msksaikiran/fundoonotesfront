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
import { CollabarateService } from 'src/app/service/collabarate.service';


@Component({
  selector: 'app-label-note',
  templateUrl: './label-note.component.html',
  styleUrls: ['./label-note.component.scss'],
})
export class LabelNoteComponent implements OnInit {

  @Input() labelInfo: any;
  label = [];
  message: string;
  todayDate: Date = new Date();
  noteId: Trash = new Trash();
  
  constructor( private snackbar:MatSnackBar,private labelservice:LabelService,private colservice:CollabarateService,private route:ActivatedRoute,private router:Router,
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
  image: string;
  
  baseUrl = environment.baseProfileUrl;
  UserPrf: string;

  getUser() {

    /**
     * Getting the collabrated Notes to this user by other users
     */
    this.userservice.getRequest(localStorage.getItem("token")).subscribe(
      (Response: any) => {
        //console.log("*********************Users11****************************")
        // console.log(Response)
        // console.log(this.labelInfo.nid)
        this.noteid = this.labelInfo.nid;
        
        if (Response != null) {
          console.log("**************")
          this.UserPrf = Response;
          this.colUserDetails = Response.note;
        }
      });
    
    /**
     *  getting the collabrate Notedetails
     */ 
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
          //console.log("label Note geeting...");
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

  /**
   * Removing  the labels to the notes
   */
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
            this.snackbar.open("Lable Removed Successfull", "undo", { duration: 2500 })
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
            this.snackbar.open("Reminder removed Successfull", "undo", { duration: 2500 })
          }
         
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500});
        });
      
  }
  
  removeCollabrate(user:any) {
    
    this.colservice.deleteRequest("delete-coll?NoteId="+this.labelInfo.nid+"&userId="+user.uid).subscribe(
      (Response: any) => {
           alert("Removing..."+user.email+" to the Note")
        if (Response.statusCode === 200) {
          this.dataservice.changeMessage("lable")
          
          console.log(Response);
          this.snackbar.open("collbrated user Removed Successfull", "undo", { duration: 2500 })
        }
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
  }

  }

