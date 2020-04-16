import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material';
import { Label } from 'src/app/models/label';
import { LabelId } from 'src/app/models/labelid';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  //label=[];
  label:Label = new Label();
  labels:any[];
  lid: LabelId = new LabelId();
  message:string;
  lableName = new FormControl(this.label.lableName);
  
  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService, ) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      message=>{;this.message=message,this. getallabels()   
      }
    )
  }
  
  onClose(){
  console.log(this.label);
  console.log(this.label.lableName)
  if(this.label.lableName!=null){
    console.log(this.label.lableName)
    this.labelservice.postRequest("create/"+localStorage.getItem("token"),this.label).subscribe(
      

    (Response:any)=>{
        
          if(Response.statusCode===200){
            this.dataService.changeMessage("lable")
            console.log(Response);
            this.snackbar.open(
            "Lable Creation Successfull","undo",{duration:2500} )
        }

        else{
          console.log(Response);
          console.log(this.label)
          this.snackbar.open(
            "label Creation unSuccessfull","undo",
            {duration:2500}
          )
        }
      }
    )
    }
  else{
    console.log(this.label)
    this.snackbar.open( "Lable should not be null","undo",
    {duration:2500})
  }

  }

  getallabels(){
    this.labelservice.getRequest("user/"+localStorage.getItem("token")).subscribe(
  (Response:any)=>{
            
            this.labels=Response.result;
            console.log(this.labels)
      },
  (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500});
      });
  }

  delete(label:any) {
   // console.log(label)
    this.lid.lId = label.lId;
    console.log(this.lid)
    this.labelservice.postRequest("delete/" + localStorage.getItem("token"), this.lid).subscribe(
      
  (Response:any)=>{
        if(Response.statusCode===200){
          this.dataService.changeMessage("Delet labels")
          console.log(Response)

          this.snackbar.open(
            "Label Delete successfull","undo",
            {duration:2500}
          )
        }else{
          this.snackbar.open(
            "Label Delete Unsuccessfull","undo",
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
  
  update(label: any) {

  console.log(label);
    this.label.lableName = label.lableName;
    this.lid.lId = label.lId;
    console.log(this.label.lableName)
    console.log(this.lid.lId)
  if(label.lableName!=null){
    console.log(label.lableName)
    this.labelservice.putRequest("updatelabel/"+localStorage.getItem("token")+"?lid="+this.lid.lId,this.label).subscribe(
      (Response:any)=>{
        
        if(Response.statusCode===200){
          this.dataService.changeMessage("lable")
          console.log(Response);
          this.snackbar.open("Lable Creation Successfull","undo",{duration:2500})
        }else{
          console.log(Response);
          console.log(this.label)
          this.snackbar.open("label Creation unSuccessfull","undo",{duration:2500})
        }
      }
    )
    }else{
    console.log(this.label)
    this.snackbar.open( "Lable should not be null","undo",
    {duration:2500})
  }

   }
}
