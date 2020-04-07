import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { Trash } from 'src/app/models/trash';
import { Color } from 'src/app/models/setcolor';
import { Label } from 'src/app/models/label';
import { LabelService } from 'src/app/service/label.service';
import { LabelNote } from 'src/app/models/labelNote';
import { DateReminder } from 'src/app/models/dateReminder';
// import { MatDatepickerModule } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'LL LT',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // `MomentDateTimeAdapter` can be automatically provided by importing
        // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},

        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
    ],
})
export class IconComponent implements OnInit {
  public dateTime = new moment();
  @Input() noteInfo: any;
  //@Input() labelInfo: any;

  trash: Trash = new Trash();
  colour: Color = new Color();
  label: Label = new Label();
  labelNote: LabelNote = new LabelNote();
  checkboxlabel = [];
  constructor(
    private snackbar: MatSnackBar,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private labelservice: LabelService,
    private dataService: DataService) { }
    
  token: string;
  message: string;
  ngOnInit() {
    
    // this.getallabels();
    this.dataService.currentMessage.subscribe(
      message => { this.message = message, this.getallabels() });

  }

  colorlens() {
    console.log("Note Color")

  }
  arrayColor = [
    [
      {
        name: "white", hexcode: " #ffffff "
      }
      ,
      {
        name: "cyan", hexcode: " #00FFFF "
      },

      {
        name: "Cornsilk", hexcode: "#FFF8DC"
      },

    ],
    [
      {
        name: "LightGreen", hexcode: " #90EE90"
      },
      {
        name: "Pink", hexcode: "#FFC0CB "
      }
      ,
      {
        name: "LightYellow", hexcode: "#FFFFE0"
      }
    ],

  ]

  setColor(color: any) {

    console.log(color)
    
    this.colour.nid = this.noteInfo.nid;
    this.colour.colour = color;
    
    console.log(this.colour);
    this.noteService.putRequest("color/" + localStorage.getItem("token"), this.colour).subscribe(
      (Response: any) => {
        if (Response.statusCode === 200) {
          this.dataService.changeMessage('color')
          this.dataService.changeMessage("name")
          console.log(Response)
          this.snackbar.open(
            "Note Color", "",
            { duration: 2500 }
          )
        }
        else {
          console.log(Response)
          this.snackbar.open(
            "Note Color Unsuccessfull", "",
            { duration: 2500 }
          )
        }
      }
    )

  }
  
  onDelete() {
    console.log(this.noteInfo.nid);
    this.trash.nid = this.noteInfo.nid;
    console.log(this.trash);
    this.token = localStorage.getItem("token")
    this.noteService.putRequest("trash/" + this.token, this.trash).subscribe(
      (Response: any) => {

        if (Response.statusCode === 200) {
          this.dataService.changeMessage('trash')
          
          console.log(Response);
          this.snackbar.open(
            "Note Trash", "undo",
            { duration: 2500 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "note unSuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )
  }


  archive() {
    this.trash.nid = this.noteInfo.nid;
    console.log(this.trash);
    this.token = localStorage.getItem("token")
    this.noteService.putRequest("archieve/" + this.token, this.trash).subscribe(
      (Response: any) => {
        console.log(this.noteInfo.noteId)
        if (Response.statusCode === 200) {
          console.log(this.noteInfo)
          this.dataService.changeMessage('trash')
          console.log(Response);
          this.snackbar.open(
            "Note archive successfull ", "undo",
            { duration: 2500 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "Note Archive unSuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )

  }

  labeln: string;
  ln = [];
  getallabels() {
    this.labelservice.getRequest("user/" + localStorage.getItem("token")).subscribe(
      (Response: any) => {
          
        this.checkboxlabel = Response.result;
        
        // console.log(Response.result.lId)
        // console.log(this.checkboxlabel)
        // this.ln = localStorage.getItem("labobj");
        // this.ln = this.labeln;
        // this.checkboxlabel.forEach(ele => {
        //   // if (ele.lId == this.labelInfo.lId) {
        //      console.log("labels are same..............."+ this.labeln)
        //   // }  
        // });
        
      }

    )
  }
  
  
  enable: boolean = true;
  addlabel(labels: any) {
      
    console.log(labels);
    console.log(labels.lId);
    this.labelNote.lId = labels.lId;
    this.labelNote.nId = this.noteInfo.nid;

    console.log("LabelNote Obj..");
    console.log(this.labelNote);

    console.log("NoteInfo label  data......")
    this.noteInfo.label.forEach(ele => {
      if (ele.lId == labels.lId) {
        this.enable = false;
        console.log(this.label)
        this.dataService.changeMessage("lable")
        this.snackbar.open("Lable already Exist", "undo",
          { duration: 2500 })
      
      }
    });
    
    if (this.enable) {
     
      this.labelservice.postRequest("addlabels/" + localStorage.getItem("token"), this.labelNote).subscribe(
        (Response: any) => {
    
          if (Response.statusCode === 200) {
            this.dataService.changeMessage("lable")
            
            console.log(Response);
            this.snackbar.open("Lable Creation Successfull", "undo", { duration: 2500 })
          }
         
        })
      
    }
  }

  dateReminder: DateReminder = new DateReminder();
  dateControl=new FormControl(this.dateReminder.remainder);

  

  datePicker() {
    console.log(this.dateTime._d)
    this.dateReminder.remainder = this.dateTime._d;
    this.dateReminder.nid = this.noteInfo.nid;
    console.log(this.dateReminder)
    this.noteService.postRequest("addremainder/"+localStorage.getItem("token"),this.dateReminder).subscribe(
    (Response:any)=>{
      if(Response.statusCode===200)
      {
        console.log(Response)
        this.dataService.changeMessage("addRemainder")
        this.snackbar.open(
          "Reminder Successfull","",
          {duration:2500}
        )
      }
      else{
       console.log(Response)
       this.snackbar.open(
         "Reminder UnSuccessfull","",
         {duration:2500}
       )
      }
    }
  )
  }
  
}
