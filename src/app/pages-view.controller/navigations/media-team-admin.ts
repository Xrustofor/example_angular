import { INavigation } from "./navigations.interfaces";
import { Roles } from "../pages-view.controller.interfaces";

const NAMESPACE: Roles = Roles.MediaTeamAdmin;
export const mediaTeamAdmin: INavigation[] = [
  { text: "Dashboard", icon: "dashboard", selected: true, url: `/${NAMESPACE}/dashboard`, isDefaultUrl: true, id: 0 },
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
  { text: "Agency", icon: "agency", url: `/${NAMESPACE}/agency`, id: 2 },
  { text: "Client", icon: "client", url: `/${NAMESPACE}/client`, id: 3 },
  { text: "Media Partner", icon: "media-partner", url: `/${NAMESPACE}/media-partner`, id: 4 },
  { text: "Report", icon: "reporting", url: `/${NAMESPACE}/report`, id: 5 },
];
