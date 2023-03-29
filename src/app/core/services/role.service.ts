import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? (params = params.append(key, filter[key])) : null;
    }

    return this.http.get(`${environment.apiUrl}/usermanagement/roles`, { params: params });
  }
}
