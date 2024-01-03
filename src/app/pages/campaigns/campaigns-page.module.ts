import { NgModule } from "@angular/core";
import { CampaignsPageComponent } from "./campaigns-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { RouterOutletComponent } from "../../common/router-outlet/router-outlet.component";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    CampaignsPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Campaigns', icon: 'campaigns' },
        children: [
          {
            path: '',
            title: 'Campaigns',
            component: CampaignsPageComponent,
          },
          {
            path: 'add',
            title: 'Add campaigns',
            loadChildren: () => import('./add-or-edit-campaign/add-or-edit-campaign-page.module').then(m => m.AddOrEditCampaignPageModule)
          },
          {
            path: 'edit/:id',
            title: 'Edit Campaign',
            loadChildren: () => import('./add-or-edit-campaign/add-or-edit-campaign-page.module').then(m => m.AddOrEditCampaignPageModule)
          },
          {
            path: 'view/:id',
            title: 'View Campaign',
            loadChildren: () => import('./view-campaign/view-campaign-page.module').then(m => m.ViewCampaignPageModule)
          },

          // Campaigns tabs
          {
            path: 'request-for-proposal',
            loadChildren: () => import('./request-for-proposal/request-for-proposal-page.module').then(m => m.RequestForProposalPageModule)
          },
          {
            path: 'media-plan',
            title: 'Media Plan',
            loadChildren: () => import('./media-plan/media-plan-page.module').then(m => m.MediaPlanPageModule)
          },
          {
            path: 'authorization',
            title: 'Authorization',
            loadChildren: () => import('./authorization/authorization-page.module').then(m => m.AuthorizationPageModule)
          },
          {
            path: 'insertion-order',
            title: 'Insertion Order',
            loadChildren: () => import('./insertion-order/insertion-order-page.module').then(m => m.InsertionOrderPageModule)
          },
          {
            path: 'booking-form',
            title: 'Booking Form',
            loadChildren: () => import('./booking-form/booking-form-page.module').then(m => m.BookingFormPageModule)
          },
          {
            path: 'creative-trafficking',
            title: 'Creative Trafficking',
            loadChildren: () => import('./creative-trafficking/creative-trafficking-page.module').then(m => m.CreativeTraffickingPageModule)
          },
          {
            path: 'invoices-&-payment',
            title: 'Invoices & Payment',
            loadChildren: () => import('./invoices-payment/invoices-payment-page.module').then(m => m.InvoicesPaymentPageModule)
          },
        ]
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
  exports: [RouterModule, SharedModule]
})
export class CampaignsPageModule { }
