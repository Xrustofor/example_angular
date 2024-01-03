import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from "@progress/kendo-angular-icons";
import {ProgressbarComponent} from "./progressbar.component";
import { ProgressBarModule } from "@progress/kendo-angular-progressbar";

@NgModule({
  declarations: [
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    ProgressBarModule
  ],
  exports: [
    ProgressbarComponent,
  ]
})
export class ProgressbarModule { }
