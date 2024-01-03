import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { STATUS_COLOR } from 'src/app/constants/statuses';
import { IKeyValue } from 'src/app/interfaces/global/global.interfaces';

@Component({
  selector: 'adm-tabs-slider',
  templateUrl: './tabs-slider.component.html',
  styleUrls: ['./tabs-slider.component.scss'],
})
export class TabsSliderComponent {
  @ViewChild('tabsContainer') tabsContainerRef: ElementRef;

  protected currentTabIndex = 0;
  protected indicatorPosition = 0;
  protected indicatorWidth = 0;
  protected statusColor = STATUS_COLOR;

  private _items: IKeyValue<string, any>[];
  get items() { return this._items }
  @Input() set items(value: IKeyValue<string, any>[]) {
    if (!value) return;
    this._items = value;
    this.updateCurrentTabIndex(this.currentTabIndex);
  }

  @Input() set activeTabIndex(value: number) {
    if (!value) return;
    this.updateCurrentTabIndex(value);
  }

  @Input() reverseKeyValue = false;

  @Output() onSelect = new EventEmitter<any>();

  private canSelect = true;
  selectTab(index: number) {
    if (!this.canSelect) return;
    this.canSelect = false;
    setTimeout(() => this.canSelect = true, 500);

    this.currentTabIndex = index;

    this.onSelect.emit({
      index: index,
      value: this.reverseKeyValue ? this.items[index].key : this.items[index].value
    });

    setTimeout(() => this.updateIndicatorPosition(), 10);
  }

  // getItemStyle(item: IKeyValue<string, any>, index: number) {
  //   if (this.reverseKeyValue && !item.key ||
  //     !this.reverseKeyValue && !item.value
  //   ) return {}

  //   const style = this.reverseKeyValue ? this.statusColor[item.key] : this.statusColor[item.value];
  //   if (!style) return {};

  //   if (this.currentTabIndex === index) {
  //     return { color: style.color }
  //   }

  //   return {}
  // }

  // getIndicatorStyle(item: IKeyValue<string, any>) {
  //   if (this.reverseKeyValue && !item.key || !this.reverseKeyValue && !item.value) return {}

  //   const style = this.reverseKeyValue ? this.statusColor[item.key] : this.statusColor[item.value];
  //   if (!style) return {};

  //   return { backgroundColor: style.color }
  // }

  private updateCurrentTabIndex(index: number) {
    this.currentTabIndex = index;
    setTimeout(() => this.updateIndicatorPosition(), 10);
  }

  private updateIndicatorPosition() {
    const tabsContainerElement = this.tabsContainerRef.nativeElement as HTMLElement;
    const tabElements = tabsContainerElement.querySelectorAll('.tab') as NodeListOf<HTMLElement>;
    if (!tabElements.length) return;

    const activeTabElement = tabElements[this.currentTabIndex];
    if (tabsContainerElement && activeTabElement) {
      const tabsContainerRect = tabsContainerElement.getBoundingClientRect();
      const activeTabRect = activeTabElement.getBoundingClientRect();
      const indicatorPositionOffset = activeTabRect.left - tabsContainerRect.left;
      this.indicatorPosition = tabsContainerElement.scrollLeft + indicatorPositionOffset;
      this.indicatorWidth = activeTabRect.width;
    }
  }
}
