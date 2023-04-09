import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  get(filter: any | null = null) {
    let params = new HttpParams();

    for (const key in filter) {
      filter[key] ? (params = params.append(key, filter[key])) : null;
    }

    return this.http.get(`${environment.apiUrl}/crm/general-ticket`, { params: params });
  }
}
