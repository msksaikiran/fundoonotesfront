// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserserviceService {

//   constructor() { }
// }

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { from } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserserviceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseUrl + url, data);
  }

  public putRequest(url: any): any {
    return this.http.put(this.baseUrl + url, "", {
      headers: new HttpHeaders().set("jwtToken", localStorage.getItem("token"))
    });
  }

  public getRequest(url: any): any {
    return this.http.get(this.baseUrl + url);
  }

  public deleteRequest(url: any): any {
    return this.http.delete(this.baseUrl + url);
  }
  public putRequestForget(url, data) {
    return this.http.put(this.baseUrl + url, data);
  }
}
