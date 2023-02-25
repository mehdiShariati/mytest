import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<string>localStorage.getItem('currentUser')) ?? '');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(value: any) {
    let formData = new URLSearchParams();

    for (const key in value) {
      if (value[key])
        formData.append(key, value[key]);
    }

    return this.http.post<any>(`${environment.apiUrlPublic}/usermanagement/tokens/generate/password`, formData).pipe(map(user => {
      user.authBasic = btoa(value.username + ':' + value.password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.currentUserSubject.complete();
  }

  getCaptcha(value: any) {
    return this.http.post(`${environment.apiUrlPublic}/usermanagement/captcha`, value);
  }

  changeTemporaryPassword(value: any) {
    let formData = new URLSearchParams();

    for (const key in value) {
      if (value[key])
        formData.append(key, value[key]);
    }

    return this.http.post(`${environment.apiUrlPublic}/usermanagement/tokens/change-temporary-password`, formData);
  }

  getToken() {
    let value = {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refresh-token')
    }

    return this.http.post(`${environment.apiToken}/oauth2/token`, value);
  }
}
