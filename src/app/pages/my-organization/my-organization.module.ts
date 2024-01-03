import {NgModule} from "@angular/core";
import {MyOrganizationComponent} from "./my-organization.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MyOrganizationComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'My Organization' },
        component: MyOrganizationComponent,
      },
    ]),
    SharedModule
  ],
})
export class MyOrganizationModule {}
