import { ITableItemsMeta } from "src/app/interfaces/shared/meta-table-items.interface";
import { IApiLabelRequireValue, IKeyValueString } from "../../interfaces/global/global.interfaces";
import { IMediaPlan } from "../../pages/campaigns/add-or-edit-campaign/component/edited-table/interface";

export interface ICampaign {
  id: number | string,
  name: string,
  updated_at: number,
  status: {
    title: string,
    color: string
  }
  items: ICampaignItem[],
}

export interface ICampaignItem {
  uuid: string,
  title: string,
  link: string,
  exist: boolean,
}

export interface ICampaignsMeta extends ITableItemsMeta {
  data: IDataCampaign[],
}

export interface IDataCampaign {
  actualized: number,
  agency_name: string,
  budget: number,
  campaign_code: string,
  campaign: string,
  client_name: string,
  end_date: string,
  id: string | number,
  purchased: number,
  start_date: string,
  year: string | number,
  status: IStatusCampaign,
}

export interface IStatusCampaign {
  color: string,
  title: string,
}

export interface IresDeleteCampaign {
  message: string,
  uuid: string,
}

export interface IAssign {
  list: IKeyValueString[],
  label: string,
  value: string | null,
  require: boolean,
  key: string
}

export interface ICreatedBy {
  label: string,
  value: string | null,
  require: boolean,
  key: string
}

export interface IStatus {
  label: string,
  value: string | null,
  require: boolean,
  key: string | null,
  list: IKeyValueString[]
}

export interface IYear {
  label: string,
  value: string | null,
  require: boolean,
  list: IKeyValueString[]
}

export interface IClient {
  label: string;
  value: string | null;
  require: boolean;
  list: IKeyValueString[];
  code: null | string;
  key: string;
}

export interface IApiCampaignAddCampaign {
  actualized_amount: IApiLabelRequireValue
  assign: IAssign,
  budget: IApiLabelRequireValue,
  code: IApiLabelRequireValue,
  created_by: ICreatedBy
  end_date: string,
  name: string,
  purchased_amount: IApiLabelRequireValue,
  start_date: string,
  status: IStatus
  uuid: string | null
  visibility: IApiLabelRequireValue,
  year: IYear
}

export interface IApiCampaignAddAgency {
  code: string | null,
  key: string | null,
  label: string,
  list: IKeyValueString[],
  require: boolean,
}

export interface ICodeKeyValue {
  code: string,
  key: string | number,
  value: string
}
export interface IApiAMediaPlan {
  audience_segments: ICodeKeyValue[],
  channels: ICodeKeyValue[],
  mask: string[],
  statuses: IKeyValueString[],
  plans?: IMediaPlan[]
}

export interface IApiCampaignAdd {
  agency: IApiCampaignAddAgency,
  campaign: IApiCampaignAddCampaign,
  client: IClient,
  media_plan: IApiAMediaPlan,
  mask_media_plan: string[]
}
