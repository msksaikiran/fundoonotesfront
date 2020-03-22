import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import{Login} from 'src/app/models/login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // login:Login=new Login();
  // loginForm:FormGroup;

  // constructor(private formBuilder:FormBuilder,private router:Router,private matsnackbar:MatSnackBar,  private userservice:UserService) { }

  //  emailId = new FormControl(null,[Validators.required,Validators.email]);
  //  password= new FormControl(null,[Validators.required,Validators.minLength(6)]);
  // ngOnInit(): void {
  // }


// errorEmailMessage(){
//   return this.emailId.hasError('required')? "Enter Fields":
//    this.emailId.hasError('email')? "Enter Email-Id":
//    this.emailId.hasError('pattern')?"Enter Email-Id - abc@gmail.com":
//    "";
//  }
//  errorPasswordMessage(){
//   return this.password.hasError('required')? "Enter Fields":
//  this.password.hasError('minlength')? "Enter Min len 6":
//    "";
//  }

//  onLogin(){
//       this.login.password=this.password.value;
//       this.login.emailId=this.emailId.value;
//       this.userservice.loginUser(this.login).subscribe(  
//       (response:any) =>{
//         if(response.statusCode===200){

//           localStorage.setItem('token',response.token);
//           this.matsnackbar.open("sucessfull", "ok", {duration:5000})
//           this.router.navigate(["/registration"]);
//         }
//       },
//       error=> {
//         this.matsnackbar.open("failed", "", {duration:5000})
//       });
//     }

  login: Login = new Login();
  loginForm:FormGroup;

  email = new FormControl(this.login.email, [
    Validators.required,
    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
  ]);
  password = new FormControl(this.login.password, [
    Validators.required,
    Validators.minLength(7)
  ]);

  token: string;
  
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
  }
  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? " "
      : "Not a valid email";
  }
  getErrorPassword() {
    return this.password.hasError("required")
      ? "You must enter a value"
      : this.password.hasError("password")
      ? " "
      : "Min 7 Elements";
  }
  onlogin() {
    console.log(this.login);
    this.token = localStorage.getItem("token");
    this.httpservice
      .postRequest("login", this.login)
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
          console.log("Login:" + this.login.email);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      });
  }

}
