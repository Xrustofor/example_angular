import { INavigation } from "./navigations.interfaces";
import { Roles } from "../pages-view.controller.interfaces";

const NAMESPACE: Roles = Roles.PlatformAdmin;
export const platformAdmin: INavigation[] = [
  {
    text: "Platform Admin", icon: "dashboard", url: `/${NAMESPACE}/dashboard`, menuStatus: { default: false, value: false }, isDefaultUrl: true, id: 0,
    items: [
      { text: "Manage Codes", url: `/${NAMESPACE}/manage-codes`, id: 0 },
      { text: "View As", url: `/${NAMESPACE}/view-as`, id: 1 },
    ]
  },
  {
    text: "Campaigns", icon: "campaigns", url: `/${NAMESPACE}/campaigns`, menuStatus: { default: false, value: false }, id: 1,
    items: [
      { text: "Request for Proposal", url: `/${NAMESPACE}/campaigns/request-for-proposal`, id: 0 },
      { text: "Media Plan", url: `/${NAMESPACE}/campaigns/media-plan`, id: 1 },
      { text: "Authorization", url: `/${NAMESPACE}/campaigns/authorization`, id: 2 },
      { text: "Insertion Order", url: `/${NAMESPACE}/campaigns/insertion-order`, id: 3 },
      { text: "Booking Form", url: `/${NAMESPACE}/campaigns/booking-form`, id: 4 },
      { text: "Creative Trafficking", url: `/${NAMESPACE}/campaigns/creative-trafficking`, id: 5 },
      { text: "Invoices &  Payment", url: `/${NAMESPACE}/campaigns/invoices-&-payment`, id: 6 },
    ]
  },
  { text: "Agency", icon: "agency", url: `/${NAMESPACE}/agency`, id: 3 },
  { text: "Client", icon: "client", url: `/${NAMESPACE}/client`, id: 4 },
  { text: "Report", icon: "reporting", url: `/${NAMESPACE}/report`, id: 6 },
];
