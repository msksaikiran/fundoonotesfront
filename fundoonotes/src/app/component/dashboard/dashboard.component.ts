import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar ,MatDialog} from '@angular/material';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { LabelService } from 'src/app/service/label.service';
import { DataService } from 'src/app/service/data.service';
import { BehaviorSubject } from 'rxjs';
import { ViewService } from 'src/app/service/view.service';
import { NoteService } from 'src/app/service/note.service';
import { UserService } from 'src/app/service/user.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/models/note';
//const uploadAPI = "http://localhost:8083/users/uploadProfile/"+localStorage.getItem("token");

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  snackBar: any;

  
  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private httpservice: UserService,
    private noteservice: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private viewservice: ViewService) { }
  
  appName: string;
  open: boolean;
  token: string;
  image: string;
  form: FormGroup;
file: File;
  //fileData: File = null;
  //form: FormGroup;
  //title = 'ng8fileuploadexample';
 // public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  
  ngOnInit() {
    this.appName = "FundooNote";
    this.image = localStorage.getItem("image");
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
        () => { console.log("completed") }
        
    );
  }


  onNotes() {
    this.token = localStorage.getItem("token");
    
    this.appName = "Keep";
    this.router.navigate(['dashboard/notes'])
  }
  onArchive() {
   
    this.appName = "Archieve";
    this.router.navigate(['dashboard/archive'])
  }
  onTrash() {
   
    this.appName = "Trash";
    this.router.navigate(['dashboard/trash'])
  }
  myInput = new FormControl();
  private obtainNotes = new BehaviorSubject([]);
  currentMessage = this.obtainNotes.asObservable();
  onsearch() {
   console.log(this.myInput.value)
    this.appName = "Search";
    this.noteservice.getRequest("searchTitle?title="+this.myInput.value).subscribe(
      (response:any)=>{this.obtainNotes.next(response)
        console.log(response)
      this.router.navigate(['dashboard/search'])
    }
    )
    //this.router.navigate(['dashboard/search'])
  }
  account() {
    localStorage.clear();
    this.router.navigate(['login'])
  }


  refresh() {
    this.dataservice.changeMessage("refresh");
  }
  openDialogLabel(notes: any) {

    const dialogRef = this.dialog.open(EditlabelComponent);
  }

  list: boolean = true;
  grid: boolean = false;

  changeView() {
    if (this.list) {
      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }
    this.viewservice.getView();
  }
  
  label = [];

  getallabels() {
    this.labelservice.getRequest("user/" + localStorage.getItem("token")).subscribe(
      (Response: any) => {
            
        this.label = Response.result;
        console.log(this.label)
      }

    )
  } 
}
