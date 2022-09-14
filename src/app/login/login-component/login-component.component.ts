import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponentComponent implements OnInit {

  form : FormGroup | any;
  loading = false;
  submitted = false;
  loginForm: FormGroup | any;
  panel = false;
  hide = true;

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      )]),
      password: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
  });

  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required,Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )])
  });
  }

  constructor(
    private router:Router,
    private loginService: LoginServiceService
  ) {
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  register(){
    this.loginService.register(this.form.value.email, this.form.value.password);
  }
  get f() { return this.form.controls; }

  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

}
