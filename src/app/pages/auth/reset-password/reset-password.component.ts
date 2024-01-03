import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IErrorsForm } from "src/app/interfaces/shared/errors-form.interface";
import { AuthService } from "src/app/services/auth/auth.service";
import { CustomValidators } from "./validator.custom";
import { NotificationService } from "@progress/kendo-angular-notification";
import { IConfirmPassword } from "../../../interfaces/auth/reset-password.interface";

type typeFields = 'email' | 'password' | 'password_confirmation'

@Component({
  selector: 'adm-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  protected token = '';
  protected email = '';
  errorMessage = '';
  public loading = false;
  protected minLength = 8;

  form = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength)
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength)
      ]),
    },
    [CustomValidators.MatchValidator('password', 'password_confirmation')]
  );


  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['token']) { this.token = params['token'] }
    })

    this.activateRoute.queryParams.subscribe(query => {
      if (query['email']) { this.email = query['email'] }
    })
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }


  errors(value: typeFields) {
    return this.form.get(value)?.errors as IErrorsForm
  }

  submit() {
    if (
      this.form.value
      && this.form.value.password
      && this.form.value.password_confirmation
    ) {
      const data: IConfirmPassword = {
        token: this.token,
        email: this.email,
        password: this.form.value['password'],
        password_confirmation: this.form.value['password_confirmation']
      }
      this.loading = true;
      this.authService.apiResetPassword(data).subscribe((res) => {
        this.show(res.status);
        this.router.navigate(['/auth/login']);
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    }
  }

  public show(content: string): void {
    this.notificationService.show({
      content,
      cssClass: "button-notification",
      animation: { type: "fade", duration: 400 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: "success", icon: true },
      width: 300,
    })
  }
}
