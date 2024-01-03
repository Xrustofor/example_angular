import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { ToastService } from "src/app/services/toast.service";
import { Utility } from "src/app/utility";
import { MASK_PHONE } from "../../../constants/masks";
import { IProperty, IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { GlobalService } from "src/app/services/global/global.service";
import { Location } from "@angular/common";
import {
  clientContactFormParams,
  IClientCreateUpdateModel,
  generalInformationFormParams,
} from "src/app/services/client/client.interface";
import { ClientService } from "src/app/services/client/client.service";

@Component({
  selector: "add-client-page",
  templateUrl: 'add-client-page.component.html',
  styleUrls: ['add-client-page.component.scss'],
})
export class AddClientPageComponent implements OnInit {
  protected getIcon = Utility.instance().getIcon;

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
    private formBuilder: FormBuilder,
    private location: Location,
    private toast: ToastService,
  ) {
    // General Information form
    this.generalInformationForm = this.formBuilder.group(generalInformationFormParams);

    // Other Contacts form
    this.clientContactsForm = this.formBuilder.group({
      contactItems: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.getCountries();
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

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidOtherContactsFormControl(form: FormGroup, name: any) {
    return form.hasError(name);
  }

  submitAddClient() {
    this.setFormErrors(this.generalInformationForm);
    this.setFormGroupErrors(this.clientContactsForm.get('contactItems') as FormGroup);

    const model: IClientCreateUpdateModel = {
      general: this.generalInformationForm.value,
      contacts: this.clientContactsForm.value.contactItems
    }

    if (this.isValidForm(this.generalInformationForm.errors) &&
      this.isValidForm(this.clientContactsForm.errors)) {

      this.clientService.apiCreateOrUpdate(model).subscribe({
        next: () => {
          this.goBack();
          this.toast.show('Client successfully added!', 'success')
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
