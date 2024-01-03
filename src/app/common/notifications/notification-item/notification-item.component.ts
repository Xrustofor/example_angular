import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Utility } from "../../../utility";
import { INotificationsItem } from "src/app/interfaces/main/notifications.interface";

@Component({
  selector: 'adm-notifications-item',
  styleUrls: ['notification-item.component.scss'],
  templateUrl: 'notification-item.component.html',
})
export class NotificationItemComponent {
  protected getIcon = Utility.instance().getIcon;
  @Input() public item: INotificationsItem = {
    title: '',
    date: new Date().getTime(),
    text: '',
    type: "bell",
    uuid: '0'
  }
  @Input() selectable: boolean;
  @Input() focused: boolean;
  @Output() onChoose = new EventEmitter();
}
