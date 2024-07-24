import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // http://13.233.233.61:5000/register
  RegisterUserApi(userData: any) {
    return this.httpClient.post(`${environment.base_url}/register`, userData);
  }

  // http://13.233.233.61:5000/login
  LoginApi(loginData: any) {
    return this.httpClient.post(`${environment.base_url}/login`, loginData);
  }

  // http://13.233.233.61:5000/change-password
  ChangePasswordApi(data: any) {
    return this.httpClient.post(
      `${environment.base_url}/change-password`,
      data
    );
  }

  // http://13.233.233.61:5000/logout
  LogoutApi() {
    return this.httpClient.get(`${environment.base_url}/logout`);
  }
}
