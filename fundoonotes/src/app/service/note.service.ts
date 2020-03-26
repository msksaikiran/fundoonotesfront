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
  public getRequest(url: any): any {
    return this.http.get(this.baseurl + url);
  }
  public putRequest(url: any,data:any): any {
    return this.http.put(this.baseurl + url,data);
  }
  public deleteRequest(url: any,data): any {
    return this.http.get(this.baseurl + url,data);
  }
}
