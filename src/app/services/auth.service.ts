import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { LoginUser, Token } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('http://localhost:8000/auth/', loginUser).do(
        data => this.storeToken(data.token),
        error => this.storeToken(null),
      );
  }

  // Store user information
  login(token: string) {
    this.storeToken(token);
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }
}
