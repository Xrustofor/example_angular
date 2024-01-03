import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { Roles } from "src/app/pages-view.controller/pages-view.controller.interfaces";

export const VisibilityMap: IVisibilityMap = {
    show: {
        "AGENCY-NAME-FILTER": [Roles.MediaTeamAdmin],
    }
}
