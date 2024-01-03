import { Injectable } from "@angular/core";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";

@Injectable({ providedIn: 'root' })
export class LocalNamespaceService {
  public nameUrlList: IPropertyString = {
    "current-roles": "current-roles",
    "platform-admin": "platform-admin",
    "agency-admin": "agency-admin",
    "media-team-admin": "media-team-admin",
    "media-specialist": "media-specialist",
    "trafficker": "trafficker",
    "accounting-team-admin": "accounting-team-admin",
    "accounting": "accounting",
    "media-partner": "media-partner",
    "client": "client",
  };

  getNameUrl(namespace: string | null): string {
    if (namespace) {
      return this.nameUrlList[namespace] || '';
    }
    return ''
  }
}
