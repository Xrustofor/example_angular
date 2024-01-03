import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpResponse, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import {LoadingService} from "./loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private trigger = false;
  constructor(
    private loading: LoadingService
  ) {}
  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if(!this.trigger){ this.setStatus(true); }
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse){
            if(this.trigger){ this.setStatus(false) }
          }

        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if(this.trigger){ this.setStatus(false) }
          }
        }
      )
    )
  }
  setStatus(status: boolean){
    this.loading.setLoading(status);
    this.trigger = status;
  }
}
