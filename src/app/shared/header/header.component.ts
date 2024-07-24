import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  Logout() {
    this.authService.LogoutApi().subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.router.navigateByUrl('/auth/login');
          localStorage.removeItem(environment.token_key);
          localStorage.removeItem(environment.user_data);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
