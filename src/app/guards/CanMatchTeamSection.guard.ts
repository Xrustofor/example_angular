import { Injectable } from "@angular/core";
import { Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";
import { NotificationService } from "@progress/kendo-angular-notification";
import { ControllerService } from "../pages-view.controller/index-controller.service";

@Injectable()
export class UserToken { }

@Injectable()
export class Permissions {
  constructor(
    public controllerService: ControllerService,
    private router: Router,
    private store: LocalStorageService,
    private notificationService: NotificationService,
  ) { }

  canAccess(user: UserToken, route: Route, segments: UrlSegment[]): boolean | Promise<boolean> {
    const namespace: string = this.store.settings('namespace').get || '';

    if (this.isUnauthorized(namespace) || this.isRuleNotFoundInViewController(segments, namespace)) {
      return this.router.navigate(['auth/login'])
    }

    else if (this.isSegmentEmpty(segments)) {
      return this.router.navigate([this.controllerService.getDefaultTabUrl() ?? 'auth/login']);
    }

    else if (this.isRuleNotFoundInFirstSegment(segments, namespace)) {
      return this.router.navigate([this.controllerService.getDefaultTabUrl() ?? 'auth/login']);
    }

    else if (this.isOnlyOneSegmentAndRuleAreCorrect(segments)) {
      return this.router.navigate([this.controllerService.getDefaultTabUrl() ?? 'auth/login']);
    }

    else if (this.isFirstSegmentAndRuleEquails(segments)) {
      return true;
    }

    else return false;
  }

  public show(content: string): void {
    this.notificationService.show({
      content,
      cssClass: "button-notification",
      animation: { type: "fade", duration: 400 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: "error", icon: true },
      width: 300,
    })
  }

  private isUnauthorized(namespace: string) {
    return !namespace;
  }

  private isRuleNotFoundInViewController(segments: UrlSegment[], namespace: string) {
    return !this.controllerService.localNamespace;
  }

  private isSegmentEmpty(segments: UrlSegment[]) {
    return !segments.length;
  }

  private isRuleNotFoundInFirstSegment(segments: UrlSegment[], namespace: string) {
    return segments[0].path !== namespace;
  }

  private isOnlyOneSegmentAndRuleAreCorrect(segments: UrlSegment[]) {
    return segments.length === 1;
  }

  private isFirstSegmentAndRuleEquails(segments: UrlSegment[]) {
    return segments[0].path === this.controllerService.localNamespace;
  }
}

@Injectable()
export class CanMatchTeamSection {
  constructor(
    private permissions: Permissions,
    private currentUser: UserToken,
  ) { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.permissions.canAccess(this.currentUser, route, segments);
  }
}
