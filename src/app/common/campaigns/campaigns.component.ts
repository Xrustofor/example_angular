import { Component, Input, OnInit } from "@angular/core";
import { IMetaPagination } from "src/app/interfaces/shared/meta-pagination.interfaces";
import { SVGIcon } from "@progress/kendo-svg-icons";
import { iconsSVG } from "src/assets/icons/svg-icons";
import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { VisibilityMap } from "./campaigns.visibility-map";
import { IKeyValueString } from "src/app/interfaces/global/global.interfaces";
import { ICampaign } from "src/app/services/campaign/campaign.interface";

@Component({
  selector: 'adm-campaigns',
  styleUrls: ['campaigns.component.scss'],
  templateUrl: 'campaigns.component.html',
})
export class CampaignsComponent implements OnInit {
  public visibilityMap: IVisibilityMap = VisibilityMap;

  @Input() items: ICampaign[] | null = null;
  @Input() meta: IMetaPagination | null = null;

  public compaignTypes: IKeyValueString[] = [
    { key: 'Recent', value: 'recent' },
    { key: 'Assigned', value: 'assigned' },
  ]
  public campaignTypeValue: IKeyValueString = this.compaignTypes[0];

  get plusIcon(): SVGIcon | undefined { return this.getIcon('plus') }

  ngOnInit() { }

  getIcon(name: string) {
    if (!name) { return }
    const candidate: string | undefined = Object.keys(iconsSVG).find(key => key === name);
    if (!candidate) { return }
    return iconsSVG[candidate] as SVGIcon;
  }

  onCampaignsTypeChanged(data: any) {
    this.campaignTypeValue = this.compaignTypes[data.index];
  }
}
