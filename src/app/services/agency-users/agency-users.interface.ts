import { ITableItemsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IKeyValue, IKeyValueData, IKeyValueString } from "../../interfaces/global/global.interfaces";

export interface IAgencyUserData {
  uuid: string,
  name: string,
  last_name: string,
  first_name: string,
  position: string,
  email: string,
  phone: string,
  role: null | string,
  assigned: null | string,
  status: IKeyValue<number, string>,
}

export interface IAgencyUsersLinks {
  first: string,
  last: string
  next: null | number,
  prev: null | number,
}

export interface IApiAgencyUsersMeta extends ITableItemsMeta {
  data: IAgencyUserData[],
  links: IAgencyUsersLinks,
}

export interface IApiAgencyUsersMetaIDClients {
  list: IKeyValueData<string, string, number>[]
  assigned: IKeyValueData<string, string, number | null>[]
}

export interface IApiAgencyUsersMetaID {
  uuid: string,
  name: string,
  first_name: string,
  last_name: string,
  position: string,
  email: string,
  phone: string,
  role: IKeyValueData<string, string, IKeyValueString[]>,
  status: IKeyValueData<string, string, IKeyValueString[]>,
  clients: IApiAgencyUsersMetaIDClients
}
