import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  userName: string | undefined;
  password: string | undefined;
  mouseoverLogin: boolean = false;
  loginInvalid: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    this.authService
      .LoginUser(formValues.userName, formValues.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }
  cancel() {
    this.router.navigate(['events']);
  }
}
