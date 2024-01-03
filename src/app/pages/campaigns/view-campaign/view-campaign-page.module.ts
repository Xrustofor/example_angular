import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {ViewCampaignPageComponent} from "./view-campaign-page.component";

@NgModule({
  declarations: [
    ViewCampaignPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ViewCampaignPageComponent,
      },
    ]),
    SharedModule
  ],
  exports:[ RouterModule, SharedModule ]
})
export class ViewCampaignPageModule {}
