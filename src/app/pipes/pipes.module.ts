import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { filterPipe } from "./filter.pipe";
import { strConvertMaskPipe } from './str-convert-mask.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [
    filterPipe,
    strConvertMaskPipe,
    CapitalizePipe,
    DateFormatPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    filterPipe,
    strConvertMaskPipe,
    CapitalizePipe,
    DateFormatPipe,
  ]
})
export class PipesModule { }
