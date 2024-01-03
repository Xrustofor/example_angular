import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../../services/auth/auth.service";

import { Router } from "@angular/router";
import { IErrorsForm } from "src/app/interfaces/shared/errors-form.interface";
import { NotificationService } from "@progress/kendo-angular-notification";

@Component({
  selector: "adm-forgot-password",
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit{
  errorMessage = '';
  protected loading = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('admin@dev.com', [
      Validators.email,
      Validators.required
    ]),
  })
  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    title.setTitle('forgot password')
  }
  ngOnInit() {
  }

  errors(value: 'email' | 'password') {
    return this.form.get(value)?.errors as IErrorsForm
  }

  submit(){
    this.errorMessage = '';
    if(this.form.invalid){ return }
    const formData = new FormData()
    formData.append('email', this.form.value.email);
    this.loading = true;
    this.authService.apiSendEmail(formData).subscribe( res => {
      this.loading = false;
      this.show(res.status);
    }, error => {
      this.loading = false;
      this.errorMessage = error.error.message
    })
  }
  public show(content: string): void {
    this.notificationService.show({
      content,
      cssClass: "button-notification",
      animation: { type: "fade", duration: 400 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: "success" , icon: true },
    })
  }
}
