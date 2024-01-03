import { INavigation } from "./navigations.interfaces";
import { Roles } from "../pages-view.controller.interfaces";

const NAMESPACE: Roles = Roles.AgencyAdmin;
export const agencyAdmin: INavigation[] = [
  { text: "Dashboard", icon: "dashboard", selected: true, url: `/${NAMESPACE}/dashboard`, isDefaultUrl: true, id: 0 },
  { text: "Campaigns", icon: "campaigns", url: `/${NAMESPACE}/campaigns`, id: 1 },
  { text: "Agency Users", icon: "agency", url: `/${NAMESPACE}/agency-users`, id: 2 },
  { text: "Client", icon: "client", url: `/${NAMESPACE}/client`, id: 3 },
  { text: "Media Partner", icon: "media-partner", url: `/${NAMESPACE}/media-partner`, id: 4 },
  { text: "Report", icon: "reporting", url: `/${NAMESPACE}/report`, id: 5 },
];
