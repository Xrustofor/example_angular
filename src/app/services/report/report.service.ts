import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getQueryParams } from "../query/query.service";
import { IKeyValueString, IPropertyAny } from "../../interfaces/global/global.interfaces";
import { IReportCreateModel } from "./report.interface";

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(public http: HttpClient) { }

  apiCreate(model: IReportCreateModel): Observable<any> {
    return this.http.post(`/report`, model)
  }

  apiGetAutocomplete(name: string | null): Observable<IKeyValueString[]> {
    let data: IPropertyAny | null = {};
    if (name) {
      data['name'] = name;
    }

    return this.http.get<IKeyValueString[]>('/list/report', getQueryParams(data))
  }
}
