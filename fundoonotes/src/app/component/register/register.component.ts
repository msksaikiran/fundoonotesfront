import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user'
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl(this.user.email, [Validators.required, Validators.email]);
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(7), Validators.maxLength(15)])
  mobile = new FormControl(this.user.number, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

  constructor(private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  getErrorName() {
    return this.name.hasError('required')
      ? 'must required'
      : this.name.hasError('name')
      ? ''
      : 'Name sholud be 4 letters';
  }

  getErrorEmail() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getErrorMobile() {
    return this.mobile.hasError('required')
      ? 'must required'
      : this.password.hasError('number')
      ? ' '
      : 'number should be 10 digits';
  }

  getErrorPassword() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('password')
      ? ''
      : 'Min 7 Elements';
  }


  onRegister() {
    console.log(this.user)
  
    console.log(this.password)

    this.httpservice.postRequest("register", this.user).subscribe(
      (response: any) => {
        this.snackBar.open(
          "Registered Successfully",
          "undo",
          { duration: 2500 }
        )
        if (response.statusCode === 200) {
          console.log(response);
          this.snackBar.open(
            "Registered Successfully",
            "undo",
            { duration: 2500 }
          )
          this.router.navigate(['/login'])
        } else {
          console.log(response);
          this.snackBar.open(
            "Registration Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }
    )
  }



}
