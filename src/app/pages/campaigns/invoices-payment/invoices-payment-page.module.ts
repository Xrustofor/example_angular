import { NgModule } from "@angular/core";
import { InvoicesPaymentPageComponent } from "./invoices-payment-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  declarations: [
    InvoicesPaymentPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InvoicesPaymentPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class InvoicesPaymentPageModule { }
