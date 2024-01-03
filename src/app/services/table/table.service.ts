import { Injectable } from "@angular/core";
import { IProperty, IPropertyAny } from "src/app/interfaces/global/global.interfaces";
import { ITableColumnsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { ISorted } from "../query/query.service";
import { PREFIX_SORT } from "src/app/constants/sorting";

@Injectable({ providedIn: 'root' })
export class TableService {

  public createSortKey(field: string = '', prefix: string = ''): string {
    const str = field.trim();
    return prefix + str[0].toUpperCase() + str.slice(1)
  }

  public getSortCol(item: IProperty<ISorted>, key: string): IProperty<ISorted> {
    if (!item[key]) {
      item[key] = { sort: 1, key: this.createSortKey(key, PREFIX_SORT) }
      return item;
    }

    if (item[key].sort === 1) {
      item[key].sort = -1;
      return item;
    }

    if (item[key].sort === -1) {
      delete item[key];
    }
    return item;
  }

  public setSortColumns(items: ITableColumnsMeta[], query: IPropertyAny) {
    items.map(item => {
      if (item.field) {
        const key = this.createSortKey(item.field, PREFIX_SORT);
        if (query[key]) { item.sort = +query[key] }
      }
    })
    return items
  }
}
