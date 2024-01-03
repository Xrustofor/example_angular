import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { IDataClient } from "src/app/services/client/client.interface";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { ClientService } from "src/app/services/client/client.service";
import { QueryService } from "src/app/services/query/query.service";
import { Utility } from "src/app/utility";
import { InputService } from "src/app/services/input.service";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { UrlQueryService } from "src/app/services/query/url-query.service";

@Component({
  selector: "adm-page-report",
  templateUrl: 'report-page.component.html',
  styleUrls: ['report-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class ReportPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IDataClient[];
  public meta: IMetaPagination | null = null;
  public columns: ITableColumnsMeta[] = []
  public loading = false;

  constructor(
    protected inputService: InputService,
    protected tableSortingService: TableSortingService,
    protected urlQueryService: UrlQueryService,
    protected clientService: ClientService,
    private router: Router,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadClients(),
    ]).then(() => this.getReportList());
  }

  async getReportList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {
      this.clientService.apiGetList(query).subscribe({
        next: (response) => {
          this.items = response.data;
          this.meta = response.meta as IMetaPagination;
          this.columns = this.queryService.setSortColumns(response.columns, query);
          // this.statuses = [{ key: '', value: 'All' }, ...response.statuses];
          this.inputService.statuses = [
            { key: '', value: 'All' },
            { key: 'created-by-me', value: 'Created by Me' },
            { key: 'shared-with-me', value: 'Shared with Me' },
          ];
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
