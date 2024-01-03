import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { ToastService } from "src/app/services/toast.service";
import { Utility } from "src/app/utility";
import { IKeyValueString, IProperty } from "src/app/interfaces/global/global.interfaces";
import { Location } from "@angular/common";
import { IReportCreateModel, filtersFormParams, generalInformationFormParams } from "src/app/services/report/report.interface";
import { ReportService } from "src/app/services/report/report.service";

@Component({
  selector: "create-report-page",
  templateUrl: 'create-report-page.component.html',
  styleUrls: ['create-report-page.component.scss'],
})
export class CreateReportPageComponent {
  protected getIcon = Utility.instance().getIcon;

  public inputUser: IKeyValueString[];
  public inputUserName = '';
  public inputUserLoading = false;

  generalInformationForm: FormGroup;
  filtersForm: FormGroup;

  public dateStart: Date = new Date();
  public dateEnd: Date = new Date();

  agencies: IKeyValueString[] = [{ key: "agency1", value: "Agency 1" }, { key: "agency2", value: "Agency 2" }, { key: "agency3", value: "Agency 3" },];
  clients: IKeyValueString[] = [{ key: "client1", value: "Client 1" }, { key: "client2", value: "Client 2" }, { key: "client3", value: "Client 3" },];
  campaigns: IKeyValueString[] = [{ key: "campaign1", value: "Campaign 1" }, { key: "campaign2", value: "Campaign 2" }, { key: "campaign3", value: "Campaign 3" },];
  audiencies: IKeyValueString[] = [{ key: "audience1", value: "Audience 1" }, { key: "audience2", value: "Audience 2" }, { key: "audience3", value: "Audience 3" },];
  mediaChannels: IKeyValueString[] = [{ key: "mediaChannel1", value: "Media Channel 1" }, { key: "mediaChannel2", value: "Media Channel 2" }, { key: "mediaChannel3", value: "Media Channel 3" },];
  campaignStatuses: IKeyValueString[] = [{ key: "campaignStatus1", value: "Campaign Status 1" }, { key: "campaignStatus2", value: "Campaign Status 2" }, { key: "campaignStatus3", value: "Campaign Status 3" },];
  mediaPlans: IKeyValueString[] = [{ key: "mediaPlan1", value: "Media Plan 1" }, { key: "mediaPlan2", value: "Media Plan 2" }, { key: "mediaPlan3", value: "Media Plan 3" },];
  mediaPlanStatuses: IKeyValueString[] = [{ key: "mediaPlanStatuse1", value: "Media Plan Statuse 1" }, { key: "mediaPlanStatuse2", value: "Media Plan Statuse 2" }, { key: "mediaPlanStatuse3", value: "Media Plan Statuse 3" },];
  mediaOutlets: IKeyValueString[] = [{ key: "mediaOutlet1", value: "Media Outlet 1" }, { key: "mediaOutlet2", value: "Media Outlet 2" }, { key: "mediaOutlet3", value: "Media Outlet 3" },];

  constructor(
    private reportService: ReportService,
    private formBuilder: FormBuilder,
    private location: Location,
    private toast: ToastService,
  ) {
    // General Information form
    this.generalInformationForm = this.formBuilder.group(generalInformationFormParams);

    // Filters form
    this.filtersForm = this.formBuilder.group(filtersFormParams);
  }

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidFiltersFormControl(name: string) {
    return this.filtersForm.hasError(name);
  }

  submitCreateReport() {
    this.setFormErrors(this.generalInformationForm);
    this.setFormErrors(this.filtersForm);

    const model: IReportCreateModel = {
      general: this.generalInformationForm.value,
      filters: this.filtersForm.value
    }

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.filtersForm.errors)) {

      this.reportService.apiCreate(model).subscribe({
        next: () => {
          this.goBack();
          this.toast.show('Report successfully added!', 'success')
        },
        error: response => this.toast.show(response.error.message, 'error')
      });
    }
    else {
      this.toast.show('Form data is not filled out correctly', 'error');
    }
  }

  goBack() {
    this.location.back();
  }

  getAutocompleteUser(str: string) {
    if (!str) {
      this.inputUserLoading = false
      this.inputUser = [];
      return;
    }
    this.inputUserLoading = true;
    this.reportService.apiGetAutocomplete(str).subscribe({
      next: res => {
        this.inputUser = Array.isArray(res) ? res : [];
        this.inputUserLoading = false
      },
      error: () => { },
      complete: () => this.inputUserLoading = false
    })
  }

  private isValidForm(errors: ValidationErrors | null) {
    if (!errors) return true;
    return Object.values(errors).indexOf(true) === -1;
  }

  private setFormErrors(form: FormGroup) {
    form.setErrors(Object.keys(form.controls)
      .reduce((accum, key) => {
        accum[key] = !form.controls[key].valid;
        return accum;
      }, {} as IProperty<boolean>)
    );
  }
}
