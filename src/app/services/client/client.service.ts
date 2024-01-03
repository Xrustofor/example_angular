import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getQueryParams } from "../query/query.service";
import { IKeyValueString, IPropertyAny, IPropertyString } from "../../interfaces/global/global.interfaces";
import { IClientCreateUpdateModel, IClientsMeta, IViewClient } from "./client.interface";

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(public http: HttpClient) { }
 
  apiGetList(payload: IPropertyAny | null): Observable<IClientsMeta> {
    return this.http.get<IClientsMeta>(`/clients`, getQueryParams(payload))
  }

  apiGetById(id: string): Observable<IViewClient> {
    return this.http.get<{ data: IViewClient }>(`/client/${id}`)
      .pipe(map(response => response.data));
  }

  apiCreateOrUpdate(model: IClientCreateUpdateModel): Observable<any> {
    return this.http.post(`/client`, model)
  }

  apiGetAutocomplete(name: string | null): Observable<IKeyValueString[]> {
    let data: IPropertyAny | null = {};
    if (name) {
      data['name'] = name;
    }

    return this.http.get<IKeyValueString[]>('/list/client', getQueryParams(data))
  }
}
