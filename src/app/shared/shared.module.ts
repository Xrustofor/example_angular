import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderLogoModule } from "../common/loader-logo/loader-logo.module";

import { IconsModule } from '@progress/kendo-angular-icons';
import { PagerModule } from "@progress/kendo-angular-pager";
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from "@progress/kendo-angular-notification";

import {
  GridModule,
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { FormFieldModule, InputsModule } from "@progress/kendo-angular-inputs";
import { PaginationModule } from "../common/pagination/pagination.module";
import { ButtonModule } from "../common/buttons/button/button.module";
import { CustomDialogModule } from "../common/dialog/dialog.module";
import { SearchAutocompleteModule } from "../common/inputs/search-autocomplete/search-autocomplete.module";
import { ComboboxModule } from "../common/inputs/combobox/combobox.module";
import { MenuModule } from "@progress/kendo-angular-menu";
import { LoaderSkeletonModule } from "../common/loader-skeleton/loader-skeleton.module";
import { IntlModule } from "@progress/kendo-angular-intl";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SpectatorTopBannerModule } from "../common/spectator-top-banner/spectator-top-banner.module";
import { ButtonLinkModule } from "../common/buttons/button-link/button-link.module";
import { PipesModule } from "../pipes/pipes.module";
import { CustomModalModule } from "../common/modal/modal.module";
import { TabsSliderModule } from "../common/tabs-slider/tabs-slider.module";
import { DragDropModule } from "../common/drag-drop/drag-drop.module";

const modules = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,

  IconsModule,
  PagerModule,
  DialogsModule,
  DropDownsModule,
  NotificationModule,

  GridModule,
  PDFModule,
  ExcelModule,
  ChartsModule,
  InputsModule,
  IntlModule,
  ButtonsModule,
  DateInputsModule,

  PaginationModule,
  ButtonModule,
  CustomDialogModule,
  CustomModalModule,
  FormFieldModule,
  LoaderLogoModule,
  LoaderSkeletonModule,
  TabsSliderModule,
  SpectatorTopBannerModule,
  DragDropModule,

  SearchAutocompleteModule,
  ComboboxModule,

  MenuModule,

  PipesModule,

  DropDownsModule,
  NgxMaskDirective,
  NgxMaskPipe,

  ButtonLinkModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [provideNgxMask()]
})
export class SharedModule { }
