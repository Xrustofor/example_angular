import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage.service";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { ILogin } from "../auth/models/authorization.interface";

export interface IDemonstrateUserResponse {
  app: { namespace: string, title: string, logo: string, name: string },
  redirect: string,
  status: string,
  user: { full_name: string, profile_photo: string }
}

@Injectable({ providedIn: 'root' })
export class SpectatorService {

  private readonly _user = new BehaviorSubject<ILogin | null>(null);
  readonly user$ = this._user.asObservable();

  private readonly _spectator = new BehaviorSubject<IDemonstrateUserResponse | null>(null);
  readonly spectator$ = this._spectator.asObservable();

  private readonly _isShow = new ReplaySubject<boolean>();
  readonly isShow$ = this._isShow.asObservable();

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  showBanner() {
    this._isShow.next(true);
  }

  hideBanner() {
    this._isShow.next(false);
  }

  saveCurrentUserCredentials(user: ILogin) {
    this.localStorageService.settings('spectator').set(JSON.stringify(user));

    this._user.next(user);
  }

  updateCurrentUserToSpectator(spectator: IDemonstrateUserResponse) {
    this.localStorageService.setAppAuthorization(spectator.app);
    this.localStorageService.setUserAuthorization(spectator.user);

    this._spectator.next(spectator);
  }

  exitFromSpectatorMode() {
    const jsonUser = this.localStorageService.settings('spectator').get || ''
    if (!jsonUser) return;

    const currentUser = JSON.parse(jsonUser) as ILogin;

    this.localStorageService.settings('namespace').set(currentUser.app.namespace)
    this.localStorageService.settings('title').set(currentUser.app.title)
    this.localStorageService.settings('name').set(currentUser.app.name)
    this.localStorageService.settings('fullName').set(currentUser.user.full_name)
    this.localStorageService.settings('profilePhoto').set(currentUser.user.profile_photo)

    this.localStorageService.settings('spectator').clean();

    this._user.next(null);
    setTimeout(() => this._spectator.next(null), 100);
  }

  getSpectator(): IDemonstrateUserResponse | null {
    return this._spectator.value;
  }

  getUser(): ILogin | null {
    return this._user.value;
  }
}
