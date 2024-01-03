import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from "@progress/kendo-angular-icons";
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ButtonComponent,
  ]
})
export class ButtonModule { }
