import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthServiceService,
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', detail: err.message ? err.message : err.error.message });
        if (err.status === 401) {
          localStorage.removeItem('token');
          if (localStorage.getItem('refresh-token')) {
            this.authenticationService.getToken().subscribe(
              (res: any) => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                localStorage.removeItem('refresh-token');
                localStorage.setItem('currentUser', JSON.stringify(res));
                localStorage.setItem('token', res.access_token);
                localStorage.setItem('refresh-token', res.refresh_token);

                let x: any = {
                  GET: this.http.get(request.urlWithParams),
                  POST: this.http.post(request.urlWithParams, request.body),
                  PUT: this.http.put(request.urlWithParams, request.body),
                  DELETE: this.http.delete(request.urlWithParams),
                };

                return x[request.method].next((res: any) => {
                  return res;
                });
              },
              () => {
                this.authenticationService.logout();
                this.router.navigate(['auth/login']);
              },
            );
          } else {
            this.router.navigate(['auth/login']);
          }
        }

        return throwError(err);
      }),
    );
  }
}
