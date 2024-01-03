import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";
import { DrawerContainer } from "../../common/drawer/drawer-container";
import { SharedModule } from "../../shared/shared.module";
import { HeaderComponent } from "src/app/common/header/header.component";
import { BreadCrumbsComponent } from "src/app/common/bread-crumbs/bread-crumbs.component";
import { SubMenuComponent } from "../../common/drawer/sub-menu/sub-menu.container";
import { CanMatchTeamSection } from "../../guards/CanMatchTeamSection.guard";
import { DirectivesModule } from "src/app/directives/directives.module";
import {ProgressbarModule} from "../../common/progressbar/progressbar.module";

@NgModule({
  declarations: [
    MainLayoutComponent,
    DrawerContainer,
    SubMenuComponent,
    HeaderComponent,
    BreadCrumbsComponent,

  ],
  imports: [
    CommonModule,
    DirectivesModule,
    SharedModule,
    ProgressbarModule,
    RouterModule.forChild([
      {
        path: ':personType',
        component: MainLayoutComponent,
        canMatch: [CanMatchTeamSection],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('../../pages/dashboard/dashboard-page.module').then(m => m.DashboardPageModule)
          },
          {
            path: 'client',
            loadChildren: () => import('../../pages/client/client-page.module')
              .then(m => m.ClientPageModule)
          },
          {
            path: 'media-partner',
            loadChildren: () => import('../../pages/media-partner/media-partner-page.module')
              .then(m => m.MediaPartnerPageModule)
          },
          {
            path: 'campaigns',
            loadChildren: () => import('../../pages/campaigns/campaigns-page.module')
              .then(m => m.CampaignsPageModule),
          },
          {
            path: 'report',
            loadChildren: () => import('../../pages/report/report-page.module')
              .then(m => m.ReportPageModule)
          },
          {
            path: 'notifications',
            loadChildren: () => import('../../pages/notifications/notifications.page.module')
              .then(m => m.NotificationsPageModule)
          },
          {
            path: 'manage-account',
            loadChildren: () => import('../../pages/manage-account/manage-account.page.module')
              .then(m => m.ManageAccountPageModule)
          },
          {
            path: 'agency',
            loadChildren: () => import('../../pages/agency/agency-page.module')
              .then(m => m.AgencyPageModule)
          },
          {
            path: 'agency-users',
            loadChildren: () => import('../../pages/agency-users/agency-users-page.module')
              .then(m => m.AgencyUsersPageModule)
          },
          {
            path: 'agency-contact',
            loadChildren: () => import('../../pages/agency-contact/agency-contact.module')
              .then(m => m.AgencyContactModule)
          },
          {
            path: 'my-organization',
            loadChildren: () => import('../../pages/my-organization/my-organization.module')
              .then(m => m.MyOrganizationModule)
          },
          {
            path: '',
            loadChildren: () => import('../../pages/platform-admin/platform-admin.page.module')
              .then(m => m.PlatformAdminPageModule)
          },
        ]
      },
      {
        path: '',
        canMatch: [CanMatchTeamSection],
        children: [],
        pathMatch: 'full'
      }
    ]),
    ProgressbarModule,
  ],
})
export class MainLayoutModule { }
