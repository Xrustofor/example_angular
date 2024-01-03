import { NgModule } from "@angular/core";
import { ClientPageComponent } from "./client-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { RouterOutletComponent } from "src/app/common/router-outlet/router-outlet.component";
import { AddClientPageComponent } from "./add-client/add-client-page.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { EditClientPageComponent } from "./edit-client/edit-client-page.component";
import { ViewClientPageComponent } from "./view-client/view-client-page.component";

@NgModule({
  declarations: [
    ClientPageComponent,
    ViewClientPageComponent,
    EditClientPageComponent,
    AddClientPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Client', icon: 'client' },
        component: RouterOutletComponent,
        children: [
          {
            path: '',
            title: 'Client',
            component: ClientPageComponent,
          },
          {
            path: 'view',
            title: 'View Client',
            children: [{ path: ':id', component: ViewClientPageComponent, }],
          },
          {
            path: 'edit',
            title: 'Edit Client',
            children: [{ path: ':id', component: EditClientPageComponent, }],
          },
          {
            path: 'add',
            title: 'Add Client',
            data: { breadcrumb: 'Client', icon: 'plus' },
            component: AddClientPageComponent,
          },
        ]
      },
    ]),
    SharedModule,
    DirectivesModule,
  ],
})
export class ClientPageModule { }
