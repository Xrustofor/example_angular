import { Component, OnInit } from "@angular/core";
import { Utility } from "src/app/utility";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { MASK_AVAILABLE_UPLOAD_FILE_TYPES, MASK_DATE, MASK_PHONE } from "src/app/constants/masks";
import { GlobalService } from "src/app/services/global/global.service";
import { ToastService } from "src/app/services/toast.service";
import { Location } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { IKeyValueString, IProperty } from "src/app/interfaces/global/global.interfaces";
import {
  IRfpAttachmentForm,
  IRfpCreateUpdateModel,
  campaignInformationFormParams,
  generalInformationFormParams,
  mediaRFPItemForm
} from "src/app/services/request-for-proposal/rfp.interface";
import { RfpService } from "src/app/services/request-for-proposal/rfp.service";
import { DragDropFile } from "src/app/common/drag-drop/drag-drop.component";

@Component({
  selector: "add-proposal-request-page",
  templateUrl: 'add-proposal-request-page.component.html',
  styleUrls: ['add-proposal-request-page.component.scss'],
})
export class AddProposalRequestPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;
  protected MASK_DATE = MASK_DATE;
  protected MASK_AVAILABLE_UPLOAD_FILE_TYPES = MASK_AVAILABLE_UPLOAD_FILE_TYPES;

  public dateStart: Date = new Date();
  public dateEnd: Date = new Date();
  public deadlineDate: Date = new Date();

  generalInformationForm: FormGroup;
  campaignInformationForm: FormGroup;
  attachmentForm: FormGroup;
  mediaOutletForm: FormGroup;

  contactNames: IKeyValueString[] = [
    { key: 'Name 1', value: 'name1' },
    { key: 'Name 2', value: 'name2' },
  ]

  countries: IKeyValueString[];
  mediaChannels: IKeyValueString[] = [{ key: 'channel1', value: 'Channel 1' }, { key: 'channel2', value: 'Channel 2' }];

  get attachmentItems(): FormArray {
    return this.attachmentForm.get('files') as FormArray;
  }

  get mediaOutletItems(): FormArray {
    return this.mediaOutletForm.get('items') as FormArray;
  }

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private rfpService: RfpService,
    private globalService: GlobalService,
    private breadcrumbService: BreadcrumbService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    // General Information form
    this.generalInformationForm = this.formBuilder.group(generalInformationFormParams);

    // Campaign Information form
    this.campaignInformationForm = this.formBuilder.group(campaignInformationFormParams);

    // Attachment form
    this.attachmentForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

    // Media RFP List form
    this.mediaOutletForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.getClientById();
    this.getCountries();
  }

  getClientById() {
    const id = this.route.snapshot.paramMap.get('id') as string;

    const urlParts = this.router.url.split("?")[0].split("/");
    urlParts.pop();
    const previousUrl = urlParts.join("/");

    this.rfpService.apiGetById(id).subscribe(response => {
      this.breadcrumbService.setPageTitle(`${response.campaign} RFP List`, 'eye', previousUrl);
      this.breadcrumbService.setPageTitle(`${response.campaign} RFP`, 'plus');
    });
  }

  getCountries() {
    this.globalService.apiGetTargetAudience().subscribe((countries) => {
      this.countries = countries;

      if (this.countries.length > 0) {
        this.campaignInformationForm.patchValue({
          country_id: this.countries[0].key // Set default value
        });
      }
    })
  }

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidCampaignInformationFormControl(name: string) {
    return this.campaignInformationForm.hasError(name);
  }

  isInvalidFormControl(form: FormGroup, name: any) {
    return form.hasError(name);
  }

  sendRFP() {
    this.setFormErrors(this.generalInformationForm);
    this.setFormErrors(this.campaignInformationForm);
    this.setFormGroupErrors(this.attachmentForm.get('files') as FormGroup);
    this.setFormGroupErrors(this.mediaOutletForm.get('items') as FormGroup);

    const model: IRfpCreateUpdateModel = {
      info: this.generalInformationForm.value,
      attachment: this.attachmentForm.value.files,
      media_list: this.mediaOutletForm.value.items,
    }

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.campaignInformationForm.errors) &&
      this.isValidForm(this.attachmentForm.errors) &&
      this.isValidForm(this.mediaOutletForm.errors)) {

      console.log("Successfully send", model);

      // this.agencyService.apiCreateOrUpdate(model).subscribe({
      //   next: () => {
      //     this.goBack();
      //     this.toast.show('Agency successfully added!', 'success')
      //   },
      //   error: response => this.toast.show(response.error.message, 'error')
      // });
    }
    else {
      console.log("Send failed", model);
      this.toast.show('Form data is not filled out correctly', 'error');
    }
  }

  addRowMediaOutlet() {
    this.mediaOutletItems.insert(0, this.formBuilder.group(mediaRFPItemForm));
  }

  removeRowMediaOutlet(index: number) {
    this.mediaOutletItems.removeAt(index);
  }

  goBack() {
    this.location.back();
  }

  onAttachmentsSelected(files: DragDropFile[]) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      this.attachmentItems.push(
        this.formBuilder.group({
          name: [file.name],
          extension: [file.extension],
          date: [file.date],
          size: [file.size],
          type: [file.type],
        } as IRfpAttachmentForm)
      );
    }
  }

  addZeroBlur(item: FormGroup, key: string) {
    const value = item.get(key)?.value;
    item.get(key)?.setValue(value);
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

  private setFormGroupErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((controlName: string) => {
      const control = formGroup.get(controlName);
      if (control instanceof FormControl && control) {
        control.markAsTouched();
        control.markAsDirty();
      }
      else if (control instanceof FormGroup) {
        this.setFormErrors(control);
      }
    });
  }
}
