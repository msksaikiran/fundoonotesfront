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
          }

    )
  }
  update(label:any){
  
    console.log(label
       )
    // this.labelservice.putRequest("update?lableId="+label.la,label).subscribe(
    //   (Response:any)=>{
    //     if(Response.statusCode===200){
    //       this.dataservice.changeMessage("Update labels")
    //       console.log(Response)

    //       this.snackbar.open(
    //         "Label Updates Successfull","undo",
    //         {duration:2500}
    //       )
    //     }
    //     else{
    //       this.snackbar.open(
    //         "Label Update UnSuccessfull","undo",
    //         {duration:2500}
    //       )
    //     }
    //   }
      
    // )

  }
  delete(label){
  //   this.labelservice.deleteRequest("delete?labelId="+label.labelId).subscribe(
  //     (Response:any)=>{
  //       if(Response.statusCode===200){
  //         this.dataservice.changeMessage("Delet labels")
  //         console.log(Response)

  //         this.snackbar.open(
  //           "Label Delete successfull","undo",
  //           {duration:2500}
  //         )
  //       }
  //       else{
  //         this.snackbar.open(
  //           "Label Delete Unsuccessfull","undo",
  //           {duration:2500}
  //         )
  //       }
  //     }
      

  //   )
   }
}
