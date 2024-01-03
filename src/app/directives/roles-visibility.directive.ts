import { Directive, ElementRef, Input } from '@angular/core';
import { ControllerService } from "../pages-view.controller/index-controller.service";
import { Roles } from '../pages-view.controller/pages-view.controller.interfaces';
import { IProperty } from '../interfaces/global/global.interfaces';

/**
 * Directive for displaying or hiding an element based on the user's role.
 *
 * @example
 * ```html
 * <div roleVisibility="visibilityMap">
 *  <custom-component data-view-role="media-team-admin">This block will be visible or hided for media-team-admin role.</custom-component>
 * </div>
 * ```
 *
 * @param {IVisibilityMap} roleVisibility - The map with roles which the block will be displayed or hided.
 */
@Directive({
  selector: '[roleVisibility]',
})
export class VisibilityDirective {

  @Input() roleVisibility: IVisibilityMap;

  constructor(
    private elementRef: ElementRef,
    private controllerService: ControllerService,
  ) { }

  ngAfterViewInit() {
    this.init();
  }

  init() {
    const { hide, show } = this.roleVisibility;
    if (!hide && !show) { return }

    const localNamespace = this.controllerService.localNamespace as Roles;
    const classNAme = this.controllerService.nameClass;
    if (!this.roleVisibility) { return }
    const nodeList = this.elementRef.nativeElement.querySelectorAll('[data-view-role]')
    if (!nodeList) { return }
    nodeList.forEach((el: any) => {
      const roleName = el.getAttribute('data-view-role');
      if (!roleName) { return }
      if (
        this.roleVisibility.hide &&
        this.roleVisibility.hide[roleName] &&
        this.roleVisibility.hide[roleName].includes(localNamespace)
      ) {
        el.style.display = 'none'
        return
      }
      if (
        this.roleVisibility.show &&
        this.roleVisibility.show[roleName] &&
        !this.roleVisibility.show[roleName].includes(localNamespace)
      ) {
        el.style.display = 'none'
        return
      }
    })
  }
}

export interface IVisibilityMap {
  hide?: IProperty<Roles[]>
  show?: IProperty<Roles[]>
}