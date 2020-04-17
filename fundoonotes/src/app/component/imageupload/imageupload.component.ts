import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private http: HttpClient, private httpservice: UserService,
    private dataservice: DataService) { }

  form: FormGroup;
  file: File;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      file_upload: null
    });
  }

  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(event: any) {
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
    }
    
  }
  verify: boolean;
  // Upload the file to the API
  upload() {
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.file);
    // Launch post request
    this.httpservice.postRequest("uploadProfile/" + localStorage.getItem("token"), body)
      .subscribe(
        
        // Admire results
        (data) => { console.log(data) },
        
        // Or errors :-(
        error => console.log(error),
        // tell us if it's finished
        () => {
          console.log("completed")
          this.dataservice.changeMessage("uploaded");
        }
        
    );
  }
  
}
