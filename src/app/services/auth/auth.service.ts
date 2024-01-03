import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthorization, ILogin, IUser } from "./models/authorization.interface";
import { LocalStorageService } from "../local-storage.service";
import { ToastService } from "../toast.service";
import { IConfirmPassword } from "../../interfaces/auth/reset-password.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _loggedUser = new ReplaySubject<ILogin | null>();
  readonly loggedUser$ = this._loggedUser.asObservable();

  constructor(
    private http: HttpClient,
    private store: LocalStorageService,
    private toast: ToastService,
  ) { }

  login(user: IUser): Observable<boolean> | Observable<any> {
    const formData = new FormData()
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<any>(`/login`, formData).pipe(
      tap((res: ILogin) => this.doLoginUser(res)),
      map(() => true),
      catchError(error => {
        this.toast.show(error.message, 'error')
        return of(false);
      })
    );
  }

  logOut() {
    this._loggedUser.next(null);
  }

  loginAsSpectator(user: IUser): Observable<boolean> | Observable<any> {
    const formData = new FormData()
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<any>(`/login`, formData).pipe(
      catchError(error => {
        this.toast.show(error.message, 'error')
        return of(false);
      })
    );
  }

  apiRefreshToken(): Observable<any> {
    return this.http.post<any>(`/refresh`, null).pipe(
      tap((res: { authorization: IAuthorization }) => {
        this.setRefreshAuthorization(res.authorization)
      }),
      map((res: { authorization: IAuthorization }) => res.authorization.token)
    );
  }

  apiSendEmail(form: FormData): Observable<any> {
    return this.http.post('/forgot-password', form)
  }

  apiResetPassword(data: IConfirmPassword): Observable<any> {
    const { token, email, password, password_confirmation } = data;

    const form = new FormData()
    form.append('password', password);
    form.append('password_confirmation', password_confirmation)

    return this.http.post(`/password-reset/${token}`, form, {
      params: { email },
    })
  }

  getInfoPerson(): Observable<any> {
    return this.http.get('/info')
  }

  private doLoginUser(user: ILogin) {
    this.store.setAuthorization(user.authorization)
    this.store.setAppAuthorization(user.app)
    this.store.setUserAuthorization(user.user);

    this._loggedUser.next(user);
  }

  private setRefreshAuthorization(authorization: IAuthorization) {
    this.store.setAuthorization(authorization)
  }
}
