import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    if(localStorage.getItem(environment.token_key)){
      this.router.navigateByUrl('/project/list');
    }

    this.registerForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  Register() {
    if (this.registerForm.valid) {
      this.authService.RegisterUserApi(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response&&response.status == 200 && response.err ==0){
            this.registerForm.reset();
            this.router.navigateByUrl('/auth/login');
          }
        },
        error:(error:HttpErrorResponse)=>{
            console.log('error :>> ', error);
        }
      });
    }
  }
}
