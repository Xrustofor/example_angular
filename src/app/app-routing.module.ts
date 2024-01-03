import {NgModule } from '@angular/core';
import {
  PreloadAllModules, Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy
} from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import {Title} from "@angular/platform-browser";
import {CanMatchTeamSection, UserToken, Permissions} from "./guards/CanMatchTeamSection.guard";

const routes: Routes = [
  {
    path: 'auth',
    title: 'Login',
    loadChildren: () => import('./layouts/auth/auth-layout.module')
      .then(m => m.AuthLayoutModule)
  },
  {
    path: 'error',
    title: 'Error',
    component: ErrorPageComponent
  },
  {
    path: '',
    loadChildren: () => import('./layouts/main/main-layout.module').then( m => m.MainLayoutModule)
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  providers: [CanMatchTeamSection, UserToken, Permissions],
  exports: [RouterModule]
})
export class AppRoutingModule  extends TitleStrategy  {
  constructor(private readonly title: Title) {
    super();
  }
  updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(title);
    }
  }
}


