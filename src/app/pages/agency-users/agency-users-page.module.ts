import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RouterOutletComponent } from "../../common/router-outlet/router-outlet.component";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "src/app/directives/directives.module";
import { AgencyUsersPageComponent } from "./agency-users-page.component";


@NgModule({
  declarations: [
    AgencyUsersPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Agency Users', label: 'agency', icon: 'agency' },
        children: [
          {
            path: '',
            title: 'Agency Users',
            component: AgencyUsersPageComponent,
          },
          {
            path: 'add',
            data: { breadcrumb: 'User', label: 'agency', icon: 'plus' },
            loadChildren: () => import('./add-or-edit-agency-users/add-or-edit-agency-users-page.module')
              .then(m => m.AddOrEditAgencyUsersPageModule)
          },
          {
            path: 'add/:id',
            data: { breadcrumb: 'User', label: 'agency', icon: 'plus' },
            loadChildren: () => import('./add-or-edit-agency-users/add-or-edit-agency-users-page.module')
              .then(m => m.AddOrEditAgencyUsersPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./add-or-edit-agency-users/add-or-edit-agency-users-page.module')
              .then(m => m.AddOrEditAgencyUsersPageModule)
          },
          {
            path: 'view/:id',
            loadChildren: () => import('./view-agency-user/view-agency-user-page.module')
              .then(m => m.ViewAgencyUserPageModule)
          },
        ]
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class AgencyUsersPageModule { }
