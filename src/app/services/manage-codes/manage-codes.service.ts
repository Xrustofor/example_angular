import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IManageCodes } from "./manage-codes.interface";

@Injectable({ providedIn: 'root' })
export class ManageCodesService {
  constructor(private http: HttpClient) { }

  apiGetManageCodes(): Observable<any> {
    return this.http.get('/setup')
  }

  apiPostManageCodes(payload: IManageCodes): Observable<any> {
    return this.http.post('/setup', payload)
  }

  apiDeleteManageCodes(payload: { type: string, id: string }): Observable<any> {
    const { type, id } = payload;
    return this.http.delete(`/setup/${type}/${id}`)
  }
}
