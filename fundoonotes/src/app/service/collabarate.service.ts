import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollabarateService {

  //constructor() { }

  baseUrl = environment.baseUrlcollabrate;
  
  constructor(private http: HttpClient) {}

  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseUrl + url, data);
  }
  public putRequest(url: any, data: any): any {
    return this.http.put(this.baseUrl + url, data);
  
  }
  public getRequest(url: any): any {
    return this.http.get(this.baseUrl + url);
  }
  public deleteRequest(url: any): any {
    return this.http.delete(this.baseUrl + url);
  }
}
