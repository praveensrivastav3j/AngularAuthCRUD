import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    this.changePasswordForm = formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
    });
  }

  ChangePassword() {
    this.authService
      .ChangePasswordApi(this.changePasswordForm.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response && response.status == 200 && response.err == 0) {
            this.changePasswordForm.reset();
            this.router.navigateByUrl('/auth/login');
            localStorage.removeItem(environment.token_key);
            localStorage.removeItem(environment.user_data);
          } else {
            console.log(response.msg);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
