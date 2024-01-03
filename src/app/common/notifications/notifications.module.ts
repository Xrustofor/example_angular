import { NgModule } from '@angular/core';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from "@progress/kendo-angular-icons";
import { LoaderSkeletonModule } from '../loader-skeleton/loader-skeleton.module';

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationItemComponent,
  ],
  imports: [
    SharedModule,
    LoaderSkeletonModule,
    IconsModule,
  ],
  exports: [
    NotificationsComponent,
    NotificationItemComponent,
  ]
})
export class NotificationsModule { }
