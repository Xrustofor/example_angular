import { ITableItemsMeta } from "../../interfaces/shared/meta-table-items.interface";

export interface IMediaPartnerMeta extends ITableItemsMeta {
  data: IMediaPartnerData[]
}

export interface IMediaPartnerData {
  uuid: string,
  // need to be fill..
}
