import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem(environment.token_key);
  let router = inject(Router);

  if (token) {
    return true;
  } else {
    localStorage.removeItem(environment.token_key);
    localStorage.removeItem(environment.user_data);
    router.navigateByUrl('/auth/login');
    return false;
  }
};
