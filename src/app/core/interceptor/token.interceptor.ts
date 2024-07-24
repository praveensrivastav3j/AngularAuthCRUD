import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem(environment.token_key);

  if (token) {
    const tokenezedReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    return next(tokenezedReq);
  }
  return next(req);
};
