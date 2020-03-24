import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseurl = environment.baseUrlNote;
  constructor(private http: HttpClient) { }

  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseurl + url, data);
  }
 
}
