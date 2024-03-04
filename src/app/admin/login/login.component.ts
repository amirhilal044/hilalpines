import { AuthGuard } from './../shared/auth.guard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router:Router  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {

      const hashedUsername = CryptoJS.SHA256(this.loginForm.get('username')?.value).toString(
        CryptoJS.enc.Hex
      );
      const hashedPassword = CryptoJS.SHA256(this.loginForm.get('password')?.value).toString(
        CryptoJS.enc.Hex
      );


      this.loginService.validateUser(hashedUsername,hashedPassword)

      if (sessionStorage.getItem('currentUser')) {
          this.router.navigate(['admin/item-upload'])
      } else {alert('invalid')}
    }
  }
}
