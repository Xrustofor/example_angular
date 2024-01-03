import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IParamsQuery } from "../interfaces/dashboard/IParamsQuery.interface";


@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(public http: HttpClient) { }

  apiGetMessages(payload: IParamsQuery): Observable<any> {
    return this.http.get('/messages', {
      params: { ...payload }
    })
  }

  apiGetOneMessage(id: string): Observable<any> {
    return this.http.get(`/messages/${id}`)
  }

  apiGetRecentCampaign(payload: IParamsQuery): Observable<any> {
    const { agency, client } = payload;

    return this.http.get('/dashboard/campaigns', {
      params: { agency: agency || '', client: client || '' }
    })
  }

  apiGetAssignedCampaigns(payload: IParamsQuery): Observable<any> {
    const { agency, client } = payload;
    return this.http.get('/dashboard/campaigns', {
      params: { agency: agency || '', client: client || '' }
    })
  }
}
