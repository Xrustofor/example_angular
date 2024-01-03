import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/http-interceptors.service';
import { TitleStrategy, DefaultTitleStrategy } from "@angular/router";
import { RouterOutletComponent } from "./common/router-outlet/router-outlet.component";
import { TokenInterceptor } from "./services/auth/token.interceptor";
import { LoadingInterceptor } from "./services/loading/loading-interceptor";


@NgModule({
  declarations: [
    AppComponent,
    RouterOutletComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: DefaultTitleStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
