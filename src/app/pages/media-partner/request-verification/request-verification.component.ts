import { Component, OnInit } from "@angular/core";
import { Utility } from "../../../utility";
import { STATUS_COLOR } from "../../../constants/statuses";
import { ToastService } from "../../../services/toast.service";
import { ITableColumnsMeta } from "../../../interfaces/shared/meta-table-items.interface";
import { IMediaPartnerData } from "src/app/services/media-partner/media-partner.interface";
import { InputService } from "src/app/services/input.service";
import { TableSortingService } from "src/app/services/table-sorting.service";
import { UrlQueryService } from "src/app/services/query/url-query.service";

@Component({
  selector: "adm-request-verification-page",
  templateUrl: 'request-verification.component.html',
  styleUrls: ['request-verification.component.scss'],
  providers: [UrlQueryService, InputService, TableSortingService],
})
export class RequestVerificationComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  public columns: ITableColumnsMeta[];
  public data: IMediaPartnerData[];
  public statusColor = STATUS_COLOR;

  constructor(
    protected inputService: InputService,
    protected tableSortingService: TableSortingService,

    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.getMediaPartner();
  }

  getMediaPartner() {
    this.inputService.statuses = [
      { key: '90', value: "90 Days Ago" },
      { key: '365', value: "365 Days Ago" },
      { key: '', value: "All" }
    ];

    // this.mediaPartnerService.apiGetList().subscribe((res: IMediaPartnerMeta) => {
    //   this.columns = res.columns;
    //   this.data = res.data;
    // })
  }

  download(field: string) {
    this.toast.show(`Event for downloading data from the field (${field})`, "info")
  }

  getExport() {
    this.toast.show(`File export event`, "info")
  }

  verification() {
    this.toast.show(`Event Request Verification`, "info")
  }

  setRequestVerification() {
    this.toast.show(`Event Request Verification`, "info")
  }

  setAllcheckbox() {
    this.toast.show(`Event selection of all checkboxes`, "info")
  }
}
