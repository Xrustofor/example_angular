import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getQueryParams } from "../query/query.service";
import { IPropertyAny } from "../../interfaces/global/global.interfaces";
import { IRfpMeta, IViewRfp } from "./rfp.interface";

@Injectable({ providedIn: 'root' })
export class RfpService {
  constructor(public http: HttpClient) { }

  apiGetList(payload: IPropertyAny | null): Observable<IRfpMeta> {
    return this.http.get<IRfpMeta>(`/rfps`, getQueryParams(payload))
  }

  apiGetInfo(): Observable<IViewRfp> {
    return this.http.get<{ data: IViewRfp }>('/rfp')
      .pipe(map(response => response.data));
  }

  apiGetById(id: string): Observable<IViewRfp> {
    return this.http.get<IViewRfp>(`/rfp/${id}/list`);
  }
}
