import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAutocompleteComponent } from './search-autocomplete.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { IconsModule } from "@progress/kendo-angular-icons";

const components = [
  SearchAutocompleteComponent
]

const modules = [
  CommonModule,
  DropDownsModule,
  IconsModule,
]

@NgModule({
  declarations: components,
  imports: modules,
  exports: components
})
export class SearchAutocompleteModule { }
