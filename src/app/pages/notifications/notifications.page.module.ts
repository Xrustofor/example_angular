import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NotificationsPage } from "./notifications.page";
import { NotificationsModule } from "src/app/common/notifications/notifications.module";
import { LabelModule } from "@progress/kendo-angular-label";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
    declarations: [
        NotificationsPage
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                title: 'Notifications',
                data: { breadcrumb: 'Notifications', icon: 'bell' },
                component: NotificationsPage,
            },
        ]),
        SharedModule,
        DirectivesModule,
        NotificationsModule,
        LabelModule,
    ],
})
export class NotificationsPageModule { }
