import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { ToastService } from "src/app/services/toast.service";
import { Utility } from "src/app/utility";
import { MASK_PHONE } from "../../../constants/masks";
import { IKeyValueString, IProperty } from "src/app/interfaces/global/global.interfaces";
import { GlobalService } from "src/app/services/global/global.service";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "src/app/services/bread-crumb.service";
import { IClientContactForm, IClientCreateUpdateModel, IGeneralInformationForm, IViewClient, clientContactFormParams } from "src/app/services/client/client.interface";
import { ClientService } from "src/app/services/client/client.service";

@Component({
  selector: "edit-client-page",
  templateUrl: 'edit-client-page.component.html',
  styleUrls: ['edit-client-page.component.scss'],
})
export class EditClientPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;

  client: IViewClient | null

  generalInformationForm: FormGroup;
  clientContactsForm: FormGroup;

  countries: any[];

  get contactItems(): FormArray {
    return this.clientContactsForm.get('contactItems') as FormArray;
  }

  get MASK_PHONE() { return MASK_PHONE; }

  constructor(
    private clientService: ClientService,
    private globalService: GlobalService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getCountries();
    this.getClientById();
  }

  getCountries() {
    this.globalService.apiGetTargetAudience().subscribe((countries: IKeyValueString[]) => {
      this.countries = countries;
    })
  }

  getClientById() {
    const clientId = this.route.snapshot.paramMap.get('id') as string;

    this.clientService.apiGetById(clientId).subscribe(response => {
      this.client = response;

      this.breadcrumbService.setPageTitle(this.client.client, 'edit');

      this.patchGeneralInformation();
      this.patchClientContacts();
    });
  }

  patchGeneralInformation() {
    if (!this.client) return;

    this.generalInformationForm = this.formBuilder.group({
      uuid: [this.client.uuid],
      client: [this.client.client],
      country_id: [this.client.country.key],
      state: [this.client.state],
      city: [this.client.city],
      street: [this.client.street],
      postal_code: [this.client.postal_code],
      code: [this.client.code],
    } as IGeneralInformationForm);
  }

  patchClientContacts() {
    if (!this.client) return;

    this.clientContactsForm = this.formBuilder.group({
      contactItems: this.formBuilder.array([])
    });

    const contactItemsArray = this.clientContactsForm.get('contactItems') as FormArray;
    this.client.contacts.forEach(contact => {
      const newContactFormGroup = this.formBuilder.group({
        uuid: [contact.uuid],
        last_name: [contact.last_name],
        first_name: [contact.first_name],
        position: [contact.position],
        email: [contact.email],
        phone: [contact.phone],
      } as IClientContactForm);

      contactItemsArray.push(newContactFormGroup);
    });
  }

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidOtherContactsFormControl(form: FormGroup, name: any) {
    return form.hasError(name);
  }

  submitAddClient() {
    if (!this.client) return;

    this.setFormErrors(this.generalInformationForm);
    this.setFormGroupErrors(this.clientContactsForm.get('contactItems') as FormGroup);

    const model: IClientCreateUpdateModel = {
      general: this.generalInformationForm.value,
      contacts: this.clientContactsForm.value.contactItems
    }
    model.general.uuid = this.client.uuid;

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.clientContactsForm.errors)) {

      this.clientService.apiCreateOrUpdate(model).subscribe({
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
    this.contactItems.insert(0, this.formBuilder.group(clientContactFormParams));
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
