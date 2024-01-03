import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ClassRulesService {
  public className: IPropertyString = {
    "current-roles": "rule_current_roles",
    "platform-admin": "rule_platform_admin",
    "agency-admin": "rule_agency_admin",
    "media-team-admin": "rule_media_team_admin",
    "media-specialist": "rule_media_specialist",
    "trafficker": "rule_trafficker",
    "accounting-team-admin": "rule_accounting_team_admin",
    "accounting": "rule_accounting",
    "media-partner": "rule_media_partner",
    "client": "rule_client",
  };

  getNameClass(namespace: string | null): string {
    if (namespace) {
      return this.className[namespace] || '';
    }
    return '';
  }
}
