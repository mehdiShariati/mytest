import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? (params = params.append(key, filter[key])) : null;
    }

    return this.http.get(`${environment.apiUrl}/usermanagement/users`, { params: params });
  }

  getCurrentUserWithToken() {
    return this.http.get(`${environment.apiUrl}/usermanagement/users/self`);
  }

  getMainPersonnel(filter: any | null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? (params = params.append(key, filter[key])) : null;
    }

    return this.http.get(`${environment.apiUrl}/usermanagement/main-personnel`, { params: params });
  }

  addUser(value: any) {
    return this.http.post(`${environment.apiUrl}/usermanagement/users`, value);
  }

  updateUser(value: any, id: string) {
    return this.http.put(`${environment.apiUrl}/usermanagement/users/${id}`, value);
  }
}
