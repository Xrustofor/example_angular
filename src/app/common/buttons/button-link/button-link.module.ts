import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from "@progress/kendo-angular-icons";
import { ButtonLinkComponent } from './button-link.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    ButtonLinkComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterLink
  ],
  exports: [
    ButtonLinkComponent,
  ]
})
export class ButtonLinkModule { }
