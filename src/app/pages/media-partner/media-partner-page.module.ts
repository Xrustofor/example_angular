import { NgModule } from "@angular/core";
import { MediaPartnerPageComponent } from "./media-partner-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { RouterOutletComponent } from "../../common/router-outlet/router-outlet.component";
import { AddMediaPartnerPage } from "./add-media-partner/add-media-partner.component";
import { EditMediaPartnerPage } from "./edit-media-partner/edit-media-partner.component";

@NgModule({
  declarations: [
    MediaPartnerPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Media Partner', label: 'media_partner', icon: 'media-partner' },
        children: [
          {
            path: '',
            title: 'Media Partner',
            component: MediaPartnerPageComponent,
          },
          {
            path: 'request-verification',
            title: 'Request Verification',
            data: { breadcrumb: 'Request Verification', icon: 'fileVerification' },
            loadChildren: () => import('./request-verification/request-verification.module')
              .then(m => m.RequestVerificationModule)
          },
          {
            path: 'edit',
            title: 'Edit Media Partner',
            data: { breadcrumb: 'Media Partner', icon: 'edit' },
            children: [{ path: ':id', component: EditMediaPartnerPage, }],
          },
          {
            path: 'add',
            title: 'Add Media Partner',
            data: { breadcrumb: 'Media Partner', icon: 'plus' },
            component: AddMediaPartnerPage,
          },
        ]
      },

    ]),
    SharedModule
  ],
})
export class MediaPartnerPageModule { }
