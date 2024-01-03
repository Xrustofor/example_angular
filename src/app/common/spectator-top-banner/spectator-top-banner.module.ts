import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpectatorTopBannerComponent } from './spectator-top-banner.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ButtonModule } from '../buttons/button/button.module';
import { IconsModule } from "@progress/kendo-angular-icons";

@NgModule({
  declarations: [
    SpectatorTopBannerComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    IconsModule,
    ButtonModule,
  ],
  exports: [
    SpectatorTopBannerComponent
  ]
})
export class SpectatorTopBannerModule { }
