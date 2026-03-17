import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private BaseUrl: string = 'http://localhost:1600'



  http = inject(HttpClient)

  login(payload: any) {
    return this.http.post(`${this.BaseUrl}/auth/login`, payload)
  }

  register(payload: any) {
    return this.http.post(`${this.BaseUrl}/auth/register`, payload)
  }

  saveToken(token: string) {
    localStorage.setItem('vehicle_showroom_token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('vehicle_showroom_token')
  }

  //   isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
}
