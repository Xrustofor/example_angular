import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AuthorizationPageComponent } from "./authorization-page.component";

@NgModule({
  declarations: [
    AuthorizationPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthorizationPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class AuthorizationPageModule { }
