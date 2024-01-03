import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSkeletonComponent } from './loader-skeleton.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    LoaderSkeletonComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
  ],
  exports: [
    LoaderSkeletonComponent
  ]
})
export class LoaderSkeletonModule { }
