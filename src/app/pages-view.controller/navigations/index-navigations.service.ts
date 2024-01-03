import { Injectable } from "@angular/core";
import { INavigation } from "./navigations.interfaces";
import { mediaTeamAdmin } from "./media-team-admin";
import { platformAdmin } from "./platform-admin";
import { agencyAdmin } from "./agency-admin";
import { currentRoles } from "./current-roles";
import { mediaSpecialist } from "./media-specialist";
import { trafficker } from "./trafficker";
import { accountingTeamAdmin } from "./accounting-team-admin";
import { accounting } from "./accounting";
import { mediaPartner } from "./media-partner";
import { client } from "./client";
import { IProperty } from "src/app/interfaces/global/global.interfaces";

@Injectable({ providedIn: 'root' })
export class IndexNavigationsService {
  public navigationRules: IProperty<INavigation[]> = {
    "current-roles": currentRoles,
    "platform-admin": platformAdmin,
    "agency-admin": agencyAdmin,
    "media-team-admin": mediaTeamAdmin,
    "media-specialist": mediaSpecialist,
    "trafficker": trafficker,
    "accounting-team-admin": accountingTeamAdmin,
    "accounting": accounting,
    "media-partner": mediaPartner,
    "client": client
  };

  getNavigation(namespace: string | null): INavigation[] {
    if (namespace) {
      return this.navigationRules[namespace] || [];
    }
    return []
  }

  getDefaultTabUrl(key: string): string | null {
    const menu: INavigation[] = this.navigationRules[key];
    if (!menu?.length) {
      return null;
    }

    const defaultUrl = this.findDefaultItemInArray(menu)?.url ?? null;
    if (defaultUrl) {
      return defaultUrl;
    }

    return menu[0].url;
  }

  private findDefaultItemInArray(navigationArray: INavigation[]): INavigation | null {
    for (const navigation of navigationArray) {
      if (navigation.isDefaultUrl) {
        return navigation;
      }

      if (navigation.items) {
        const foundItem = this.findDefaultItemInArray(navigation.items);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return null;
  }
}
