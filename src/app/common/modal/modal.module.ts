import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderLogoModule } from '../loader-logo/loader-logo.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CustomModalComponent } from './modal.component';

@NgModule({
    declarations: [CustomModalComponent],
    imports: [
        CommonModule,
        DirectivesModule,
        LoaderLogoModule
    ],
    exports: [CustomModalComponent]
})

export class CustomModalModule { }