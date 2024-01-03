import { NgModule } from '@angular/core';
import { OutsideClickDirective } from './outside-click.directive';
import { ReadonlyModeDirective } from './readonly-mode.directive';
import { AnimationDirective } from './animation.directive';
import { VisibilityDirective } from "./roles-visibility.directive";

const directives = [
  OutsideClickDirective,
  ReadonlyModeDirective,
  AnimationDirective,
  VisibilityDirective,
];

@NgModule({
  declarations: directives,
  exports: directives
})
export class DirectivesModule { }
