import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  constructor() { }

  setLoading(payload: boolean): void {
    this._loading.next(payload)
  }
}
