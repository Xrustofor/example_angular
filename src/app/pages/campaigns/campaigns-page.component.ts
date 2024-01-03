import { Component, OnInit } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { Router } from '@angular/router';
import { Utility } from "src/app/utility";
import { QueryService } from "src/app/services/query/query.service";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { CampaignService } from "src/app/services/campaign/campaign.service";
import { IDataCampaign, IresDeleteCampaign } from "src/app/services/campaign/campaign.interface";
import { UrlQueryService } from "src/app/services/query/url-query.service";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { InputService } from "src/app/services/input.service";

@Component({
  selector: "adm-page-campaign",
  templateUrl: 'campaigns-page.component.html',
  styleUrls: ['campaigns-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class CampaignsPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IDataCampaign[];
  public meta: IMetaPagination | null = null;
  public showDialog = false;
  public selectedCampaign: IDataCampaign | null = null;
  public columns: ITableColumnsMeta[] = []
  public loading = false;

  constructor(
    protected urlQueryService: UrlQueryService,
    protected tableSortingService: TableSortingService,
    protected inputService: InputService,
    protected campaignService: CampaignService,
    protected toast: ToastService,
    private router: Router,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadCampaigns(),
      this.inputService.uploadAgencies(),
      this.inputService.uploadClients(),
      this.inputService.uploadYears(),
    ]).then(() => this.getCampaignList());
  }

  async getCampaignList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {
      this.campaignService.apiGetList(query).subscribe({
        next: (response) => {
          this.items = response.data;
          this.meta = response.meta as IMetaPagination;
          this.columns = this.queryService.setSortColumns(response.columns, query);
          this.inputService.searchLoading = false;
          this.inputService.statuses = [{ key: '', value: 'All' }, ...response.statuses];
          this.inputService.savingFieldsFromUrl(query);
        },
        error: () => {
          this.loading = false;
          this.inputService.searchLoading = false;
        },
        complete: () => {
          this.loading = false;
          this.inputService.searchLoading = false;
        }
      });
    });
  }

  actionDelete(id: string) {
    this.showDialog = true;
    const candidate = this.items.find(item => item.id === id);
    if (!candidate) { return }
    this.selectedCampaign = candidate;
  }

  resetSelectedData() {
    this.showDialog = false;
    this.selectedCampaign = null;
  }

  deleteItem() {
    if (!this.selectedCampaign) { return }
    const { id } = this.selectedCampaign;

    this.campaignService.apiDeleteCampaign(id).subscribe((res: IresDeleteCampaign) => {
      this.items = this.items.filter(item => item.id !== id);
      this.resetSelectedData();
      this.toast.show(res.message, 'info');
    })
  }

  review(id: string) {
    const url = this.router.url.split("?")[0];
    const candidate: any | undefined = this.items.find(item => item.id === id);
    if (!candidate) { return }
    this.router.navigate([`${url}/view/${id}`])
  }
}
