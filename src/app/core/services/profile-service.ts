import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? (params = params.append(key, filter[key])) : null;
    }

    return this.http.get(`${environment.apiUrl}/usermanagement/users`, { params: params });
  }

  getLoginHistory() {
    return this.http.get(`${environment.apiToken}/api/v1/usermanagement/authentication-history/success-logins/self`);
  }
  getProfieData() {
    return this.http.get(`${environment.apiToken}/api/v1/usermanagement/users/self`);
  }
}
