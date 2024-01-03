import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxComponent } from './combobox.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";


const components = [
  ComboboxComponent
]

const modules = [
  CommonModule,
  DropDownsModule,
]

@NgModule({
  declarations: components,
  imports: modules,
  exports: components
})
export class ComboboxModule { }
