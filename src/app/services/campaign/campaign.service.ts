import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { QueryService } from "../query/query.service";
import { getQueryParams } from "../query/query.service";
import { IKeyValueString, IPropertyAny, IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { ICampaignsMeta } from "./campaign.interface";

@Injectable({ providedIn: 'root' })
export class CampaignService {
  constructor(
    public http: HttpClient,
    public query: QueryService,
  ) { }

  apiGetList(payload: IPropertyAny | null): Observable<ICampaignsMeta> {
    return this.http.get<ICampaignsMeta>('/campaigns', getQueryParams(payload))
  }

  apiGetCampaign(id: string): Observable<any> {
    return this.http.get(`/campaigns/${id}/view`)
  }

  apiGetMediaPlan(id: string, query: IPropertyAny | null): Observable<any> {
    return this.http.get(`/media-plan/${id}`, this.query.createQueryParamsForHttp(query))
  }

  apiGetCampaignAddOrEdit(uuid: null | string): Observable<any> {
    return uuid
      ? this.http.get(`/campaigns/${uuid || ''}/edit`)
      : this.http.get(`/campaigns/add`)
  }

  apiGetCampaignYears(): Observable<IPropertyString[]> {
    return this.http.get<IPropertyString[]>('/campaign/years/list')
  }

  apiGetAutocomplete(name: string | null): Observable<IKeyValueString[]> {
    let data: IPropertyAny | null = {};
    if (name) {
      data['name'] = name;
    }

    return this.http.get<IKeyValueString[]>('/campaign/name/list', getQueryParams(data))
  }

  apiCreateCampaign(payload: any): Observable<any> {
    return this.http.post(`/campaigns/add`, payload)
  }

  apiDeleteCampaign(id: string | number): Observable<any> {
    return this.http.delete(`/campaigns/${id}`)
  }
}
