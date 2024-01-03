import { Injectable } from '@angular/core';
import { IAppAuthorization, IAuthorization, IUserAuthorization } from "../interfaces/auth/authorization.interface";
import { Utility } from "src/app/utility";
import { ILogin } from './auth/models/authorization.interface';

export interface ISettings {
  set: (value: string) => void,
  get: string | null,
  clean: () => void,
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly NAMESPACE = 'namespace';
  private readonly TITLE = 'title';
  private readonly TIMEOUT = 'timeOut';
  private readonly TOKEN = 'token';
  private readonly DELAY = 'delay';
  private readonly TYPE = 'type';
  private readonly FULLNAME = 'fullName';
  private readonly PROFILE_PHOTO = 'profilePhoto';
  private readonly NAME = 'name';
  private readonly AGENCY_LOGO = 'agency_logo';


  protected differenceDate = Utility.instance().differenceDate;

  constructor() { }

  settings(key: string): ISettings {
    const set = (value: string): void => localStorage.setItem(key, value);
    const get = localStorage.getItem(key)
    const clean = () => localStorage.removeItem(key);

    return { set, get, clean }
  }

  setTimeOut(delay: string = '10') {
    if (delay === null) { return }
    const timeOut = new Date().getTime() + (+delay * 60 * 1000);
    this.settings(this.TIMEOUT).set(String(timeOut))
  }

  setAuthorization(item: IAuthorization): void {
    const { delay, token, type } = item;

    this.settings(this.TOKEN).set(token);
    this.settings(this.DELAY).set(delay);
    this.settings(this.TYPE).set(type);
    this.setTimeOut(delay);
  }

  setAppAuthorization(payload: IAppAuthorization): void {
    const { namespace, title, name, logo } = payload;
    this.settings(this.NAMESPACE).set(namespace);
    this.settings(this.TITLE).set(title);
    this.settings(this.NAME).set(name);
    this.settings(this.AGENCY_LOGO).set(logo);
  }

  setUserAuthorization(payload: IUserAuthorization): void {
    const { full_name, profile_photo } = payload
    this.settings(this.FULLNAME).set(full_name);
    this.settings(this.PROFILE_PHOTO).set(profile_photo);
  }

  cleanAuthorization() {
    this.settings(this.TOKEN).clean();
    this.settings(this.DELAY).clean();
    this.settings(this.TYPE).clean();
  }

  cleanAppAuthorization() {
    this.settings(this.NAMESPACE).clean();
    this.settings(this.TITLE).clean();
  }

  cleanUserAuthorization() {
    this.settings(this.FULLNAME).clean();
    this.settings(this.PROFILE_PHOTO).clean();
  }

  cleanTimeOut() {
    this.settings(this.TIMEOUT).clean();
  }

  cleanAll() {
    this.cleanAuthorization();
    this.cleanAppAuthorization();
    this.cleanUserAuthorization();
    this.cleanTimeOut();
  }

  getCurrentUserAuthentication(): ILogin {
    return {
      app: {
        namespace: this.settings(this.NAMESPACE).get || '',
        title: this.settings(this.TITLE).get || '',
        name: this.settings(this.NAME).get || '',
        logo: this.settings(this.AGENCY_LOGO).get || '',
      },
      authorization: {
        delay: this.settings(this.DELAY).get || '',
        token: this.settings(this.TOKEN).get || '',
        type: this.settings(this.TYPE).get || '',
      },
      user: {
        full_name: this.settings(this.FULLNAME).get || '',
        profile_photo: this.settings(this.PROFILE_PHOTO).get || '',
      }
    }
  }

  getTimeToken(): number {
    const timeOut = this.settings(this.TIMEOUT).get;
    if (timeOut) {
      const time = Math.round((+timeOut - new Date().getTime()) / (60 * 1000));
      return time > 0 ? time : 0
    } else {
      return 0;
    }
  }

  static purge(key: string) {
    localStorage.removeItem(key);
  }
}

