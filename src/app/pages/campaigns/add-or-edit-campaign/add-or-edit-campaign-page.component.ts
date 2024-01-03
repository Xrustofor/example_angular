import { Component, OnInit } from "@angular/core";
import { Utility } from "../../../utility";
import { IMetaPagination } from "../../../interfaces/shared/meta-pagination.interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "../../../services/toast.service";
import { GlobalService } from "../../../services/global/global.service";
import { IProperty, IPropertyAny, IPropertyString } from "../../../interfaces/global/global.interfaces";
import { toString } from "@progress/kendo-angular-intl";
import { IApiAMediaPlan, IApiCampaignAdd } from "../../../services/campaign/campaign.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "../../../services/bread-crumb.service";
import { DatePipe, Location } from "@angular/common";
import { IMediaPlan } from "./component/edited-table/interface";
import { CampaignService } from "src/app/services/campaign/campaign.service";

@Component({
  selector: "add-campaigns-page",
  templateUrl: 'add-or-edit-campaign-page.component.html',
  styleUrls: ['add-or-edit-campaign-page.component.scss'],
  providers: [DatePipe],
})
export class AddOrEditCampaignPageComponent implements OnInit {
  public editedCompanyID: string = ''
  public campaignName: string | null = null;
  public form: FormGroup;
  public meta: IMetaPagination | null = null;
  public loading = false;
  protected getIcon = Utility.instance().getIcon;
  protected getDateWithString = Utility.instance().getDateWithString;

  public item: IApiCampaignAdd | null = null;
  public mediaPlanOptions: IApiAMediaPlan;
  public mediaPlan: IMediaPlan[] = [];

  public years: string[] = this.getYears(34)

  public dateStart: Date = new Date();
  public dateEnd: Date = new Date();

  public tableData: IMediaPlan[] = []

  constructor(
    protected toast: ToastService,
    protected campaignService: CampaignService,
    protected global: GlobalService,
    private route: ActivatedRoute,
    protected router: Router,
    private breadcrumbService: BreadcrumbService,
    public date: DatePipe,
    public location: Location
  ) { }

  tableItems: [] = [];
  ngOnInit() {
    this.initIdCampaign()

    this.getCampaignAdd(this.editedCompanyID);
    this.form = this.initForm();
  }

  initBreadCrumb() {
    if (this.campaignName) {
      this.breadcrumbService.setPageTitle(this.campaignName, 'edit');
      return;
    }
    this.breadcrumbService.setPageTitle('Campaign', 'plus');
  }

  initIdCampaign() {
    this.route.params.subscribe(res => {
      this.editedCompanyID = res['id'] || '';
    })
  }

  callbackForm = this.geFieldForMediaPlanId

  initCreateBy(value: string | null) {
    if (!this.form) { return }
    this.form.get('created_by')?.setValue(value)
  }

  geFieldForMediaPlanId() {
    const { year, code, client } = this.form.value;
    const data: IPropertyString = {};
    if (year) { data['year'] = year }
    if (code) { data['campaign_code'] = code }
    if (client?.code) { data['client_code'] = client.code }
    return { ...data }
  }

  getCampaignAdd(uuid: null | string) {
    this.campaignService.apiGetCampaignAddOrEdit(uuid).subscribe({
      next: (res: IApiCampaignAdd) => {
        this.item = res;
        this.campaignName = res.campaign.name;
        this.initBreadCrumb();

        this.mediaPlanOptions = {
          audience_segments: res.media_plan.audience_segments,
          channels: res.media_plan.channels,
          mask: res.media_plan.mask,
          statuses: res.media_plan.statuses,
        };
        if (res.media_plan?.plans) {
          this.mediaPlan = res.media_plan.plans;
        }
        this.form = this.initForm();
        this.form.valueChanges.subscribe(this.callbackForm.bind(this))
        this.initCreateBy(res.campaign.created_by.value);
      }
    })
  }

  initForm(): FormGroup {
    return new FormGroup({
      agency: new FormControl(this.getField('agency'), Validators.required),
      name: new FormControl(this.getField('name'), Validators.required),
      budget: new FormControl(this.getField('budget'), Validators.required),
      purchased_amount: new FormControl(this.getField('purchased_amount')),
      created_by: new FormControl(null),

      client: new FormControl(this.getField('client'), Validators.required),
      code: new FormControl(this.getField('code'), Validators.required),
      start_date: new FormControl(this.getField('start_date'), Validators.required),
      actualized_amount: new FormControl(this.getField('actualized_amount')),
      status: new FormControl(this.getField('status')),

      year: new FormControl(this.getField('year'), Validators.required),
      end_date: new FormControl(this.getField('end_date'), Validators.required),
      supervisor_uuid: new FormControl(this.getField('assign')),
    })
  }

