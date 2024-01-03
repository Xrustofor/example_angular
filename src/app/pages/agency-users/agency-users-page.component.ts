import { Component } from "@angular/core";
import { Utility } from "../../utility";
import { IMetaPagination } from "../../interfaces/shared/meta-pagination.interfaces";
import { IPropertyString } from "../../interfaces/global/global.interfaces";
import { QueryService } from "../../services/query/query.service";
import { MASK_PHONE } from "../../constants/masks";
import { AgencyUsersService } from "../../services/agency-users/agency-users.service";
import { IAgencyUserData, IApiAgencyUsersMeta } from "../../services/agency-users/agency-users.interface";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { STATUS_COLOR } from "src/app/constants/statuses";
import { UrlQueryService } from "src/app/services/query/url-query.service";
import { InputService } from "src/app/services/input.service";
import { TableSortingService } from "src/app/services/table-sorting.service";

@Component({
  selector: "adm-agency-user-page",
  templateUrl: 'agency-users-page.component.html',
  styleUrls: ['agency-users-page.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class AgencyUsersPageComponent {
  protected getIcon = Utility.instance().getIcon;
  protected statusColor = STATUS_COLOR;

  public items: IAgencyUserData[];
  public meta: IMetaPagination | null = null;
  public columns: ITableColumnsMeta[] = []
  public loading = false;

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    protected urlQueryService: UrlQueryService,
    protected tableSortingService: TableSortingService,
    protected inputService: InputService,
    protected agencyUsers: AgencyUsersService,
    private queryService: QueryService,
  ) { }

  ngOnInit() {
    Promise.all([
      this.inputService.uploadAgencyUsers(),
    ]).then(() => this.getAgencyUserList());
  }

  getAgencyUserList() {
    this.loading = true;

    this.urlQueryService.getQueryUrl((query: IPropertyString) => {
      this.agencyUsers.apiGetAgencyUsers(query).subscribe({
        next: (response: IApiAgencyUsersMeta) => {
          this.items = response.data;
          this.meta = response.meta;
          this.columns = this.queryService.setSortColumns(response.columns, query);
          this.inputService.statuses = [{ key: 'All', value: '' }, ...response.statuses];
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
      })
    })
  }
}
