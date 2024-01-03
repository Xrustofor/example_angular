import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import {
  otherContactFormParams,
  mainAgencyContactFormParams,
  generalInformationFormParams,
  IAgencyCreateUpdateModel,
} from "src/app/services/agency/agency.interface";
import { AgencyService } from "src/app/services/agency/agency.service";
import { ToastService } from "src/app/services/toast.service";
import { Utility } from "src/app/utility";
import { MASK_PHONE } from "../../../constants/masks";
import { IKeyValueString, IProperty, IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { GlobalService } from "src/app/services/global/global.service";
import { Location } from "@angular/common";

@Component({
  selector: "add-agency-page",
  templateUrl: 'add-agency-page.component.html',
  styleUrls: ['add-agency-page.component.scss'],
})
export class AddAgencyPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;

  generalInformationForm: FormGroup;
  mainAgencyContactForm: FormGroup;
  otherContactsForm: FormGroup;

  countries: any[];

  mainAgencyRoles: IKeyValueString[];
  selectedMainAgencyRole: IKeyValueString;

  roles: IKeyValueString[];
  selectedRole: IKeyValueString;

  statuses: IKeyValueString[];

  get contactItems(): FormArray {
    return this.otherContactsForm.get('contactItems') as FormArray;
  }

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private agencyService: AgencyService,
    private globalService: GlobalService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    // General Information form
    this.generalInformationForm = this.formBuilder.group(generalInformationFormParams);

    // Main Agency Contact form
    this.mainAgencyContactForm = this.formBuilder.group(mainAgencyContactFormParams);

    // Other Contacts form
    this.otherContactsForm = this.formBuilder.group({
      contactItems: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.getCountries();
    this.getRolesAndStatuses();
  }

  getCountries() {
    this.globalService.apiGetTargetAudience().subscribe((countries: IPropertyString[]) => {
      this.countries = countries;

      if (this.countries.length > 0) {
        this.generalInformationForm.patchValue({
          country_id: this.countries[0].key // Set default value
        });
      }
    })
  }

  getRolesAndStatuses() {
    this.agencyService.apiGetInfo().subscribe(response => {
      // Main Agency Contact - default role
      const { key, value } = response.main.role;
      this.selectedMainAgencyRole = { key, value };
      this.mainAgencyRoles = [{ key, value }];
      this.mainAgencyContactForm.patchValue({ role: key });

      // Other Contacts - roles
      this.roles = response.main.role.list;
      this.selectedRole = this.roles[0];

      // Other Contacts - statuses
      this.statuses = response.main.statuses;
    });
  }

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidMainAgencyContactFormControl(name: string) {
    return this.mainAgencyContactForm.hasError(name);
  }

  isInvalidOtherContactsFormControl(form: FormGroup, name: any) {
    return form.hasError(name);
  }

  submitAddAgency() {
    this.setFormErrors(this.generalInformationForm);
    this.setFormErrors(this.mainAgencyContactForm);
    this.setFormGroupErrors(this.otherContactsForm.get('contactItems') as FormGroup);

    const model: IAgencyCreateUpdateModel = {
      general: this.generalInformationForm.value,
      main: this.mainAgencyContactForm.value,
      contacts: this.otherContactsForm.value.contactItems
    }

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.mainAgencyContactForm.errors) &&
      this.isValidForm(this.otherContactsForm.errors)) {

      this.agencyService.apiCreateOrUpdate(model).subscribe({
        next: () => {
          this.goBack();
          this.toast.show('Agency successfully added!', 'success')
        },
        error: response => this.toast.show(response.error.message, 'error')
      });
    }
    else {
      this.toast.show('Form data is not filled out correctly', 'error');
    }
  }

  addNewRow() {
    this.contactItems.insert(0, this.formBuilder.group(otherContactFormParams));
  }

  goBack() {
    this.location.back();
  }

  actionDelete(index: number) {
    this.contactItems.removeAt(index);
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
