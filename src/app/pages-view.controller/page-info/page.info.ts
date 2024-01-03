import {IPageRoleInfo, Roles} from "../pages-view.controller.interfaces";

export const pageRoleInfo: IPageRoleInfo = {
  [Roles.AgencyAdmin] : {
    agency: {
      breadCrumbName: 'Agency Users',
      title: "Agency Users",
    }
  }
}
