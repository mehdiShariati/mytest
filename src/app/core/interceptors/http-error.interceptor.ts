import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        debugger;
        this.messageService.add({ severity: 'error', detail: err.error.message });
        if (err.status === 401) {
          if (localStorage.getItem('refresh-token')) {
            this.authenticationService.getToken().subscribe(
              res => {},
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
