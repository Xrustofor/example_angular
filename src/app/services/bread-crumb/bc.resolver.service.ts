import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, NavigationExtras, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root'})
export class RouteResolverService implements Resolve<any> {

  constructor(
    private readonly http: HttpClient,
    protected router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> |  NavigationExtras | undefined {
    return this.router.getCurrentNavigation()?.extras;
  }
}
