import { NgModule } from '@angular/core';
import { LoaderLogoModule } from '../loader-logo/loader-logo.module';
import { IconsModule } from "@progress/kendo-angular-icons";
import { ButtonModule } from '../buttons/button/button.module';
import { LoaderSkeletonModule } from '../loader-skeleton/loader-skeleton.module';
import { RouterLink } from "@angular/router";
import { CampaignItemComponent } from './campaign-item/campaign-item.component';
import { CampaignsComponent } from './campaigns.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignItemComponent,
  ],
  imports: [
    SharedModule,
    LoaderSkeletonModule,
    LoaderLogoModule,
    ButtonModule,
    IconsModule,
    RouterLink,
    DirectivesModule,
  ],
  exports: [
    CampaignsComponent,
    CampaignItemComponent,
  ]
})
export class CampaignsModule { }
