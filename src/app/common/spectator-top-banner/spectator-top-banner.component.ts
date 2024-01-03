import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SVGIcon } from "@progress/kendo-svg-icons";
import { Observable } from 'rxjs';
import { ControllerService } from 'src/app/pages-view.controller/index-controller.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SpectatorService } from 'src/app/services/view-as/spectator.service';
import { ViewAsService } from 'src/app/services/view-as/view-as.service';
import { iconsSVG } from 'src/assets/icons/svg-icons';

@Component({
  selector: 'adm-spectator-top-banner',
  templateUrl: './spectator-top-banner.component.html',
  styleUrls: ['./spectator-top-banner.component.scss'],
})
export class SpectatorTopBannerComponent implements OnInit {

  get addNewIcon(): SVGIcon | undefined { return this.getIcon('addNew') }
  get glassesIcon(): SVGIcon | undefined { return this.getIcon('glasses') }
  get closeIcon(): SVGIcon | undefined { return this.getIcon('close') }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    this.spectatorService.exitFromSpectatorMode();
  }

  constructor(
    private authService: AuthService,
    private viewAsService: ViewAsService,
    private spectatorService: SpectatorService,
    private controllerService: ControllerService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(loggedUser => {
      if (!loggedUser) {
        this.spectatorService.hideBanner();
        this.spectatorService.exitFromSpectatorMode();
      }
    })
  }

  get isShowBanner$(): Observable<boolean> {
    return this.spectatorService.isShow$;
  }

  get currentRole() {
    return this.spectatorService.getUser()?.app.title || this.localStorageService.settings('title').get || '';
  }

  get selectedRole() {
    return this.spectatorService.getSpectator()?.app.title;
  }

  getIcon(name: string) {
    if (!name) { return }
    const candidate: string | undefined = Object.keys(iconsSVG).find(key => key === name);
    if (!candidate) { return }
    return iconsSVG[candidate] as SVGIcon;
  }

  deactivateSpectatorMode() {
    this.spectatorService.hideBanner();

    this.viewAsService.apiExitFromSpectatorMode().subscribe(response => {
      this.spectatorService.exitFromSpectatorMode();

      const namespaceName = this.controllerService.localNamespace;
      this.router.navigate([`/${namespaceName}/view-as`], { queryParams: { animate: true } });
    });
  }
}
