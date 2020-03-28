import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  label:Label = new Label();
  labels:any[];
  message:string;
  lableName =new FormControl(this.label.lableName);
  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService, ) { }

  ngOnInit() {
    
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
            "Lable Creation Successfull","undo",
            {duration:2500}
          )
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


}
