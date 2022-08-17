import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  register = false;
  login = true;

  registerFun() {
    this.register = true;
    this.login = false;
  }

  loginFun() {
    this.login = true;
    this.register = false;
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  registerForm = new FormGroup({
    fname: new FormControl('', Validators.required ),
    lname: new FormControl('', Validators.required ),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ),
    password: new FormControl('', Validators.required)

  })


  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }
  get fname() {
    return this.registerForm.get('fname')
  }

  get lname() {
    return this.registerForm.get('lname')
  }
  get email() {
    return this.registerForm.get('email')
  }

  get passwordReg() {
    return this.registerForm.get('password')
  }


  loginSubmit(){
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['/home'])
        },
        error:(err:any)=> {
          alert("Something went wrong")
          console.log(err);
        }
      })

  }
    else{
      alert('Please fill all the fields')
    }

  }

  registerSubmit() {
    console.log(this.registerForm.value)
    if(this.registerForm.valid){
      this.authService.registerService(this.registerForm.value)
      .subscribe( {
        next: (res:any) => {
          window.location.reload();
        },
        error:(err:any)=> {
          console.log(err);
        }
      })
    }
    else{
      alert('Please fill all the fields')
    }
  }

  ngOnInit(): void {
  }

}
