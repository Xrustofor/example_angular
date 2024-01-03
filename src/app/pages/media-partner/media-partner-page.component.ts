import { Component, OnInit } from "@angular/core";
import { MediaPartnerService } from "../../services/media-partner/media-partner.service";
import { STATUS_COLOR } from "../../constants/statuses";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { IMediaPartnerData } from "src/app/services/media-partner/media-partner.interface";
import { QueryService } from "src/app/services/query/query.service";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { InputService } from "src/app/services/input.service";
import { UrlQueryService } from "src/app/services/query/url-query.service";
import { Utility } from "src/app/utility";

@Component({
  selector: "adm-page-media-partner",
  templateUrl: 'media-partner-page.component.html',
  styleUrls: ['media-partner-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class MediaPartnerPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IMediaPartnerData[];
  public meta: IMetaPagination | null = null;
  public columns: ITableColumnsMeta[];
  public loading = false;

  constructor(
    protected inputService: InputService,
    protected tableSortingService: TableSortingService,
    protected urlQueryService: UrlQueryService,
    private mediaPartnerService: MediaPartnerService,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadMediaPartners(),
    ]).then(() => this.getMediaPartnerList());
  }

  async getMediaPartnerList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {

      this.mediaPartnerService.apiGetList(query).subscribe({
        next: (response) => {
          this.items = response.data;
          this.meta = response.meta;
          this.columns = this.queryService.setSortColumns(response.columns, query);
          this.inputService.statuses = [{ key: 'All', value: '' }, ...response.statuses];
          this.inputService.savingFieldsFromUrl(query);
        },
        error: () => { },
        complete: () => this.loading = false
      });
    });
  }

  download(field: string) { }
  getExport() { }
  verification() { }
}
