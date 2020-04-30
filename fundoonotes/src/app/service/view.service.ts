import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  result:boolean = true;
  subject = new Subject();
  dir: string;
  constructor() { }
 
getView() {
  this.gridview();
  return this.subject.asObservable();
}

  gridview() {
  
  if (this.result) {
    this.dir = "column";
    this.subject.next({data:"column"});
    this.result = false;
  } else{
    this.dir = "row";
    this.subject.next({data:"row"});
    this.result = true;
  }
} 
}
