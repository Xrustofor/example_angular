import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Utility } from "../../utility";
import { IMetaPagination } from 'src/app/interfaces/shared/meta-pagination.interfaces';
import { IPagination } from 'src/app/interfaces/shared/pagination.interface';

@Component({
  selector: 'adm-pagination',
  styleUrls: ['pagination.component.scss'],
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() item: IMetaPagination | null = null;
  @Input() buttonCount: number = 5;
  @Input() loading = false;
  @Output() onChange = new EventEmitter<IPagination>;
  protected getIcon = Utility.instance().getIcon;

  public pageSize = 1;
  public skip = 1;
  public total = 1;

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.item !== null) {
      const { total, per_page, from } = this.item;
      this.total = total;
      this.pageSize = per_page;
      this.skip = from;
    }

  }
  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.onChange.emit({ size: e.take, page: (e.skip / e.take + 1) })
  }
  sendPre() {
    if (this.item) {
      this.onChange.emit({ size: this.pageSize, page: --this.item.current_page })
    }

  }
  sendNext() {
    if (this.item) {
      this.onChange.emit({ size: this.pageSize, page: ++this.item.current_page })
    }
  }
}
