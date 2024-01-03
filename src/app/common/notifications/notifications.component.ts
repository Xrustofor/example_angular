import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Utility } from "../../utility";
import { INotificationsItem } from "src/app/interfaces/main/notifications.interface";

@Component({
  selector: 'adm-notifications',
  styleUrls: ['notifications.component.scss'],
  templateUrl: 'notifications.component.html',
})
export class NotificationsComponent {
  @Output() onChoose = new EventEmitter<string>();
  @Input() public items: INotificationsItem[] | null = null;
  @Input() focusNotificationId: string;
  public item: INotificationsItem | null = null;
  protected getIcon = Utility.instance().getIcon;
}
