import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../services/bread-crumb.service";
import { Observable } from "rxjs";
import { Breadcrumb } from "src/app/interfaces/shared/breadcrumb.interface";
import { Utility } from "src/app/utility";
import { iconsSVG } from "src/assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons/dist/svg-icon.interface";

@Component({
  selector: 'adm-bread-crumbs',
  templateUrl: 'bread-crumbs.component.html',
  styleUrls: ['bread-crumbs.component.scss'],
})
export class BreadCrumbsComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;
  protected getUrl = Utility.instance().getUrl;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }
}