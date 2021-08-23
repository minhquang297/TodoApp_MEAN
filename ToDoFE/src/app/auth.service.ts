import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private webService: WebRequestService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth token will be in the header of this resp
        this.setSession(
          res.body._id,
          res.body.isAdmin,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        console.log('loged in');
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth token will be in the header of this resp
        this.setSession(
          res.body._id,
          res.body.isAdmin,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        console.log('signed up');
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getNewAccessToken() {
    return this.http
      .get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-token': `${this.getRefreshToken()}`,
          _id: `${this.getUserId()}`,
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(`${res.headers.get('x-access-token')}`);
        })
      );
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  private setSession(
    userId: string,
    isAdmin: string,
    accessToken: any,
    refreshTolen: any
  ) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshTolen);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
