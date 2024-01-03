import { Component, OnInit } from "@angular/core";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { Router } from '@angular/router';
import { Utility } from "src/app/utility";
import { QueryService } from "src/app/services/query/query.service";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IDataAgency } from "src/app/services/agency/agency.interface";
import { MASK_PHONE } from "../../constants/masks";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { UrlQueryService } from "src/app/services/query/url-query.service";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { InputService } from "src/app/services/input.service";
import { AgencyService } from "src/app/services/agency/agency.service";

@Component({
  selector: "adm-page-agency",
  templateUrl: 'agency-page.component.html',
  styleUrls: ['agency-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class AgencyPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IDataAgency[];
  public meta: IMetaPagination | null = null;
  public loading = false;

  public columns: ITableColumnsMeta[] = []

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    protected inputService: InputService,
    protected tableSortingService: TableSortingService,
    protected urlQueryService: UrlQueryService,
    private agencyService: AgencyService,
    private router: Router,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadAgencies(),
    ]).then(() => this.getAgencyList());
  }

  async getAgencyList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {

      this.agencyService.apiGetList(query).subscribe({
        next: (response) => {
          this.items = response.data;
          this.meta = response.meta as IMetaPagination;
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
    const candidate: any | undefined = this.items.find(item => item.id === id);
    if (!candidate) { return }
    this.router.navigate([`${url}/view/${id}`])
  }
}
