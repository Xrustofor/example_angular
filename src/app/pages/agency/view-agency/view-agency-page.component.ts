import { Component, OnInit } from "@angular/core";
import { AgencyService } from "src/app/services/agency/agency.service";
import { Utility } from "src/app/utility";
import { ActivatedRoute, Router } from "@angular/router";
import { IViewAgency } from "src/app/services/agency/agency.interface";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { MASK_PHONE } from "src/app/constants/masks";
import { IKeyValueString } from "src/app/interfaces/global/global.interfaces";
import { STATUS_COLOR } from "src/app/constants/statuses";

@Component({
  selector: "view-agency-page",
  templateUrl: 'view-agency-page.component.html',
  styleUrls: ['view-agency-page.component.scss'],
})
export class ViewAgencyPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  agency: IViewAgency | null;

  statuses: IKeyValueString[];
  mainAgencyRole: string;

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private agencyService: AgencyService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getRolesAndStatuses();
    this.getAgencyById();
  }

  getRolesAndStatuses() {
    this.agencyService.apiGetInfo().subscribe(response => {
      this.mainAgencyRole = response.main.role.value;

      this.statuses = response.main.statuses;
    });
  }

  getAgencyById() {
    const agencyId = this.route.snapshot.paramMap.get('id') as string;

    this.agencyService.apiGetById(agencyId).subscribe(response => {
      this.agency = response;
      this.breadcrumbService.setPageTitle(this.agency.general.name, 'eye');
    });
  }
}
