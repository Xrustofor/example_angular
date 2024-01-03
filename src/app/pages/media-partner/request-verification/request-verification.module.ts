import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { RequestVerificationComponent } from "./request-verification.component";

@NgModule({
  declarations: [
    RequestVerificationComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RequestVerificationComponent,
      },
    ]),
    SharedModule
  ],
})
export class RequestVerificationModule { }
