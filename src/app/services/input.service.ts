import { Injectable } from "@angular/core";
import { UrlQueryService } from "./query/url-query.service";
import { ClientService } from "./client/client.service";
import { AgencyService } from "./agency/agency.service";
import { CampaignService } from "./campaign/campaign.service";
import { IKeyValueString, IPropertyAny, IPropertyString } from "../interfaces/global/global.interfaces";
import { Utility } from "../utility";
import { MediaPartnerService } from "./media-partner/media-partner.service";
import { AgencyUsersService } from "./agency-users/agency-users.service";

@Injectable()
export class InputService {
    private findFieldInArray = Utility.instance().findFieldInArray;

    public search: string;
    public searchLoading: boolean;

    public inputAgency: IKeyValueString[];
    public inputAgencyName: string;
    public inputAgencyObject: IPropertyString | null;
    public inputAgencyLoading: boolean;

    public inputClient: IKeyValueString[];
    public inputClientName: string;
    public inputClientObject: IPropertyString | null;
    public inputClientLoading: boolean;

    public inputCampaign: IKeyValueString[];
    public inputCampaignName: string;
    public inputCampaignObject: IPropertyString | null;
    public inputCampaignLoading: boolean;

    public years: IPropertyString[];
    public changeYear: string;
    public selectedYear: IPropertyString | null;

    public statuses: IKeyValueString[];
    public selectedStatusValue: string;
    public selectedStatusIndex: number;

    public inputMediaPartner: IKeyValueString[];
    public inputMediaPartnerName: string;
    public inputMediaPartnerObject: IPropertyString | null;
    public inputMediaPartnerLoading: boolean;

    public inputAgencyUser: IKeyValueString[];
    public inputAgencyUserName: string;
    public inputAgencyUserObject: IPropertyString | null;
    public inputAgencyUserLoading: boolean;

    constructor(
        private agencyService: AgencyService,
        private clientService: ClientService,
        private campaignService: CampaignService,
        private mediaPartnerService: MediaPartnerService,
        private agencyUsersService: AgencyUsersService,

        private urlQueryService: UrlQueryService,
    ) { }

    filterChangeCampaign(value: string) {
        this.uploadCampaigns(value);
    }
    filterChangeClient(value: string) {
        this.uploadClients(value);
    }
    filterChangeYear(value: string) {
        this.changeYear = value;
    }
    filterChangeStatus(item: { value: string }) {
        this.selectedStatusValue = item.value;
        this.urlQueryService.applyQuery('status', this.selectedStatusValue);
    }
    filterChangeSearch(value: string) {
        this.search = value;
        this.searchLoading = true;
        this.urlQueryService.applyQuery('search', value);
    }

    savingFieldsFromUrl(query: IPropertyAny) {
        if (!Object.keys(query).length) return;

        Object.keys(query).forEach((key: string) => {
            this.urlQueryService.query[key] = String(query[key]);

            switch (key) {
                case 'search': {
                    this.search = String(query[key]);
                    break;
                }
                case 'agency': {
                    const agency = this.findFieldInArray(this.inputAgency, query[key] as string, 'value');
                    if (!agency) return;

                    this.inputAgencyName = String(query[key]);
                    this.inputAgencyObject = agency as IPropertyString;
                    break;
                }
                case 'client': {
                    const client = this.findFieldInArray(this.inputClient, query[key] as string, 'key');
                    if (!client) return;

                    this.inputClientName = String(query[key]);
                    this.inputClientObject = client as IPropertyString;
                    break;
                }
                case 'campaign': {
                    const campaign = this.findFieldInArray(this.inputCampaign, query[key] as string, 'key');
                    if (!campaign) return;

                    this.inputCampaignName = String(query[key]);
                    this.inputCampaignObject = campaign as IPropertyString;
                    break;
                }
                case 'year': {
                    const year = this.findFieldInArray(this.years, query[key] as string, 'value');
                    this.selectedYear = year ? year as any : String(query[key]);
                    break;
                }
                case 'name': {
                    const year = this.findFieldInArray(this.inputMediaPartner, query[key] as string, 'value');
                    this.inputMediaPartnerName = year ? year as any : String(query[key]);
                    break;
                }
                case 'user': {
                    const user = this.findFieldInArray(this.inputAgencyUser, query[key] as string, 'value');
                    this.inputAgencyUserName = user ? user as any : String(query[key]);
                    break;
                }
                case 'status': {
                    const status: IKeyValueString | null = this.findFieldInArray(this.statuses, query[key] as string, 'key');
                    if (status) {
                        this.selectedStatusIndex = this.statuses.findIndex(s => s.key === status.key);
                        this.selectedStatusValue = status.key;
                    }
                    break;
                }
            }
        });
    }

    uploadAgencies(value = '') {
        return new Promise(resolve => {
            this.inputAgencyLoading = true;
            this.agencyService.apiGetAutocomplete(value).subscribe({
                next: res => {
                    this.inputAgency = Array.isArray(res) ? res : [];
                },
                error: () => { },
                complete: () => {
                    this.inputAgencyLoading = false;
                    resolve(true);
                }
            });
        });
    }

    uploadClients(value = '') {
        return new Promise(resolve => {
            this.inputClientLoading = true;
            this.clientService.apiGetAutocomplete(value).subscribe({
                next: res => {
                    this.inputClient = Array.isArray(res) ? res : [];
                },
                error: () => { },
                complete: () => {
                    this.inputClientLoading = false;
                    resolve(true);
                }
            });
        });
    }

    uploadCampaigns(name = '') {
        return new Promise(resolve => {
            this.inputCampaignLoading = true;
            this.campaignService.apiGetAutocomplete(name).subscribe(res => {
                this.inputCampaign = Array.isArray(res) ? res : [];
                this.inputCampaignLoading = false;

                resolve(true);
            });
        });
    }

    uploadMediaPartners(value = '') {
        return new Promise(resolve => {
            this.inputMediaPartnerLoading = true;
            this.mediaPartnerService.apiGetAutocomplete(value).subscribe({
                next: res => {
                    this.inputMediaPartner = Array.isArray(res) ? res : [];
                },
                error: () => { },
                complete: () => {
                    this.inputMediaPartnerLoading = false;
                    resolve(true);
                }
            });
        });
    }

    uploadAgencyUsers(value = '') {
        const query = { name: value };
        return new Promise(resolve => {
            this.inputAgencyUserLoading = true;
            this.agencyUsersService.apiGetAgencyUserList(query).subscribe({
                next: (res: IKeyValueString[]) => {
                    this.inputAgencyUser = Array.isArray(res) ? res : []
                },
                error: () => { },
                complete: () => {
                    this.inputAgencyUserLoading = false;
                    resolve(true);
                }
            });
        });
    }

    uploadYears() {
        this.campaignService.apiGetCampaignYears().subscribe(res => {
            this.years = res;
        });
    }
}
