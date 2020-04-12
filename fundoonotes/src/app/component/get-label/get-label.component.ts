import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-get-label',
  templateUrl: './get-label.component.html',
  styleUrls: ['./get-label.component.scss']
})
export class GetLabelComponent implements OnInit {

  label=[];
  constructor( private snackbar:MatSnackBar,private labelservice:LabelService,private route:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder, private dataservice:DataService ) { }
  message:string;

 

 
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message=>{;this.message=message,this. getallabels()   
      }
    )
   
  }
  
  getallabels(){
    this.labelservice.getRequest("user/"+localStorage.getItem("token")).subscribe(
    (Response:any)=>{
            
            this.label=Response.result;
            console.log(this.label)
      },
    (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
  }
  
  labelDetails(labels: any) {
    localStorage.setItem("labelNote", labels.lId);
    this.router.navigate(['dashboard/labelNotes']);
   }
}
