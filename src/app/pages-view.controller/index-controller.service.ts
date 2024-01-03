import { Injectable } from "@angular/core";
import { INavigation } from "./navigations/navigations.interfaces";
import { LocalStorageService } from "../services/local-storage.service";
import { ToastService } from "../services/toast.service";
import { IndexNavigationsService } from "./navigations/index-navigations.service";
import { ClassRulesService } from "./class/class.service";
import { LocalNamespaceService } from "./local-namespace/local-namespace.service";
import {IPageInfo} from "./pages-view.controller.interfaces";
import {pageRoleInfo} from "./page-info/page.info";

@Injectable({ providedIn: 'root' })
export class ControllerService {
  constructor(
    private store: LocalStorageService,
    private navigationsService: IndexNavigationsService,
    public toast: ToastService,
    public classService: ClassRulesService,
    public localNamespaceService: LocalNamespaceService,
  ) { }
  get navigation(): INavigation[] {
    const namespace = this.store.settings('namespace').get;
    return this.navigationsService.getNavigation(namespace);
  }
  getDefaultTabUrl() {
    const namespace = this.store.settings('namespace').get;
    return this.navigationsService.getDefaultTabUrl(namespace || '');
  }
  get localNamespace(): string {
    const namespace = this.store.settings('namespace').get;
    return this.localNamespaceService.getNameUrl(namespace);
  }
  get nameClass(): string {
    const namespace = this.store.settings('namespace').get;
    return this.classService.getNameClass(namespace)
  }

  public getPageInfo(pageName: string): IPageInfo | null {
    const namespace = this.localNamespace;
    return pageRoleInfo[namespace][pageName] || null;
  }

}
