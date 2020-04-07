import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LabelService {

  baseurl = environment.baseUrlLabel;

  constructor(private http: HttpClient) { }
  
  public postRequest(url :any, data: any ):any{
    return this.http.post(this.baseurl + url,data);
  }

  public deleteRequest(url :any,data:any):any{
    return this.http.delete(this.baseurl + url,data);
  }
  
  public getRequest(url :any):any{
     return this.http.get(this.baseurl + url);
  }
 
}
