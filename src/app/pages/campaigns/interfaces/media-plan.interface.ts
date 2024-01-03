import { ITableItemsMeta } from "src/app/interfaces/shared/meta-table-items.interface";

export interface IMediaPlanRes extends ITableItemsMeta {
  data: IMediaPlanData[],
}

export interface IMediaPlanDataStatus {
  title: string,
  color: string,
}

export interface IMediaPlanData {
  actualized_amount: string | null
  audience_segment: string,
  budget: string
  id: string,
  media_channel: string,
  media_plan_id: string | null,
  purchased_amount: string | null,
  status: IMediaPlanDataStatus,
  mask?: string[],
}
