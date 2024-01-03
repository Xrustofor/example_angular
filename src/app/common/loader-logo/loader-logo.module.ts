import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderLogoComponent } from './loader-logo.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    LoaderLogoComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
  ],
  exports: [
    LoaderLogoComponent
  ]
})
export class LoaderLogoModule { }
