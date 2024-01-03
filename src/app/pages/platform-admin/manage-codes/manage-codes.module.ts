import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ManageCodesPage } from "./manage-codes.page";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    ManageCodesPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Manage Codes' },
        component: ManageCodesPage,
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class ManageCodesModule { }
