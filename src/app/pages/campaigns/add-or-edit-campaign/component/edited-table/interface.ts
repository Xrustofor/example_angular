import { IKeyValueData, IKeyValueString } from "../../../../../interfaces/global/global.interfaces";

export class IMediaPlanId {
  audience_segment_code: number;
  campaign_code: string;
  client_code: string;
  media_channel_code: string;
  year: string;
}

export interface IMediaPlan {
  actualized_amount: number | null,
  audience_segment: IKeyValueData<string, number, string> | null,
  budget: number | null,
  media_channel: IKeyValueData<string, number, string> | null,
  purchased_amount: number | null,
  status: IKeyValueString | null,
  uuid?: string | null,
}


