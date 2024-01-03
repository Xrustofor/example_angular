import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RouterOutletComponent } from "../../common/router-outlet/router-outlet.component";
import { RouterModule } from "@angular/router";
import { AgencyPageComponent } from "./agency-page.component";
import { ViewAgencyPageComponent } from "./view-agency/view-agency-page.component";
import { EditAgencyPageComponent } from "./edit-agency/edit-agency-page.component";
import { AddAgencyPageComponent } from "./add-agency/add-agency-page.component";

@NgModule({
  declarations: [
    AgencyPageComponent,
    ViewAgencyPageComponent,
    EditAgencyPageComponent,
    AddAgencyPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Agency', icon: 'agency' },
        children: [
          {
            path: '',
            title: 'Agency',
            component: AgencyPageComponent,
          },
          {
            path: 'view',
            title: 'View Agency',
            children: [{ path: ':id', component: ViewAgencyPageComponent }],
          },
          {
            path: 'edit',
            title: 'Edit Agency',
            children: [{ path: ':id', component: EditAgencyPageComponent }],
          },
          {
            path: 'add',
            title: 'Add Agency',
            data: { breadcrumb: 'Agency', icon: 'plus' },
            component: AddAgencyPageComponent,
          },
        ]
      },
    ]),
    SharedModule,
  ],
})
export class AgencyPageModule { }
