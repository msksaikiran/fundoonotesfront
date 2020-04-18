import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ViewService } from 'src/app/service/view.service';

@Component({
  selector: 'app-label-notesdetails',
  templateUrl: './label-notesdetails.component.html',
  styleUrls: ['./label-notesdetails.component.scss']
})
export class LabelNotesdetailsComponent implements OnInit {

  label = [];
  
  wrap:string ="wrap";
  direction:string="row";
  view: any;
  lId: String;
  constructor( private snackbar:MatSnackBar,private labelservice:LabelService,private route:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder, private dataservice:DataService,private viewservice:ViewService) { }
  message:string;

  ngOnInit() {
    this.lId=this.route.snapshot.paramMap.get('p1');
    this.dataservice.currentMessage.subscribe(
      message => { ; this.message = message, this.labelDetails() })

      this.viewservice.getView().subscribe(
        (res) => {
                    this.view = res;
                    this.direction = this.view.data;
                    console.log("direction..................."+this.view.data)
                    console.log(this.direction);
                     
          });  
  }


  labelDetails() {
  // console.log(localStorage.getItem("labelNote"));
    
    this.labelservice.getRequest("getlabelNotes/"+this.lId).subscribe(
      (Response: any) => {
       
        this.label = Response.result;
                },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
   }
}

