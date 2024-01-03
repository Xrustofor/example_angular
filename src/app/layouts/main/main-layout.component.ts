import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from "@angular/router";
import { INavigation } from "../../pages-view.controller/navigations/navigations.interfaces";
import { ControllerService } from "../../pages-view.controller/index-controller.service";
import { SpectatorService } from 'src/app/services/view-as/spectator.service';

@Component({
  selector: 'adm-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public items: INavigation[] = [];

  constructor(
    protected localStorage: LocalStorageService,
    protected spectatorService: SpectatorService,
    private router: Router,
    public controllerService: ControllerService,
  ) { }

  ngOnInit() {
    this.spectatorService.spectator$.subscribe(spectator => {
      const namespace = this.localStorage.settings('namespace').get;
      if (!namespace) { this.router.navigate(['auth/login']); }

      const menu: INavigation[] | null = this.controllerService.navigation;
      if (menu) { this.items = menu; }
    })
  }
}
