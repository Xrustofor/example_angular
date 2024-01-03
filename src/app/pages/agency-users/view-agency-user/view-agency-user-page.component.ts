import { Component, OnInit } from "@angular/core";
import { MASK_PHONE } from "../../../constants/masks";
import { ToastService } from "../../../services/toast.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AgencyUsersService } from "../../../services/agency-users/agency-users.service";
import { IApiAgencyUsersMetaID } from "../../../services/agency-users/agency-users.interface";
import { IKeyValueString } from "../../../interfaces/global/global.interfaces";
import { Title } from "@angular/platform-browser";
import { BreadcrumbService } from "../../../services/bread-crumb.service";

@Component({
  selector: "adm-agency-user-page",
  templateUrl: 'view-agency-user-page.component.html',
  styleUrls: ['view-agency-user-page.component.scss'],
})
export class ViewAgencyUserPageComponent implements OnInit {

  public agencyUserID: string = ''
  public data: Omit<IApiAgencyUsersMetaID, 'clients'>;
  public clients: IKeyValueString[];

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    protected router: Router,
    protected agencyUsersService: AgencyUsersService,
    private titleService: Title,
    private breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit() {
    this.initIdAgencyUser();
    this.getAgencyUser(this.agencyUserID);
  }

  initIdAgencyUser() {
    this.route.params.subscribe(res => {
      this.agencyUserID = res['id'] || '';
    })
  }

  getAgencyUser(id: string = '') {
    this.agencyUsersService.apiGetAgencyUser(id).subscribe((res: IApiAgencyUsersMetaID) => {
      this.data = res;
      this.clients = res.clients.assigned;
      this.breadcrumbService.setPageTitle(res.name, 'eye');
      this.titleService.setTitle(res.name || 'User')
    })
  }

  getItem(key: string, items: IKeyValueString[]): IKeyValueString {
    const empty = { key: '', value: '' }
    if (!key || !Array.isArray(items)) { return empty }
    const candidate = items.find(el => el.key === key)
    return candidate || empty;
  }
}
