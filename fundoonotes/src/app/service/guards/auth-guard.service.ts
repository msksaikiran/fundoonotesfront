import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _authService: AuthService, private _router: Router,private snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isAuthenticated()) {

      //validating the token by decoding......
      try {
        decode(localStorage.getItem('token'));
      } catch (error) {
        console.log("error**************")
        this.snackBar.open("Login Failed Invaid token", "undo", { duration: 25000 });
      }
        return true;
    }
    
    try {
      decode(localStorage.getItem('token'));
    } catch (error) {
      console.log("error**************")
      this.snackBar.open("Login Failed Invaid token", "undo", { duration: 25000 });
    }
    
    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  //data:String
  // decode() {
  //   this.data = decode(localStorage.getItem('token'));
  //   if (user.role === next.data.role) {
  //     return true;
  //   }
  //   console.log("decoded token****************************")
  //   console.log(this.data)
  //   return this.data;
  // }
}

