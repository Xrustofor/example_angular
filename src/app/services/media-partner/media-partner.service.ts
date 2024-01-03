import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IKeyValueString, IPropertyAny } from "src/app/interfaces/global/global.interfaces";
import { getQueryParams } from "../query/query.service";
import { IMediaPartnerMeta } from "./media-partner.interface";

@Injectable({ providedIn: 'root' })
export class MediaPartnerService {
  constructor(
    public http: HttpClient,
  ) { }

  apiGetList(payload: IPropertyAny | null): Observable<IMediaPartnerMeta> {
    return this.http.get<IMediaPartnerMeta>(`/media-partners`, getQueryParams(payload))
  }

  apiGetAutocomplete(name: string | null): Observable<IKeyValueString[]> {
    let data: IPropertyAny | null = {};
    if (name) {
      data['name'] = name;
    }

    return this.http.get<IKeyValueString[]>('/list/media_partner', getQueryParams(data))
  }
}
