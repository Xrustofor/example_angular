import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SVGIcon } from "@progress/kendo-svg-icons";
import { IParamsQuery } from "src/app/interfaces/dashboard/IParamsQuery.interface";
import { IProperty } from "src/app/interfaces/global/global.interfaces";
import { INotificationsItem, IapiMessage, IapiOneMessage } from "src/app/interfaces/main/notifications.interface";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { IPagination } from "src/app/interfaces/shared/pagination.interface";
import { DashboardService } from "src/app/services/dashboard.service";
import { ToastService } from "src/app/services/toast.service";
import { iconsSVG } from "src/assets/icons/svg-icons";

@Component({
  selector: "adm-notifications-page",
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notificationListLoading = false;
  public selectNotificationLoading = false;
  public selectedNotificationId = '';

  public notifications: INotificationsItem[] | null = null;
  public metaPaginations: IMetaPagination | null = null;
  public selectedNotification: INotificationsItem | null;

  public settingsForm: FormGroup;
  togglesData = [
    { title: 'Type Notification 1', meta: 'toggle1', icon: 'bell', value: false },
    { title: 'Type Notification 2', meta: 'toggle2', icon: 'message', value: false },
    { title: 'Type Notification 3', meta: 'toggle3', icon: 'bell', value: true },
    { title: 'Type Notification 4', meta: 'toggle4', icon: 'user', value: true },
    { title: 'Type Notification 5', meta: 'toggle5', icon: 'message', value: false },
  ]

  protected defaultSettings: IParamsQuery = {
    page: 1,
    size: 10
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    protected toast: ToastService,
    public dashboardService: DashboardService,
  ) {
    this.settingsForm = new FormGroup({});

    let toggles: IProperty<boolean> = {};
    for (let i = 0; i < this.togglesData.length; i++) {
      const data = this.togglesData[i];
      toggles[data.meta] = data.value;
    }

    const form = this.formBuilder.group(toggles)
    this.settingsForm.addControl('toggles', form);
  }

  ngOnInit() {
    this.getNotifications(this.defaultSettings);
  }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }

  getNotifications(data: IParamsQuery): void {
    this.notificationListLoading = true
    this.dashboardService.apiGetMessages(data).subscribe(res => {
      this.notificationListLoading = false;

      if (!res.data.length) return;
      this.notifications = res.data.map((item: IapiMessage) => {
        const { content: text, uuid, subject: title, updated_at: date } = item;
        return { text, uuid: uuid, title, date, type: 'user' }
      })

      if (!res.meta) return;
      this.metaPaginations = (res.meta) as IMetaPagination;
    })
  }

  chooseNotification(id: string) {
    if (id === this.selectedNotificationId) return;

    this.selectNotificationLoading = true;

    this.selectedNotificationId = id;

    this.dashboardService.apiGetOneMessage(id).subscribe((res) => {
      this.selectNotificationLoading = false;

      const { id, content, created_at, type, sender: { fullName } } = res as IapiOneMessage;
      this.selectedNotification = {
        title: fullName,
        date: created_at,
        text: content,
        type: type as "bell" | "message" | "user",
        uuid: id,
      };
    })
  }

  blurNotification() {
    setTimeout(() => this.selectedNotification = null, 300);
    this.selectedNotificationId = '';
  }

  goNextNotifications(data: IPagination) {
    const { size, page } = data;
    this.defaultSettings.size = size;
    this.defaultSettings.page = page;
    this.setQueryInUrl();
    this.notifications = null;
    this.getNotifications(data)
  }

  showToast(toggleName: string, toggleMeta: string) {
    this.toast.show(`${toggleName} set to ${this.settingsForm.value.toggles[toggleMeta]}`);
  }

  setQueryInUrl() {
    this.router.navigate([], {
      queryParams: this.defaultSettings
    })
  }
}
