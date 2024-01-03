import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDialogComponent } from './dialog.component';
import { LoaderLogoModule } from '../loader-logo/loader-logo.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

const components = [
  CustomDialogComponent
]

const modules = [
  CommonModule,
  DirectivesModule,
  LoaderLogoModule
]

@NgModule({
  declarations: components,
  imports: modules,
  exports: components
})
export class CustomDialogModule { }
