import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LabelService {
  // putRequest(arg0: string, label: any) {
  //   throw new Error("Method not implemented.");
  // }

  baseurl = environment.baseUrlLabel;

  constructor(private http: HttpClient) { }
  
  public postRequest(url :any, data: any ):any{
    return this.http.post(this.baseurl + url,data);
  }

  public putRequest(url :any, data: any ):any{
    return this.http.put(this.baseurl + url,data);
  }
  public deleteRequest(url :any,data:any):any{
    return this.http.delete(this.baseurl + url,data);
  }
  
  public getRequest(url :any):any{
     return this.http.get(this.baseurl + url);
  }
 
}
