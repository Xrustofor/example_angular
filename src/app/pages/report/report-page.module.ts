import { NgModule } from "@angular/core";
import { ReportPageComponent } from "./report-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { CreateReportPageComponent } from "./create-report/create-report-page.component";
import { RouterOutletComponent } from "src/app/common/router-outlet/router-outlet.component";

@NgModule({
  declarations: [
    ReportPageComponent,
    CreateReportPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Report', icon: 'reporting' },
        component: RouterOutletComponent,
        children: [
          {
            path: '',
            title: 'Report',
            component: ReportPageComponent,
          },
          {
            path: 'create',
            title: 'Create New Report',
            data: { breadcrumb: 'Create New Report', icon: 'plus' },
            component: CreateReportPageComponent,
          },
        ]
      },
    ]),
    SharedModule
  ],
})
export class ReportPageModule { }
