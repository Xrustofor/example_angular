import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import {
  otherContactFormParams,
  IViewAgency,
  IOtherContactForm,
  IMainContactForm,
  IGeneralInformationForm,
  IAgencyCreateUpdateModel,
} from "src/app/services/agency/agency.interface";
import { AgencyService } from "src/app/services/agency/agency.service";
import { ToastService } from "src/app/services/toast.service";
import { Utility } from "src/app/utility";
import { MASK_PHONE } from "../../../constants/masks";
import { IKeyValueString, IProperty } from "src/app/interfaces/global/global.interfaces";
import { GlobalService } from "src/app/services/global/global.service";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";

@Component({
  selector: "edit-agency-page",
  templateUrl: 'edit-agency-page.component.html',
  styleUrls: ['edit-agency-page.component.scss'],
})
export class EditAgencyPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;

  agency: IViewAgency | null

  generalInformationForm: FormGroup;
  mainAgencyContactForm: FormGroup;
  otherContactsForm: FormGroup;

  countries: any[];

  mainAgencyRoles: IKeyValueString[];
  selectedMainAgencyRole: IKeyValueString;

  roles: IKeyValueString[];

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
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getCountries();
    this.getRolesAndStatuses();

    this.getAgencyById();
  }

  getCountries() {
    this.globalService.apiGetTargetAudience().subscribe((countries: IKeyValueString[]) => {
      this.countries = countries;
    })
  }

  getRolesAndStatuses() {
    this.agencyService.apiGetInfo().subscribe(response => {
      // Main Agency Contact - default role
      const { key, value } = response.main.role;
      this.selectedMainAgencyRole = { key, value };
      this.mainAgencyRoles = [{ key, value }];

      // Other Contacts - roles
      this.roles = response.main.role.list;

      // Other Contacts - statuses
      this.statuses = response.main.statuses;
    });
  }

  getAgencyById() {
    const agencyId = this.route.snapshot.paramMap.get('id') as string;

    this.agencyService.apiGetById(agencyId).subscribe(response => {
      this.agency = response;

      this.breadcrumbService.setPageTitle(this.agency.general.name, 'edit');

      this.patchGeneralInformation();
      this.patchMainContact();
      this.patchOtherContacts();
    });
  }

  patchGeneralInformation() {
    if (!this.agency) return;

    this.generalInformationForm = this.formBuilder.group({
      uuid: [this.agency.general.uuid],
      name: [this.agency.general.name],
      country_id: [this.agency.general.country.key],
      state: [this.agency.general.state],
      city: [this.agency.general.city],
      street: [this.agency.general.street],
      postal_code: [this.agency.general.postal_code],
      code: [this.agency.general.code],
    } as IGeneralInformationForm);
  }

  patchMainContact() {
    if (!this.agency) return;

    this.mainAgencyContactForm = this.formBuilder.group({
      uuid: [this.agency.main.uuid],
      last_name: [this.agency.main.last_name],
      first_name: [this.agency.main.first_name],
      position: [this.agency.main.position],
      email: [this.agency.main.email],
      phone: [this.agency.main.phone],
      role: [this.agency.main.role.key]
    } as IMainContactForm);
  }

  patchOtherContacts() {
    if (!this.agency) return;

    this.otherContactsForm = this.formBuilder.group({
      contactItems: this.formBuilder.array([])
    });

    const contactItemsArray = this.otherContactsForm.get('contactItems') as FormArray;
    this.agency.contacts.forEach(contact => {
      const newContactFormGroup = this.formBuilder.group({
        uuid: [contact.uuid],
        last_name: [contact.last_name],
        first_name: [contact.first_name],
        position: [contact.position],
        email: [contact.email],
        phone: [contact.phone],
        role: [contact.role.key],
        status: [contact.status],
      } as IOtherContactForm);

      contactItemsArray.push(newContactFormGroup);
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
    if (!this.agency) return;

    this.setFormErrors(this.generalInformationForm);
    this.setFormErrors(this.mainAgencyContactForm);
    this.setFormGroupErrors(this.otherContactsForm.get('contactItems') as FormGroup);

    const model: IAgencyCreateUpdateModel = {
      general: this.generalInformationForm.value,
      main: {...this.mainAgencyContactForm.value, position_id:this.mainAgencyContactForm.value.position},
      contacts: this.otherContactsForm.value.contactItems
    }
    model.general.uuid = this.agency.general.uuid;

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.mainAgencyContactForm.errors) &&
      this.isValidForm(this.otherContactsForm.errors)) {

      this.agencyService.apiCreateOrUpdate(model).subscribe({
        next: () => {
          this.goBack();
          this.toast.show('Agency successfully edited!', 'success')
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
