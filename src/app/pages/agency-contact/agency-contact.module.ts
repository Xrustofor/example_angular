import {NgModule} from "@angular/core";
import {AgencyContactComponent} from "./agency-contact.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AgencyContactComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'agency-contact' },
        component: AgencyContactComponent,
      },
    ]),
    SharedModule
  ],
})
export class AgencyContactModule {}
