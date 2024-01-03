import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { LocalStorageService } from "../local-storage.service";
import { ToastService } from "../toast.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private baseUrl = environment.apiBaseUrl;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    public authService: AuthService,
    private localStorage: LocalStorageService,
    private toast: ToastService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.settings('token').get;

    if (token) {
      request = this.addToken(request, token as string);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (request.url === `${this.baseUrl}/login`) {
          return throwError(error);
        }

        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.router.navigate(['/auth/login']);
          this.toast.show(error.message, 'error');
        }
        else if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.apiRefreshToken().pipe(
        switchMap((token: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        })
      );

    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
