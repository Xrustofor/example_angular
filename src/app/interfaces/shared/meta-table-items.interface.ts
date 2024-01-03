import { IKeyValueString } from "../global/global.interfaces";
import { IMetaPagination } from "./meta-pagination.interfaces";

export interface ITableColumnsMeta {
    title: string,
    field: string,
    width: number
    sort?: number,
    checkbox?: boolean,
}

export interface ITableItemsMeta {
    meta: IMetaPagination,
    columns: ITableColumnsMeta[],
    statuses: IKeyValueString[],
}
