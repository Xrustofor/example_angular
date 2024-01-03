import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ToastService } from "./toast.service";


@Injectable()
export class Interceptor implements HttpInterceptor {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private toast: ToastService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      url: `${this.baseUrl}${req.url}`
    });
    return next.handle(secureReq).pipe(
      catchError(err => {
        if (!['401'].includes(err.status)) {
          console.error('HTTP ERROR: ', err.message)
        }
        return throwError(err);
      }),
    );
  }
}

