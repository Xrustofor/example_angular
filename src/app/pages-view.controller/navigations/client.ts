import { INavigation } from "./navigations.interfaces";
import { Roles } from "../pages-view.controller.interfaces";

const NAMESPACE: Roles = Roles.Client;
export const client: INavigation[] = [
  { text: "Dashboard", icon: "dashboard", selected: true, url: `/${NAMESPACE}/dashboard`, isDefaultUrl: true, id: 0 },
  {
    text: "Campaigns", icon: "campaigns", url: `/${NAMESPACE}/campaigns`, menuStatus: { default: false, value: false }, id: 1,
    items: [
      { text: "Authorization", url: `/${NAMESPACE}/campaigns/authorization`, id: 2 },
    ]
  },
  { text: "My Organization", icon: "organization", url: `/${NAMESPACE}/my-organization`, id: 5 },
];
