import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { IErrorsForm } from "src/app/interfaces/shared/errors-form.interface";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { IUser } from "../../../services/auth/models/authorization.interface";
import { ToastService } from "../../../services/toast.service";
import { ControllerService } from "../../../pages-view.controller/index-controller.service";

@Component({
  selector: "adm-login",
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponents implements OnInit {
  protected loading = false;

  errorMessage = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: LocalStorageService,
    private controllerService: ControllerService,
    private authService: AuthService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.store.cleanAll();
    this.auth.logOut();
  }

  errors(value: 'email' | 'password') {
    return this.form.get(value)?.errors as IErrorsForm
  }

  submit() {
    this.store.cleanAll();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.loading = true;

    this.authService.login(user).subscribe({
      next: (success) => {
        this.loading = false;
        const namespace = this.store.settings('namespace').get;
        if (success && namespace) {
          const namespaceName = this.controllerService.localNamespace;
          this.router.navigate([`/${namespaceName}/dashboard`]);
        }
      },
      error: (err) => {
        this.toast.show(err.message, 'error');
      },
      complete: () => {
        this.loading = false;
      },
    })
  }
}
