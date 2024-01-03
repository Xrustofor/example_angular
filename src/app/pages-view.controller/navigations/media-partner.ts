 import { Roles } from "../pages-view.controller.interfaces";
import { INavigation } from "./navigations.interfaces";

const NAMESPACE: Roles = Roles.MediaPartner;
export const mediaPartner: INavigation[] = [
  { text: "Dashboard", icon: "dashboard", selected: true, url: `/${NAMESPACE}/dashboard`, isDefaultUrl: true, id: 0 },
  {
    text: "Campaigns", icon: "campaigns", url: `/${NAMESPACE}/campaigns`, menuStatus: { default: false, value: false }, id: 1,
    items: [
      { text: "Request for Proposal", url: `/${NAMESPACE}/campaigns/request-for-proposal`, id: 0 },
      { text: "Insertion Order", url: `/${NAMESPACE}/campaigns/insertion-order`, id: 3 },
      { text: "Creative Trafficking", url: `/${NAMESPACE}/campaigns/creative-trafficking`, id: 5 },
      { text: "Invoices &  Payment", url: `/${NAMESPACE}/campaigns/invoices-&-payment`, id: 6 },
    ]
  },
  { text: "Agency Contact", icon: "agency", url: `/${NAMESPACE}/agency-contact`, id: 5 },
  { text: "My Organization", icon: "organization", url: `/${NAMESPACE}/my-organization`, id: 5 },
];
