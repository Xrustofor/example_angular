import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AddOrEditCampaignPageComponent } from "./add-or-edit-campaign-page.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { EditedTableModule } from "./component/edited-table/edited-table.module";

@NgModule({
  declarations: [
    AddOrEditCampaignPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AddOrEditCampaignPageComponent,
      },
    ]),
    SharedModule,
    DirectivesModule,
    EditedTableModule,
  ],
})
export class AddOrEditCampaignPageModule { }
