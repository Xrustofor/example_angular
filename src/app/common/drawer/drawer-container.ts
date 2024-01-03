import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Utility } from "../../utility";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { IDrawerItems } from "src/app/interfaces/main/drawer-items.interface";
import { iconsSVG } from "src/assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons/dist/svg-icon.interface";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'adm-drawer-container',
  templateUrl: 'drawer-container.html',
  styleUrls: ['drawer-container.scss'],
  animations: [
    trigger('box', [
      state('start', style({ height: '0px' })),
      state('special', style({ height: 'auto' })),
      transition('start <=> end', animate(300)),
    ])
  ]
})
export class DrawerContainer {
  protected expand = true;
  protected maxWidthDrawer = 250;
  protected minWidthDrawer = 72;
  protected getUrl = Utility.instance().getUrl;
  protected boxSubMenu = 'start'
  protected showSubMenu = false;

  @Input() items: IDrawerItems[] = [{
    text: '',
    icon: '',
    id: 0,
    selected: true,
    url: ''
  }];

  @Output() selected = new EventEmitter<number | null>();

  constructor(
    private localStorageService: LocalStorageService,
  ) {}

  get logoUrl(): string{
    const url = this.localStorageService.settings('agency_logo').get;
    return url ? url : ''
  }
  get agencyName(): string{
    return this.localStorageService.settings('name').get || '';
  }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }

  actionMenuShow() {
    this.expand = !this.expand;
    this.items = this.items.map((item: IDrawerItems) => {
      if (item.menuStatus === undefined) { return item }

      item.menuStatus.value = item.menuStatus.default && this.expand
      return item
    })
  }

  select(id: number) {
    this.selected.emit(id);
  }

  actionSubMenu(id: number) {
    this.items = this.items.map((item: IDrawerItems) => {
      if (item.id !== id) { return item }
      if (item.menuStatus === undefined) { return item }
      item.menuStatus.value = !item.menuStatus.value;
      item.menuStatus.default = !item.menuStatus.default
      return item
    })
  }
}
