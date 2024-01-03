import { Component, OnInit } from "@angular/core";
import { Utility } from "src/app/utility";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { MASK_PHONE } from "src/app/constants/masks";
import { IViewClient } from "src/app/services/client/client.interface";
import { ClientService } from "src/app/services/client/client.service";

@Component({
  selector: "view-client-page",
  templateUrl: 'view-client-page.component.html',
  styleUrls: ['view-client-page.component.scss'],
})
export class ViewClientPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;

  client: IViewClient | null;

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private clientService: ClientService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getClientById();
  }

  getClientById() {
    const clientId = this.route.snapshot.paramMap.get('id') as string;

    this.clientService.apiGetById(clientId).subscribe(response => {
      this.client = response;
      this.breadcrumbService.setPageTitle(this.client.client, 'eye');
    });
  }
}
