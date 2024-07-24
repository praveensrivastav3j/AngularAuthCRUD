import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  loginResponse:any={};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {

    if(localStorage.getItem(environment.token_key)){
      this.router.navigateByUrl('/project/list');
    }

    this.loginForm = formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      this.authService.LoginApi(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response && response.status == 200 && response.err == 0) {
            this.loginResponse = response.data;
            localStorage.setItem(environment.token_key, this.loginResponse.token);
            localStorage.setItem(environment.user_data, JSON.stringify(this.loginResponse));
            this.loginForm.reset();
            this.router.navigateByUrl('/project/list');

          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    }
  }
}
