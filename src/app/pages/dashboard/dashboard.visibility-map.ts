import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { Roles } from "../../pages-view.controller/pages-view.controller.interfaces";

export const VisibilityMap: IVisibilityMap = {
  hide: {
    "HOME-FILTERS": [Roles.PlatformAdmin],
  },
  show: {
    "AGENCY-NAME-FILTER": [Roles.MediaTeamAdmin],
  }
}
