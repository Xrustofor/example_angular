import { INavigation } from "./navigations.interfaces";
import { Roles } from "../pages-view.controller.interfaces";

const NAMESPACE: Roles = Roles.AccountingTeamAdmin;
export const accountingTeamAdmin: INavigation[] = [
  { text: "Dashboard", icon: "dashboard", selected: true, url: `/${NAMESPACE}/dashboard`, isDefaultUrl: true, id: 0 },
  {
    text: "Campaigns", icon: "campaigns", url: `/${NAMESPACE}/campaigns`, menuStatus: { default: false, value: false }, id: 1,
    items: [
      { text: "Media Plan", url: `/${NAMESPACE}/campaigns/media-plan`, id: 1 },
      { text: "Insertion Order", url: `/${NAMESPACE}/campaigns/insertion-order`, id: 3 },
      { text: "Invoices &  Payment", url: `/${NAMESPACE}/campaigns/invoices-&-payment`, id: 6 },
    ]
  },
];
