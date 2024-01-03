import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { Roles } from "../../pages-view.controller/pages-view.controller.interfaces";

export const VisibilityMap: IVisibilityMap = {
  show: {
    "CAMPAIGNS-ADD-BUTTON": [Roles.MediaTeamAdmin],
    "CAMPAIGNS-TYPE-DROPDOWN": [Roles.MediaTeamAdmin],
  }
}
