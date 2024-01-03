import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { RequestForProposalPage } from "./request-for-proposal-page.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { RouterOutletComponent } from "src/app/common/router-outlet/router-outlet.component";
import { ViewCampaignRequestsPageComponent } from "./view-campaign-requests/view-campaign-requests-page.component";
import { AddProposalRequestPageComponent } from "./add-proposal-request/add-proposal-request-page.component";

@NgModule({
  declarations: [
    RequestForProposalPage,
    ViewCampaignRequestsPageComponent,
    AddProposalRequestPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Request for Proposal' },
        component: RouterOutletComponent,
        children: [
          {
            path: '',
            title: 'Request for Proposal',
            component: RequestForProposalPage,
          },
          {
            path: 'view',
            title: 'View Proposal Request',
            children: [
              {
                path: ':id',
                children: [
                  {
                    path: 'add-request',
                    title: 'Add Proposal Request',
                    component: AddProposalRequestPageComponent
                  },
                  {
                    path: '',
                    title: 'View Proposal Request',
                    component: ViewCampaignRequestsPageComponent
                  }
                ]
              }
            ],
          },
        ]
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class RequestForProposalPageModule { }
