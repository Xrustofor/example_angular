import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { DashboardPageComponent } from "./dashboard-page.component";
import { NotificationsModule } from "src/app/common/notifications/notifications.module";
import { CampaignsModule } from "src/app/common/campaigns/campaigns.module";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    DashboardPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Dashboard', icon: 'dashboard' },
        title: 'Dashboard',
        component: DashboardPageComponent,
      },
    ]),
    SharedModule,
    DirectivesModule,
    NotificationsModule,
    CampaignsModule,
  ],
})
export class DashboardPageModule { }
