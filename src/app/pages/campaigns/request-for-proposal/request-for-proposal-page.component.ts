import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { QueryService } from "src/app/services/query/query.service";
import { IDataRfp } from "src/app/services/request-for-proposal/rfp.interface";
import { RfpService } from "src/app/services/request-for-proposal/rfp.service";
import { Utility } from "src/app/utility";
import { VisibilityMap } from "./request-for-proposal.visibility-map";
import { UrlQueryService } from "src/app/services/query/url-query.service";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { InputService } from "src/app/services/input.service";

@Component({
  selector: "adm-request-for-proposal-page",
  templateUrl: 'request-for-proposal-page.component.html',
  styleUrls: ['request-for-proposal-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class RequestForProposalPage implements OnInit {
  public visibilityMap: IVisibilityMap = VisibilityMap;
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IDataRfp[];
  public metaPagination: IMetaPagination | null = null;
  public columns: ITableColumnsMeta[] = []
  public loading = false;

  constructor(
    public urlQueryService: UrlQueryService,
    public tableSortingService: TableSortingService,
    public inputService: InputService,

    private rfpService: RfpService,
    private router: Router,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadAgencies(),
      this.inputService.uploadClients(),
      this.inputService.uploadCampaigns(),
      this.inputService.uploadYears()
    ]).then(() => this.getProposalRequestList());
  }

  async getProposalRequestList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {
      this.rfpService.apiGetList(query).subscribe({
        next: (response) => {
          this.items = response.data;
          this.metaPagination = response.meta as IMetaPagination;
          this.columns = this.queryService.setSortColumns(response.columns, query);
          this.inputService.statuses = [{ key: '', value: 'All' }, ...response.statuses];
          this.inputService.savingFieldsFromUrl(query);
        },
        error: () => this.loading = false,
        complete: () => this.loading = false
      });
    });
  }

  review(id: string) {
    const url = this.router.url.split("?")[0];
    this.router.navigate([`${url}/view/${id}`])
  }
}
