import { NgModule } from "@angular/core";
import { InsertionOrderPageComponent } from "./insertion-order-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  declarations: [
    InsertionOrderPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InsertionOrderPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class InsertionOrderPageModule { }
