import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import{ResetPassword} from 'src/app/models/resetPassword'
@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss']
})
export class RestPasswordComponent implements OnInit {

  restPassword: ResetPassword = new ResetPassword();
  //loginForm:FormGroup;

  token = new FormControl(this.restPassword.token);
  newPassword = new FormControl(this.restPassword.newPassword, [
    Validators.required,
    Validators.minLength(7)
  ]);



  constructor(
    private snackBar: MatSnackBar,
    private httpservice: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //this.token = this.route.snapshot.paramMap.get("token");
  }
  getErrorMessage() {
    return this.token.hasError("required")
      ? "You must enter a value"
      : this.token.hasError("token")
      ? " "
      : "Not a valid token";
  }
  getErrorPassword() {
    return this.newPassword.hasError("required")
      ? "You must enter a value"
      : this.newPassword.hasError("newPassword")
      ? " "
      : "Min 7 Elements";
  }
  onlogin() {
    console.log(this.restPassword);
   
    this.httpservice
      .putRequest("forgotPassword", this.restPassword)
      .subscribe((response: any) => {
        if (response.token !=null) {
          console.log(response);
          
          this.snackBar.open(
            "Password Rest Sucessfully",
            "undo",

            { duration: 25000}
          );
          this.router.navigate(["/login"]);
        } else {
          console.log(response);
          console.log("Login:" + this.restPassword.token);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      });
  }

}
