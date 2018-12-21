import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environments';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  baseUrl: string;
  apiUrl: string;

  constructor() {
    this.baseUrl = environment.backend;
    this.apiUrl = environment.backend + environment.api
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth header and set new url
    const modifiedRequest = request.clone({
      headers: this.getAuthHeaders(),
      url: this.getModifiedUrl(request.url),
    });

    return next.handle(modifiedRequest);
  }

  private getAuthHeaders(): HttpHeaders {
    const token: string = sessionStorage.getItem('token');
    return new HttpHeaders({ Authorization: `JWT ${token}`});
  }

  private getModifiedUrl(url: string): string {
    if (url.startsWith('assets')) return url // Do not modify assets url
    else if (url === 'auth') return this.baseUrl + url; // Use base url for auth
    else return this.apiUrl + url; // Use api url for all other requests
  }
}