  getField(fieldName: string) {
    if (!fieldName) { return null }
    switch (fieldName) {
      case 'agency': {
        if (!this.item?.agency.key) { return null }
        const key = this.item?.agency.key
        const candidate = this.item.agency.list.find(el => el.key === key);
        if (!candidate) { return null }
        return candidate
      }
      case 'client': {
        if (!this.item?.client.key) { return null }
        const key = this.item?.client.key;
        const candidate = this.item.client.list.find(el => el.key === key);
        if (!candidate) { return null }
        return candidate
      }
      case 'status': {
        if (!this.item?.campaign.status) { return null }
        const key = this.item?.campaign.status.key;
        const candidate = this.item.campaign.status.list.find(el => el.key === key);
        if (!candidate) { return null }
        return candidate
      }
      case 'assign': {
        if (!this.item?.campaign.assign) { return null }
        const key = this.item?.campaign.assign.key;
        const candidate = this.item.campaign.assign.list.find(el => el.key === key);
        if (!candidate) { return null }
        return candidate
      }
      case 'year': {
        if (!this.item?.campaign.year?.value) { return null }
        return this.item.campaign.year.value;
      }
      case 'name': {
        if (!this.item?.campaign.name) { return null }
        return this.item.campaign.name;
      }
      case 'code': {
        if (!this.item?.campaign.code) { return null }
        return this.item.campaign.code;
      }
      case 'start_date': {
        if (!this.item?.campaign.start_date) { return null }
        const start_date: string = this.item.campaign.start_date as string;
        return this.getDateWithString(start_date, 'dd/mm/yyyy')
      }
      case 'end_date': {
        if (!this.item?.campaign.end_date) { return null }
        const end_date: string = this.item.campaign.end_date as string;
        return this.getDateWithString(end_date, 'dd/mm/yyyy')
      }
      case 'budget': {
        if (!this.item?.campaign.budget) { return null }
        return this.item?.campaign.budget
      }
      case 'purchased_amount': {
        if (!this.item?.campaign.purchased_amount) { return null }
        return this.item?.campaign.purchased_amount
      }
      case 'actualized_amount': {
        if (!this.item?.campaign.actualized_amount) { return null }
        return this.item?.campaign.actualized_amount
      }
    }
    return null
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.toast.show('Not all fields are filled! Please fill them out.', 'warning');
      return
    }
    let media_plan: IProperty<any>[] = [];
    if (this.mediaPlan) {

      for (let item of this.mediaPlan) {
        const {
          actualized_amount,
          audience_segment,
          budget,
          media_channel,
          purchased_amount,
          status,
          uuid
        } = item;
        media_plan.push({
          actualized_amount,
          audience_segment: audience_segment?.key,
          channel: media_channel?.key,
          budget,
          purchased_amount,
          status: status?.key,
          uuid
        })
      }
    }
    let campaign: IPropertyAny = {
      ...this.form.value,
      name: this.form.value.name,
      client: this.form.value.client['key'],
      supervisor_uuid: this.form.value.supervisor_uuid && this.form.value.supervisor_uuid['key'],
      created_by: this.form.value.created_by['key'],
      uuid: this.editedCompanyID
    }

    campaign = clearEmptyRows(campaign);

    const data = {
      campaign,
      media_plan
    }

    this.loading = true;
    this.campaignService.apiCreateCampaign(data).subscribe({
      next: (res) => {
        this.toast.show(res.message, 'success');
        this.form.reset();
        this.tableData = [];
        this.loading = false;
        this.location.back()
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  addZeroBlur(key: string) {
    const value = this.form.get(key)?.value;
    this.form.get(key)?.setValue(value);
  }

  public getYears(limits: number): string[] {
    const currentYear = Number(new Date().getFullYear());
    const items: string[] = []
    for (let step: number = 0; step < limits; step++) {
      items.push(toString(currentYear - step))
    }
    return items
  }

  public statusListDisabled(itemArgs: { dataItem: string; index: number }) {
    return !this.editedCompanyID;
  }
}

const clearEmptyRows = (item: IPropertyAny) => {
  if (!item) { return item }
  const data: IPropertyAny = {}
  Object.keys(item).forEach(key => {
    if (item[key]) {
      data[key] = item[key];
    }
  })
  return data
}
