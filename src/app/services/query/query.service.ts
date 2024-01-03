import { Injectable } from "@angular/core";
import { ITableColumnsMeta } from "../../interfaces/shared/meta-table-items.interface";
import { IProperty, IPropertyAny } from "../../interfaces/global/global.interfaces";
import { PREFIX_SORT } from "src/app/constants/sorting";

export interface ISorted {
  key: string,
  sort: number
}

export const getQueryParams = (payload: IPropertyAny | null) => {
  let params;
  if (payload) { params = { ...payload } }
  return { params }
}

@Injectable({ providedIn: 'root' })
export class QueryService {
  createQueryParamsForHttp(payload: IPropertyAny | null): { params: IPropertyAny | undefined } {
    let params;
    if (payload) { params = { ...payload } }
    return { params }
  }

  setSortColumns(items: ITableColumnsMeta[], guery: IPropertyAny) {
    items.map(item => {
      if (item.field) {
        const key = this.createSortKey(item.field);
        if (guery[key]) { item.sort = +guery[key] }
      }
    })

    return items;
  }

  createSortKey(field: string = ''): string {
    const str = field.trim();
    return PREFIX_SORT + str[0].toUpperCase() + str.slice(1)
  }

  getSortItems(item: IProperty<ISorted>, key: string): IProperty<ISorted> {
    if (!item[key]) {
      item[key] = { sort: 1, key: this.createSortKey(key) }
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
}
