export interface ICampaignItem {
  label: string,
  require: boolean,
  value: string,
  key: string,
}

export interface ICampaign {
  actualized: ICampaignItem,
  assign: ICampaignItem,
  budget: ICampaignItem,
  code: ICampaignItem,
  created_by: ICampaignItem,
  end_date: ICampaignItem,
  name: ICampaignItem,
  purchased: ICampaignItem,
  start_date: ICampaignItem,
  status: ICampaignItem,
  uuid: string,
  year: ICampaignItem,
}
export interface IresCampaign {
  agency: ICampaignItem,
  client: ICampaignItem,
  campaign: ICampaign
}

