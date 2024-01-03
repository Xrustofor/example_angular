import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {ViewAgencyUserPageComponent} from "./view-agency-user-page.component";

@NgModule({
  declarations: [
    ViewAgencyUserPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ViewAgencyUserPageComponent,
      },
    ]),
    SharedModule
  ],
})
export class ViewAgencyUserPageModule {}
