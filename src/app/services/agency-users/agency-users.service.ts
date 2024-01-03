import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IApiAgencyUsersMeta, IApiAgencyUsersMetaID } from "./agency-users.interface";
import { IKeyValueString, IPropertyAny } from "../../interfaces/global/global.interfaces";
import { QueryService } from "../query/query.service";

@Injectable({ providedIn: 'root' })
export class AgencyUsersService {
  constructor(
    public http: HttpClient,
    public query: QueryService
  ) { }

  apiGetAgencyUser(payload: string = ''): Observable<IApiAgencyUsersMetaID> {
    return this.http.get<IApiAgencyUsersMetaID>(`/agency-user/${payload}`);
  }

  apiPostAgencyUser(payload: any): Observable<any> {
    return this.http.post(`/agency-user`, payload);
  }

  apiGetAgencyUserList(query: IPropertyAny | null): Observable<IKeyValueString[] | []> {
    return this.http.get<IKeyValueString[]>('/agency-users/users', this.query.createQueryParamsForHttp(query));
  }

  apiGetAgencyUsers(query: IPropertyAny | null): Observable<IApiAgencyUsersMeta> {
    return this.http.get<IApiAgencyUsersMeta>('/agency-users', this.query.createQueryParamsForHttp(query));
  }
}