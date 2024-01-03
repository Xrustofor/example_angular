import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ViewAsPage } from "./view-as.page";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
  declarations: [
    ViewAsPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'View As' },
        component: ViewAsPage,
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class ViewAsModule { }
