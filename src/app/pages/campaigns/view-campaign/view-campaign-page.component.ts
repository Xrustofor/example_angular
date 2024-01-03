import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { IMediaPlanData, IMediaPlanRes } from "../interfaces/media-plan.interface";
import { IMetaPagination } from "../../../interfaces/shared/meta-pagination.interfaces";
import { Utility } from "../../../utility";
import { TableService } from "../../../services/table/table.service";
import { ToastService } from "../../../services/toast.service";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { MASK_CURRENCY } from "../../../constants/masks";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { CampaignService } from "src/app/services/campaign/campaign.service";
import { ICampaign, ICampaignItem, IresCampaign } from "../interfaces/campaign.interface";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { UrlQueryService } from "src/app/services/query/url-query.service";

@Component({
  selector: "adm-page-view-campaigns",
  templateUrl: 'view-campaign-page.component.html',
  styleUrls: ['view-campaign-page.component.scss'],
  providers: [UrlQueryService, TableSortingService],
})
export class ViewCampaignPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public IDCampaign: string = ''
  public agency: ICampaignItem | null = null;
  public campaign: ICampaign | null = null;
  public client: ICampaignItem | null = null;

  public columns: ITableColumnsMeta[] = [];
  public items: IMediaPlanData[] = [];
  public meta: IMetaPagination | null = null;
  public loading = false;

  get MASK_CURRENCY() { return MASK_CURRENCY; }

  constructor(
    protected tableSortingService: TableSortingService,
    protected urlQueryService: UrlQueryService,
    private titleService: Title,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private table: TableService,
    private toast: ToastService,
    private breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit() {
    this.IDCampaign = this.route.snapshot.paramMap.get('id') as string;

    this.getCampaignList();
    this.getMediaPlan();
  }

  getCampaignList() {
    this.loading = true;

    this.campaignService.apiGetCampaign(this.IDCampaign).subscribe({
      next: (res: { data: IresCampaign }) => {
        const { agency, campaign, client } = res.data;
        this.agency = agency;
        this.campaign = campaign;
        this.client = client;

        this.titleService.setTitle(`Campaign: ${campaign.name.value}`)
        this.breadcrumbService.setPageTitle(campaign.name.value, 'eye');
      },
      complete: () => this.loading = false
    })
  }

  getMediaPlan() {
    this.urlQueryService.getQueryUrl((query: IPropertyString) => {
      this.campaignService.apiGetMediaPlan(this.IDCampaign, query).subscribe({
        next: (res: IMediaPlanRes) => {
          this.columns = res.columns;
          this.items = res.data;
          this.meta = res.meta as IMetaPagination;
          this.columns = this.table.setSortColumns(this.columns, query);
        },
      })
    })
  }

  review(id: string) {
    const candidate: any | undefined = this.items.find(item => item.id === id);
    if (!candidate) return;
    this.toast.show(`Media Channel: ${candidate.media_channel}`, "success");
  }
}
