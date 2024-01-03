import { Component, Input } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { IDrawerItems } from "../../../interfaces/main/drawer-items.interface";

@Component({
  selector: 'adm-drawer-sub-menu',
  templateUrl: 'sub-menu.container.html',
  styleUrls: ['sub-menu.container.scss'],
  animations: [
    trigger('box', [
      state('start', style({ height: '0px' })),
      state('special', style({ height: 'auto' })),
      transition('start <=> end', animate(200)),
    ])
  ]
})
export class SubMenuComponent {
  @Input() items: IDrawerItems[] | undefined = [{
    text: '',
    icon: '',
    id: 0,
    selected: true,
    url: ''
  }];
  @Input() show: string | undefined = 'start';
  protected expand = true;
  protected maxWidthDrawer = '250px';
  protected boxSubMenu = this.show ? 'end' : 'start'
}
