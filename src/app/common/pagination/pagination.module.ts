import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerModule } from "@progress/kendo-angular-pager";
import { IconsModule } from "@progress/kendo-angular-icons";
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PagerModule,
    IconsModule
  ],
  exports: [
    PaginationComponent,
  ]
})
export class PaginationModule { }
