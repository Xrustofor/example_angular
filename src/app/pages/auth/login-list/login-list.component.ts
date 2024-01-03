import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../../services/local-storage.service";
import { AuthService } from "../../../services/auth/auth.service";
import { ControllerService } from "../../../pages-view.controller/index-controller.service";

export interface IItem {
  value: string,
  email: string,
  password: string,
  id: number,
  disabled?: boolean,
}

@Component({
  selector: "adm-login-list",
  templateUrl: 'login-list.component.html',
  styleUrls: ['login-list.component.scss'],
})
export class LoginListComponent implements OnInit {
  isSelected = false;

  public items: IItem[] = [
    { value: 'platform-admin', email: 'admin@dev.com', password: 'H5iHjaSR', id: 1 },
    { value: 'agency-admin', email: 'agencyAdmin@dev.com', password: 'H5iHjaSR', id: 2 },
    { value: 'media-team-admin', email: 'mediaTeamAdmin@dev.com', password: 'H5iHjaSR', id: 3 },
    { value: 'accounting-team-admin', email: 'accountingTeamAdmin@dev.com', password: 'H5iHjaSR', id: 4 },
    { value: 'media-partner', email: 'mediaPartner@dev.com', password: 'H5iHjaSR', id: 5 },
    { value: 'client', email: 'client@dev.com', password: 'H5iHjaSR', id: 6 },
    { value: 'current-roles', email: 'currentRole@dev.com', password: 'H5iHjaSR', id: 7, disabled: true },
    { value: 'media-specialist', email: 'mediaSpecialist@dev.com', password: 'H5iHjaSR', id: 8, disabled: true },
    { value: 'trafficker', email: 'trafficker@dev.com', password: 'H5iHjaSR', id: 9, disabled: true },
    { value: 'accounting', email: 'accounting@dev.com', password: 'H5iHjaSR', id: 10, disabled: true },
  ]

  constructor(
    private router: Router,
    private store: LocalStorageService,
    private authService: AuthService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit() {
    this.store.cleanAll();
  }

  selected(id: number) {
    const candidate: IItem | undefined = this.items.find(item => item.id === id);
    if (candidate) {
      this.isSelected = true;

      const { password, email } = candidate;
      const user = {
        email,
        password
      }
      this.authService.login(user).subscribe({
        next: (success) => {
          const namespace = this.store.settings('namespace').get;
          if (success && namespace) {
            const namespaceName = this.controllerService.localNamespace;
            this.router.navigate([`/${namespaceName}`]);
          }
        }
      })
    }
  }
}
