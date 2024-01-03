import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { MediaPlanPageComponent } from "./media-plan-page.component";

@NgModule({
  declarations: [
    MediaPlanPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MediaPlanPageComponent,
      },
    ]),
    SharedModule
  ],
  exports: [RouterModule, SharedModule]
})
export class MediaPlanPageModule { }
