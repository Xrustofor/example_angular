import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  IGeneralInformationModel,
  IPasswordConfirmationModel,
  IGeneralInformationUpdateModel,
} from "./manage-account.interface";

@Injectable({ providedIn: 'root' })
export class ManageAccountService {

  constructor(
    public http: HttpClient,
  ) { }

  apiGetInformation(): Observable<IGeneralInformationModel> {
    return this.http.get<IGeneralInformationModel>(`/account`);
  }

  apiSetNewPassword(data: IPasswordConfirmationModel): Observable<any> {
    return this.http.post(`/password-reset`, data);
  }

  apiUpdateInformation(data: IGeneralInformationUpdateModel): Observable<any> {
    return this.http.post(`/account`, data);
  }
}
