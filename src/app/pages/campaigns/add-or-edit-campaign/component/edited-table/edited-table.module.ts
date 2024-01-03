import { NgModule } from '@angular/core';
import { IconsModule } from "@progress/kendo-angular-icons";
import {EditedTableComponent} from './edited-table.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FilterMenuModule, GridModule} from "@progress/kendo-angular-grid";
import {ButtonModule} from "../../../../../common/buttons/button/button.module";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {CustomDialogModule} from "../../../../../common/dialog/dialog.module";
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
  declarations: [
    EditedTableComponent,
  ],
    imports: [
        IconsModule,
        ReactiveFormsModule,
        GridModule,
        FilterMenuModule,
        ButtonModule,
        NgxMaskDirective,
        NgxMaskPipe,
        CustomDialogModule,
        SharedModule
    ],
  exports: [
    EditedTableComponent,
  ]
})
export class EditedTableModule { }
