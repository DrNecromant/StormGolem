import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { ILoginUser, IToken } from '@interfaces';

@Injectable()
export class AuthService {
  loggedIn$: Subject<boolean>;

  constructor(
    private http: HttpClient,
  ) {
    this.loggedIn$ = new Subject<boolean>();
  }

  // Send authentication request
  auth(loginUser: ILoginUser): Observable<IToken> {
    return this.http.post<IToken>('auth', loginUser);
  }

  // Refresh token
  refresh(): Observable<IToken> {
    const old_token: IToken = {'token': localStorage.getItem('token')};
    return this.http.post<IToken>('refresh', old_token);
  }

  logIn(token: IToken) {
    localStorage.setItem('token', token.token);
    this.loggedIn$.next(true);
  }

  logOut() {
    localStorage.setItem('token', null);
    this.loggedIn$.next(false);
  }
}
