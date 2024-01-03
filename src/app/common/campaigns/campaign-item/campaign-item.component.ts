import { Component, Input } from "@angular/core";
import { iconsSVG } from "../../../../assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons";
import { IKeyValueString } from "src/app/interfaces/global/global.interfaces";
import { Router } from "@angular/router";
import { ICampaign, ICampaignItem } from "src/app/services/campaign/campaign.interface";

@Component({
  selector: 'adm-campaign-item',
  templateUrl: 'campaign-item.component.html',
  styleUrls: ['campaign-item.component.scss']
})
export class CampaignItemComponent {
  sortedItems: ICampaignItem[] = [];
  public arrowIcon = iconsSVG['arrowRight'] as SVGIcon;

  @Input() item: ICampaign | null = null;
  @Input() campaignsType: IKeyValueString;
  @Input() isFatStyle: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnChanges() {
    if (this.item && this.item.items.length) {
      this.sortedItems = this.item.items.slice().sort((a, b) => (a.exist === b.exist ? 0 : a.exist ? -1 : 1));
    } else {
      this.sortedItems = [];
    }
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
