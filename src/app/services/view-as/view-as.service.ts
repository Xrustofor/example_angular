import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ViewAsService {

  constructor(public http: HttpClient) { }

  apiGetCompanyTypes(): Observable<any> {
    return this.http.get('/company-types')
  }

  apiGetCompanyByType(type: string): Observable<any> {
    return this.http.get('/list/companies/' + type)
  }

  apiGetUsersByCompany(company: string, companyType: string): Observable<any> {
    return this.http.get(`/list/assigned-employees/${company}/${companyType}`);
  }

  apiSpectrate(user: string): Observable<any> {
    return this.http.post(`/view-as/demonstrate`, { user });
  }

  apiExitFromSpectatorMode(): Observable<any> {
    return this.http.delete(`/view-as/exit`);
  }
}