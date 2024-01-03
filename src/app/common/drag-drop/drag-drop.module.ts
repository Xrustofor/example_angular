import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from './drag-drop.component';
import { IconsModule } from "@progress/kendo-angular-icons";
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    DragDropComponent
  ],
  imports: [
    DirectivesModule,
    IconsModule,
    CommonModule,
    PipesModule,
  ],
  exports: [
    DragDropComponent
  ]
})
export class DragDropModule { }
