import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ViewService } from 'src/app/service/view.service';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';

@Component({
  selector: 'app-searchnotes',
  templateUrl: './searchnotes.component.html',
  styleUrls: ['./searchnotes.component.scss']
})
export class SearchnotesComponent implements OnInit {
  

  data:any;
  
  constructor(private route:ActivatedRoute,public dialog: MatDialog,private router:Router,private dashboard:DashboardComponent) { }

  ngOnInit() {
    this.dashboard.currentMessage.subscribe(
      response=>{this.data=response,
      console.log(this.data);
      }
    )
  }

  onUpdate(note: any): void {
    
    console.log(note);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data =
    {
      'title': note.title,
      'description': note.description,
      'nid': note.nid,
      'color':note.colour
    };
    let dialogRef = this.dialog.open(NoteupdateComponent, dialogConfig);
  
  }
}
