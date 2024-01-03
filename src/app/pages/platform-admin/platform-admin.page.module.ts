import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { PlatformAdminPage } from "./platform-admin.page";
import { RouterOutletComponent } from "../../common/router-outlet/router-outlet.component";
import { DashboardPageComponent } from "../dashboard/dashboard-page.component";

@NgModule({
  declarations: [
    PlatformAdminPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Platform Admin', icon: 'options' },
        children: [
          {
            path: 'manage-codes',
            loadChildren: () => import('./manage-codes/manage-codes.module')
              .then(m => m.ManageCodesModule)
          },
          {
            path: 'view-as',
            loadChildren: () => import('./view-as/view-as.module')
              .then(m => m.ViewAsModule)
          },
        ]
      },
    ]),
    SharedModule
  ],
})
export class PlatformAdminPageModule { }
