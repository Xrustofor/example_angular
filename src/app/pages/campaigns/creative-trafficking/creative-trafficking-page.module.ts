import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { CreativeTraffickingPageComponent } from "./creative-trafficking-page.component";

@NgModule({
  declarations: [
    CreativeTraffickingPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CreativeTraffickingPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class CreativeTraffickingPageModule { }
