import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

const headers = { 'content-type': 'application/x-www-form-urlencoded', accept: '*/*' };

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  logOutSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<string>localStorage.getItem('currentUser')) ?? '');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  reqForLogOut() {
    this.logOutSubject.next(true);
  }

  login(value: any) {
    let formData = new URLSearchParams();

    for (const key in value) {
      if (value[key]) formData.append(key, value[key]);
    }

    return this.http
      .post<any>(`${environment.apiUrlPublic}/usermanagement/tokens/generate/password`, formData, {
        headers: headers,
      })
      .pipe(
        map(user => {
          user.authBasic = btoa(value.username + ':' + value.password);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.currentUserSubject.next(null);
    this.currentUserSubject.complete();
  }

  getCaptcha(value: any) {
    return this.http.post(`${environment.apiUrlPublic}/usermanagement/captcha`, value, {
      headers: headers,
    });
  }

  changeTemporaryPassword(value: any) {
    let formData = new URLSearchParams();

    for (const key in value) {
      if (value[key]) formData.append(key, value[key]);
    }

    return this.http.post(`${environment.apiUrlPublic}/usermanagement/tokens/change-temporary-password`, formData, {
      headers: headers,
    });
  }

  getToken() {
    let value = new URLSearchParams();
    value.append('grant_type', 'refresh_token');
    value.append('refresh_token', <string>localStorage.getItem('refresh-token'));

    return this.http.post(`${environment.apiToken}/oauth2/token`, value, {
      headers: headers,
    });
  }

  getAuthenticationHistory(filter: any | null = null) {
    let params = new HttpParams();

    for (const key in filter) {
      if (filter[key]) params = params.append(key, filter[key]);
    }

    return this.http.get(`${environment.apiUrl}/usermanagement/authentication-history/success-logins/self`, {
      params: params,
    });
  }
}
