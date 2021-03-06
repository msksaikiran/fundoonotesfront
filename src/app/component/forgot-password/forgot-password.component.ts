import { Component, OnInit } from '@angular/core';
import { EmailVerify } from 'src/app/models/emailVerify';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailVerify:EmailVerify = new EmailVerify();

  email = new FormControl(this.emailVerify.emailId, [
    Validators.required,
    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
  ]);

  constructor(
    private snackBar: MatSnackBar,
    private httpservice: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  
  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? " "
      : "Not a valid email";
  }

  onlogin() {
    console.log(this.emailVerify);
    
    this.httpservice.postRequest("emailId", this.emailVerify).subscribe(
    (response: any) => {
        if (response.obj !=null) {
          console.log(response);
          this.snackBar.open( "Verification Sent to Email","undo",{ duration: 25000} );
        } else {
          console.log(response);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      },
    (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackBar.open(error.error.message, "undo", { duration: 25000 });
      });
  }
}
