import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { BookingFormPageComponent } from "./booking-form-page.component";

@NgModule({
  declarations: [
    BookingFormPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BookingFormPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class BookingFormPageModule { }
