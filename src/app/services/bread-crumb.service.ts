import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../interfaces/shared/breadcrumb.interface'

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs.asObservable();

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe(event => {

      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      this._breadcrumbs.next(breadcrumbs);
    });
  }

  setPageTitle(title: string, icon = '', url = '') {
    const customTitle = {
      label: title,
      url: url ? url : this.router.routerState.snapshot.url,
      icon: icon,
    };

    this._breadcrumbs.next([...this._breadcrumbs.value, customTitle]);
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      if (route.data['breadcrumb']) {
        const url = '/' + routeUrl.join('/');
        const candidate = breadcrumbs.find((el: Breadcrumb) => el.url === url);
        if (candidate !== undefined) { return }

        const breadcrumb = {
          label: this.getLabel(route.data),
          url,
          icon: route.data['icon'] ? route.data['icon'] : ''
        };

        breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumb(route.firstChild as ActivatedRouteSnapshot, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }
}