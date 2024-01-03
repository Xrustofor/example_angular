import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service"
import { IPagination } from "../../interfaces/shared/pagination.interface"
import { IapiOneMessage, IapiMessage, INotificationsItem } from "../../interfaces/main/notifications.interface";
import { IMetaPagination } from "../../interfaces/shared/meta-pagination.interfaces";
import { IParamsQuery } from "../../interfaces/dashboard/IParamsQuery.interface";
import { Router, ActivatedRoute } from "@angular/router";
import { IAutocomplete } from "src/app/interfaces/dashboard/IAutocomplete.interface";
import { VisibilityMap } from "./dashboard.visibility-map";
import { IVisibilityMap } from "src/app/directives/roles-visibility.directive";
import { AgencyService } from "src/app/services/agency/agency.service";
import { ClientService } from "src/app/services/client/client.service";
import { IKeyValueString } from "src/app/interfaces/global/global.interfaces";
import { ICampaign } from "src/app/services/campaign/campaign.interface";

@Component({
  selector: "adm-dashboard",
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  public visibilityMap: IVisibilityMap = VisibilityMap;

  public openedModal = false;
  public loading = false;
  public messages: INotificationsItem[] | null = null;

  protected defaultSettings: IParamsQuery = {
    page: 1,
    size: 10
  }

  public oneMessage: INotificationsItem | null = null;
  public metaPaginations: IMetaPagination | null = null;
  public recentCampaign: ICampaign[] | null = null;
  public recentCampaignMeta: IMetaPagination | null = null;
  public assignedCampaign: ICampaign[] | null = null;
  public assignedCampaignMeta: IMetaPagination | null = null;

  public inputAgency: IKeyValueString[];
  public inputAgencyName = '';
  public inputAgencyLoading = false;

  public inputClient: [];
  public inputClientName: IAutocomplete | null;

  constructor(
    public dashboardService: DashboardService,
    public agencyService: AgencyService,
    public clientService: ClientService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.findSendQueryUrl();
    this.getMessage(this.defaultSettings);
    this.getRecentCampaign(this.defaultSettings);
    this.getAssignedCampaigns(this.defaultSettings);
    this.getAutocompleteClient();
    this.getAgencyUrl((res: string) => this.inputAgencyName = res);
  }

  getMessage(data: IParamsQuery): void {
    this.loading = true
    this.dashboardService.apiGetMessages(data).subscribe(res => {
      this.loading = false;

      if (!res.data.length) return;
      this.messages = res.data.map((item: IapiMessage) => {
        const { content: text, uuid, subject: title, updated_at: date } = item;
        return { text, uuid: uuid, title, date, type: 'user' }
      })

      if (!res.meta) return;
      this.metaPaginations = (res.meta) as IMetaPagination;
    })
  }

  goNextMessages(data: IPagination) {
    const { size, page } = data;
    this.defaultSettings.size = size;
    this.defaultSettings.page = page;
    this.setQueryInUrl();
    this.messages = null;
    this.getMessage(data)
  }

  chooseMessage(id: string) {
    this.openedModal = true
    this.dashboardService.apiGetOneMessage(id).subscribe((res) => {
      const { id, content, created_at, type, sender: { fullName } } = res as IapiOneMessage;
      this.oneMessage = {
        title: fullName,
        date: created_at,
        text: content,
        type: type as "bell" | "message" | "user",
        uuid: id,
      };
    })
  }
  getRecentCampaign(data: IParamsQuery) {
    this.recentCampaign = null;

    this.dashboardService.apiGetRecentCampaign(data).subscribe(res => {
      const { data, meta } = res;
      this.recentCampaignMeta = meta as IMetaPagination;
      this.recentCampaign = data as ICampaign[];
    })
  }
  getAssignedCampaigns(data: IParamsQuery) {
    this.assignedCampaign = null;

    this.dashboardService.apiGetAssignedCampaigns(data).subscribe(res => {
      const { data, meta } = res;
      this.assignedCampaignMeta = meta as IMetaPagination;
      this.assignedCampaign = data as ICampaign[];
    })
  }
  closeModal() {
    this.openedModal = false
    this.oneMessage = null;
  }

  getAutocompleteAgency(data: string) {
    this.inputAgencyLoading = true;
    this.agencyService.apiGetAutocomplete(data).subscribe({
      next: (res) => {
        this.inputAgency = res;
        this.inputAgencyLoading = false;
      },
      error: () => {
        this.inputAgencyLoading = false;
      },
      complete: () => {
        this.inputAgencyLoading = false;
      }
    })
  }

  getSomeCampaigns(name: string) {
    this.defaultSettings.agency = name;
    this.getRecentCampaign(this.defaultSettings);
    this.getAssignedCampaigns(this.defaultSettings);
    this.setQueryInUrl();
  }

  getAutocompleteClient(name: string = '') {
    this.clientService.apiGetAutocomplete(name).subscribe(res => {
      this.inputClient = res as [];
      this.getClientUrl((res: IAutocomplete) => {
        this.inputClientName = res;
      })
    })
  }

  filterChangeClient(name: string) {
    if (!name) { return };
    this.getAutocompleteClient(name);
  }

  getClientUrl(calback: Function): void {
    let candidate: IAutocomplete | undefined;
    this.route.queryParams.subscribe((query: IParamsQuery) => {
      if (Object.keys(query).length) {
        const { client } = query;
        candidate = this.inputClient.find((item: IAutocomplete) => item.name === client);
      }
      calback(candidate ? candidate : null)
    })
  }

  getAgencyUrl(calback: Function) {
    this.route.queryParams.subscribe((query: IParamsQuery) => {
      if (Object.keys(query).length) {
        const { agency } = query;
        calback(agency ? agency : null)
      }
    })
  }

  getSomeClient(item: IAutocomplete) {
    this.defaultSettings.client = item?.name || '';
    this.getRecentCampaign(this.defaultSettings);
    this.getAssignedCampaigns(this.defaultSettings);
    this.setQueryInUrl();
  }

  setQueryInUrl() {
    this.router.navigate([], {
      queryParams: this.defaultSettings
    })
  }

  findSendQueryUrl() {
    this.route.queryParams.subscribe(query => {
      if (Object.keys(query).length) {
        const { page, size, agency, client } = query as IParamsQuery;
        if (page) { this.defaultSettings.page = page } else { delete this.defaultSettings.page };
        if (size) { this.defaultSettings.size = size } else { delete this.defaultSettings.size };
        if (agency) { this.defaultSettings.agency = agency } else { delete this.defaultSettings.agency };
        if (client) { this.defaultSettings.client = client } else { delete this.defaultSettings.client };
        this.inputAgencyName = agency ? agency : '';
        this.setQueryInUrl();
      }
    })
  }
}
