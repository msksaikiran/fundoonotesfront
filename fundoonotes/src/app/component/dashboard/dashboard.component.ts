import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from "src/app/service/user.service";
import { Login } from 'src/app/models/login';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  login: Login = new Login();
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggle() {
    console.log(this.login);
  //  this.token = localStorage.getItem("token");
    this.httpservice
      .postRequest("login",this.login)
      .subscribe((response: any) => {
        if (response.token !=null) {
          console.log(response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("email", response.emailId);
          this.snackBar.open(
            "Login Successfull",
            "undo",

            { duration: 25000}
          );
          //this.router.navigate(["/dashboard"]);
        } else {
          console.log(response);
        //  console.log("Login:" + this.login.email);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      });
  }

}
