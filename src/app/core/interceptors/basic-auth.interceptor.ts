import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let basicToken = btoa(environment.clientUser + ':' + environment.clientPassword);
    let token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : `Basic ${basicToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'fa',
      },
    });

    return next.handle(request);
  }
}
