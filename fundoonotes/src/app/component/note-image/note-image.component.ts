import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { ViewService } from 'src/app/service/view.service';

@Component({
  selector: 'app-note-image',
  templateUrl: './note-image.component.html',
  styleUrls: ['./note-image.component.scss']
})
export class NoteImageComponent implements OnInit {

  @Input() noteimage:any;
  direction:string="row";
  view: any;

  constructor(
    private noteService: NoteService,
    private viewservice: ViewService) { }

  ngOnInit() {
    this.profile();
    
    //this.direction=localStorage.getItem("dir")
    // this.viewservice.getView().subscribe(
    //   (res) => {
    //               this.view = res;
    //               this.direction = this.view.data;
    //               console.log("direction..................."+this.view.data)
    //               console.log(this.direction);
                   
    //   });  
    
  }

  noteImage = [];

  profile() {
    //localStorage.
    this.noteService.postRequest("getimageurl/"+this.noteimage.nid,"")
      .subscribe((response: any) => {
        console.log("Profile..........................>>>>>")
        console.log(response.obj)
        if (response!= null) {
          this.noteImage = response.obj;
        }
      });
     
  }

}
