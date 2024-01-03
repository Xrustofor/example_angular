import { Component } from "@angular/core";
import { Utility } from "../../utility";
import { iconsSVG } from "src/assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons/dist/svg-icon.interface";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'adm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected getUrl = Utility.instance().getUrl;


  get notificationUrl() {
    return 'notifications'
  }

  get manageAccountUrl() {
    return 'manage-account'
  }

  get logoutUrl() {
    return '/auth'
  }
  get getPhotoUserUrl(): string{
    const url = this.localStorageService.settings('profilePhoto').get;
    return url ? url : this.getUrl('icons/png', 'user.png')
  }
  get username() {
    return this.localStorageService.settings('fullName').get || '';
  }

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }

  logOut() {
    this.router.navigate(['auth']);
  }

}
