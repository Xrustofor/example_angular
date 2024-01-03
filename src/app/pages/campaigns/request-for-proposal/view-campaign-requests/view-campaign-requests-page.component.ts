import { Component, OnInit } from "@angular/core";
import { Utility } from "src/app/utility";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { MASK_PHONE } from "src/app/constants/masks";
import { IViewRfp } from "src/app/services/request-for-proposal/rfp.interface";
import { RfpService } from "src/app/services/request-for-proposal/rfp.service";
import { STATUS_COLOR } from "src/app/constants/statuses";

@Component({
  selector: "view-campaign-requests-page",
  templateUrl: 'view-campaign-requests-page.component.html',
  styleUrls: ['view-campaign-requests-page.component.scss'],
})
export class ViewCampaignRequestsPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  model: IViewRfp | null;

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private rfpService: RfpService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getClientById();
  }

  getClientById() {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.rfpService.apiGetById(id).subscribe(response => {
      this.model = response;
      this.breadcrumbService.setPageTitle(`${this.model.campaign} RFP List`, 'eye');
    });
  }
}
