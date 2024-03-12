import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const hashedUsername = SHA256(
        this.loginForm.get('username')?.value
      ).toString(enc.Hex);
      const hashedPassword = SHA256(
        this.loginForm.get('password')?.value
      ).toString(enc.Hex);

      this.loginService.validateUser(hashedUsername, hashedPassword);

      if (sessionStorage.getItem('currentUser')) {
        this.router.navigate(['admin/item-upload']);
      } else {
        alert('invalid');
      }
    }
  }
}
