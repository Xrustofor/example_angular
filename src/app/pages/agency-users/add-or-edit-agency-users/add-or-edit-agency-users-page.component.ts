import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MASK_PHONE } from "../../../constants/masks";
import { ToastService } from "../../../services/toast.service";
import { Location } from "@angular/common";
import { IApiAgencyUsersMetaID } from "../../../services/agency-users/agency-users.interface";
import { Title } from "@angular/platform-browser";
import { BreadcrumbService } from "../../../services/bread-crumb.service";
import { AgencyUsersService } from "../../../services/agency-users/agency-users.service";
import { ActivatedRoute } from "@angular/router";
import {
  IKeyValueData,
  IKeyValueString,
} from "../../../interfaces/global/global.interfaces";
import { LoadingService } from "../../../services/loading/loading.service";
import { Utility } from "../../../utility";

export interface IClientsForm {
  // checked: boolean
  client: IKeyValueData<string, string, number | null>
}

@Component({
  selector: "adm-agency-user-page",
  templateUrl: 'add-or-edit-agency-users-page.component.html',
  styleUrls: ['add-or-edit-agency-users-page.component.scss'],
})
export class AddOrEditAgencyUsersPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  public agencyUserID: string = '';
  public roleList: IKeyValueString[] = [];
  public statusList: IKeyValueString[] = [];
  public form: FormGroup;
  public loading = false;
  public assignedList: IKeyValueData<string, string, number | null>[] = [];

  constructor(
    private toast: ToastService,
    public location: Location,
    protected agencyUsersService: AgencyUsersService,
    private route: ActivatedRoute,
    private titleService: Title,
    private breadcrumbService: BreadcrumbService,
    private loadingService: LoadingService,
  ) { }
  ngOnInit() {
    this.form = this.initForm()
    this.initIdAgencyUser();
    this.getAgencyUser(this.agencyUserID);

    // this.loadingService._load.subscribe({
    //   next: (loading: boolean) => this.loading = loading
    // })
  }
  get MASK_PHONE() { return MASK_PHONE; }

  getAgencyUser(uuid: string) {
    this.agencyUsersService.apiGetAgencyUser(uuid).subscribe((res: IApiAgencyUsersMetaID) => {
      this.roleList = res.role.list;
      this.statusList = res.status.list;
      this.assignedList = res.clients.list;
      this.form = this.initForm(res)
      if (this.agencyUserID) {
        this.breadcrumbService.setPageTitle(res.name, 'edit');
      }
      this.titleService.setTitle(res.name || 'User')
    })
  }
  initIdAgencyUser() {
    this.route.params.subscribe(res => {
      this.agencyUserID = res['id'] || '';
    })
  }

  initForm(item: IApiAgencyUsersMetaID | null = null) {
    return new FormGroup({
      last_name: new FormControl(item?.last_name || null, Validators.required),
      first_name: new FormControl(item?.first_name || null, Validators.required),
      position_id: new FormControl(item?.position || null, Validators.required),
      email: new FormControl(item?.email || null, [Validators.required, Validators.email]),
      phone: new FormControl(item?.phone || null, Validators.required),
      role: new FormControl(this.getKeyValue(item?.role), Validators.required),
      status: new FormControl(this.getKeyValue(item?.status), Validators.required),
      clients: new FormArray(this.initClients(item?.clients?.assigned))
    })
  }

  getKeyValue(item: IKeyValueData<string, string, IKeyValueString[]> | undefined) {
    if (!item || !item.key || !item.value) { return null }
    const { key, value } = item; 0
    return { key, value };
  }
  initClients(items: IKeyValueData<string, string, number | null>[] | undefined) {
    if (!Array.isArray(items)) { return [] }
    const item: FormGroup[] = [];
    items.forEach((el: IKeyValueData<string, string, number | null>) => {
      item.push(new FormGroup({
        client: new FormControl(el || null)
      }))
    })
    return item
  }

  addNew() {
    if (!this.form.get('clients')) { return }
    if (this.form.get('clients')?.invalid) {
      this.toast.show('Before adding a new customer, fill in the field.', 'warning')
      this.form.get('clients')?.markAllAsTouched()
      return
    }
    if (this.isSelectedAllClients()) {
      this.toast.show('All customers are client', 'warning')
      return
    }
    (this.form.get('clients') as FormArray).insert(0, new FormGroup({
      client: new FormControl(null, Validators.required),
    }));
  }

  isSelectedAllClients(): boolean {
    if (!this.form.get('clients')) { return false }
    const items = this.form.get('clients')?.value;
    if (!Array.isArray(items)) { return false }
    if (!this.assignedList.length) { return false }
    let numberChosen = 0;
    items.forEach((item: IClientsForm) => {
      const candidate = this.assignedList.find((el: IKeyValueData<string, string, number | null>) => item?.client?.key === el.key)
      if (candidate) { numberChosen++ }
    })
    return this.assignedList.length === numberChosen;
  }

  get clientsForm(): FormArray {
    return this.form.get('clients') as FormArray;
  }
  public clientListDisabled(
    itemArgs: {
      dataItem: IKeyValueData<string, string, number | null>;
      index: number
    }): boolean {
    if (!this.clientsForm) { return true }
    const clients = this.clientsForm.value as IClientsForm[];
    if (!Array.isArray(clients)) { return false }
    return !!clients.find((item: IClientsForm) => {
      if (!item.client) { return false }
      return item.client.key === itemArgs.dataItem.key
    });
  }

  removeClient(idx: number) {
    (this.form.get('clients') as FormArray).removeAt(idx)
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.toast.show('Not all fields are filled! Please fill them out.', 'warning');
      return
    }
    const assigned = this.customerFormation(this.form.value.clients);
    let data = {
      user: {
        uuid: this.agencyUserID || null,
        ...this.form.value,
        role: this.form.value.role.key,
        status: this.form.value.status.key
      },
      clients: assigned
    }
    delete data.user.clients;

    this.agencyUsersService.apiPostAgencyUser(data).subscribe({
      next: res => {
        this.toast.show(res.message, 'success')
        this.location.back();
      },
      error: (err) => {
        this.toast.show(err.message, 'warning')
      }
    })
  }
  customerFormation(item: IClientsForm[]) {
    if (!Array.isArray(item)) { return [] }
    return item.map((item: IClientsForm) => ({ ...item.client }));
  }
}
