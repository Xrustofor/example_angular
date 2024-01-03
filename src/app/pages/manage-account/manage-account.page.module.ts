import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ManageAccountPage } from "./manage-account.page";
import { SharedModule } from "src/app/shared/shared.module";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    ManageAccountPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        title: 'Manage Account',
        data: { breadcrumb: 'Manage Account', icon: "settings" },
        component: ManageAccountPage,
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class ManageAccountPageModule { }
