import { Injectable } from "@angular/core";
import { NotificationService } from "@progress/kendo-angular-notification";
import { ToastType } from "../interfaces/shared/toast.interface";

@Injectable({providedIn: 'root'})
export class ToastService{
  constructor(private notificationService: NotificationService){}
  public show(content: string, type: ToastType = 'info'): void {
    this.notificationService.show({
      content,
      cssClass: "button-notification",
      animation: { type: "fade", duration: 400 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: type , icon: true },
    })
  }
}
