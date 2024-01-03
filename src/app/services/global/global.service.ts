import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GlobalService {

  constructor(
    public http: HttpClient,
  ) { }


  apiGetMediaChannelList(): Observable<any> {
    return this.http.get('/media-channel/list')
  }
  apiGetStatusList(): Observable<any> {
    return this.http.get('/campaign/statuses/list')
  }
  apiGetTargetAudience(): Observable<any> {
    return this.http.get('/list/countries')
  }
  apiGetAgencyList(): Observable<any> {
    return this.http.get('/not-bind/agency/list')
  }
  apiGetClientList(): Observable<any> {
    return this.http.get('/not-bind/client/list')
  }
  apiGetMediaSpecialist(): Observable<any> {
    return this.http.get('/employees/media_specialist')
  }
  apiGetUsersAllList(): Observable<any> {
    return this.http.get('/users/all')
  }
  apiGetContactPositionsList(): Observable<any> {
    return this.http.get('/contact-positions/list')
  }
  apiGetRolesList(): Observable<any> {
    return this.http.get('/other-contacts/roles')
  }
}
