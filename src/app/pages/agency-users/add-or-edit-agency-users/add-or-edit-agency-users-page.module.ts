import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {AddOrEditAgencyUsersPageComponent} from "./add-or-edit-agency-users-page.component";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    AddOrEditAgencyUsersPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AddOrEditAgencyUsersPageComponent,
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class AddOrEditAgencyUsersPageModule {}
