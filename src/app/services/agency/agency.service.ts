import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAgenciesMeta, IAgencyCreateUpdateModel, IViewAgency } from "./agency.interface";
import { getQueryParams } from "../query/query.service";
import { IKeyValueString, IPropertyAny } from "../../interfaces/global/global.interfaces";

@Injectable({ providedIn: 'root' })
export class AgencyService {
  constructor(public http: HttpClient) { }

  apiGetList(payload: IPropertyAny | null): Observable<IAgenciesMeta> {
    return this.http.get<IAgenciesMeta>(`/agencies`, getQueryParams(payload))
  }

  apiGetInfo(): Observable<IViewAgency> {
    return this.http.get<{ data: IViewAgency }>('/agency')
      .pipe(map(response => response.data));
  }

  apiGetById(id: string): Observable<IViewAgency> {
    return this.http.get<{ data: IViewAgency }>(`/agency/${id}`)
      .pipe(map(response => response.data));
  }

  apiCreateOrUpdate(model: IAgencyCreateUpdateModel): Observable<any> {
    return this.http.post(`/agency`, model)
  }

  apiGetAutocomplete(name: string | null): Observable<IKeyValueString[]> {
    let data: IPropertyAny | null = {};
    if (name) {
      data['name'] = name;
    }

    return this.http.get<IKeyValueString[]>('/list/agency', getQueryParams(data))
  }
}
