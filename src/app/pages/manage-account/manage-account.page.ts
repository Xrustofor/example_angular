import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  ManageAccount,
  newPasswordFormParams,
  IGeneralInformationModel,
  generalInformationFormParams,
} from "src/app/services/manage-account/manage-account.interface";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { ManageAccountService } from "src/app/services/manage-account/manage-account.service";
import { ToastService } from "src/app/services/toast.service";
import { MASK_PHONE } from "../../constants/masks";
import { IKeyValueString, IProperty } from "src/app/interfaces/global/global.interfaces";
import { ControllerService } from "src/app/pages-view.controller/index-controller.service";
import { Router } from "@angular/router";

@Component({
  selector: "adm-manage-account-page",
  templateUrl: 'manage-account.page.html',
  styleUrls: ['manage-account.page.scss'],
})
export class ManageAccountPage implements OnInit {
  static readonly MANAGE_ACCOUNT_KEY = 'manage-account'

  protected readonly MASK_PHONE = MASK_PHONE;

  generalInformationForm: FormGroup;
  newPasswordForm: FormGroup;

  roles: IKeyValueString[];
  selectedRole: IKeyValueString;

  statuses: IKeyValueString[];
  selectedStatus: IKeyValueString;

  constructor(
    private manageAccountService: ManageAccountService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private storage: LocalStorageService,
    private controllerService: ControllerService,
    private router: Router,
  ) {
    // General Information form
    this.generalInformationForm = this.formBuilder.group(generalInformationFormParams);

    // Set New Password form
    this.newPasswordForm = this.formBuilder.group(newPasswordFormParams);
  }

  ngOnInit() {
    this.populateControls();
    this.getAccountInformation();
  }

  populateControls() {
    const storageAccountJSON = this.storage.settings(ManageAccountPage.MANAGE_ACCOUNT_KEY).get;
    if (!storageAccountJSON) return;

    const storageAccountData = JSON.parse(storageAccountJSON);
    if (storageAccountData) {
      this.populateGeneralInformation(storageAccountData);
      this.populateDisabledControls(storageAccountData);
    }
  }

  populateGeneralInformation(accountData: IGeneralInformationModel) {
    ManageAccount.toForm(accountData, (property, value) =>
      this.generalInformationForm.controls[property].setValue(value));
  }

  populateDisabledControls(accountData: IGeneralInformationModel) {
    this.roles = Array.of({ role: accountData.role, value: 0 }) as [];
    this.selectedRole = this.roles[0];

    this.statuses = Array.of(accountData.status);
    this.selectedStatus = this.statuses[0];
  }

  getAccountInformation() {
    this.manageAccountService.apiGetInformation().subscribe(response => {
      ManageAccount.toForm(response, (property, value) => this.generalInformationForm.controls[property].setValue(value));

      this.populateDisabledControls(response);

      // Save Manage Account data to local storage
      this.storage.settings(ManageAccountPage.MANAGE_ACCOUNT_KEY).set(JSON.stringify(response));
    });
  }

  updateGeneralInformation() {
    if (!this.generalInformationForm.valid) {
      this.setFormErrors(this.generalInformationForm);

      return;
    }

    this.manageAccountService.apiUpdateInformation(this.generalInformationForm.value)
      .subscribe({
        next: () => {
          this.getAccountInformation();

          this.toast.show('General information successfully updated', 'success')
        },
        error: () => {
          this.toast.show('Error to update general information', 'error')
        }
      });
  }

  resetPassword() {
    this.setFormErrors(this.newPasswordForm);

    if (this.newPasswordForm.hasError('password')) {
      this.toast.show('Password cannot be empty', 'error');
      this.newPasswordForm.setErrors({ password: true });

      return;
    }

    const password = this.newPasswordForm.controls['password'].value;
    const passwordConfirm = this.newPasswordForm.controls['password_confirmation'].value;
    if (this.newPasswordForm.hasError('password_confirmation') || password !== passwordConfirm) {
      this.toast.show('Password mismatch', 'error');
      this.newPasswordForm.setErrors({ mismatch_password: true });

      return;
    }

    this.manageAccountService.apiSetNewPassword(this.newPasswordForm.value)
      .subscribe({
        next: () => {
          this.toast.show('Password successfully updated', 'success')
        },
        error: () => {
          this.toast.show('Error to update password', 'error')
        }
      });
  }

  isInvalidGeneralInfoFormControl(name: string) {
    return this.generalInformationForm.hasError(name);
  }

  isInvalidPasswordFormControl(name: string) {
    return this.newPasswordForm.hasError(name);
  }

  goToDefaultPage() {
    const defaultUrl = this.controllerService.getDefaultTabUrl();
    if (defaultUrl) this.router.navigate([defaultUrl]);
  }

  private setFormErrors(form: FormGroup) {
    form.setErrors(Object.keys(form.controls)
      .reduce((accum, key) => {
        accum[key] = !form.controls[key].valid;
        return accum;
      }, {} as IProperty<boolean>)
    );
  }

  static purge() {
    LocalStorageService.purge(ManageAccountPage.MANAGE_ACCOUNT_KEY);
  }
}
