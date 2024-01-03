import { NgModule } from "@angular/core";
import { LoginComponents } from "../../pages/auth/login/login.component";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout.component";
import { ForgotPasswordComponent } from "../../pages/auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "../../pages/auth/reset-password/reset-password.component";
import {LoginListComponent} from "../../pages/auth/login-list/login-list.component";

@NgModule({
  declarations:[
    AuthLayoutComponent,
    LoginComponents,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponents },
          { path: 'forgot-password', component: ForgotPasswordComponent },
          { path: 'password-reset/:token', component: ResetPasswordComponent },
          { path: 'list', component: LoginListComponent },
        ]
      },
    ])
  ],
})
export class AuthLayoutModule{

}
