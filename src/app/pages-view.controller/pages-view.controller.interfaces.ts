export enum Roles {
  CurrentRoles = "current-roles",
  PlatformAdmin = "platform-admin",
  AgencyAdmin = "agency-admin",
  MediaTeamAdmin = "media-team-admin",
  MediaSpecialist = "media-specialist",
  Trafficker = "trafficker",
  AccountingTeamAdmin = "accounting-team-admin",
  Accounting = "accounting",
  MediaPartner = "media-partner",
  Client = "client"
}

export interface IPageInfo {
  breadCrumbName: string,
  title: string
}
export interface IPageRoleInfo {
  [key: string]: {
    [key: string]: IPageInfo
  }
}
