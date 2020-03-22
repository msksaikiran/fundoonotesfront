import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // private baseUrl = environment.baseUrluser;
//  // private Name=new Subject<any>();
//   private httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
//   constructor(private httpService:HttpService) { }

//   loginUser(login:any):any
//   {
//     return this.httpService.post(this.baseUrl+"login",login,this.httpOptions);
//   }
  


  baseUrl = environment.baseUrluser;
  constructor(private http: HttpClient) {}

  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseUrl + url, data);
  }

  // public putRequest(url: any): any {
  //   return this.http.put(this.baseUrl + url, "", {
  //     headers: new HttpHeaders().set("jwtToken", localStorage.getItem("token"))
  //   });
  // }

  public getRequest(url: any): any {
    return this.http.get(this.baseUrl + url);
  }

  // public deleteRequest(url: any): any {
  //   return this.http.delete(this.baseUrl + url);
  // }
  // public putRequestForget(url, data) {
  //   return this.http.put(this.baseUrl + url, data);
  // }
}


