import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { IKeyValueString } from "src/app/interfaces/global/global.interfaces";
import { ViewAsService } from "src/app/services/view-as/view-as.service";
import { Component, OnInit } from "@angular/core";
import { IDemonstrateUserResponse, SpectatorService } from "src/app/services/view-as/spectator.service";

@Component({
  selector: "adm-view-as",
  templateUrl: 'view-as.page.html',
  styleUrls: ['view-as.page.scss'],
})
export class ViewAsPage implements OnInit {
  isAnimateShowDisplay = false;
  isAnimateHideDisplay = false;

  viewAsForm: FormGroup;

  companyTypes: IKeyValueString[];
  companies: IKeyValueString[];
  userList: IKeyValueString[];

  get canClickDemonstrateButton(): boolean {
    return this.viewAsForm.valid;
  }

  isDemonstrateClicked = false;

  constructor(
    private viewAsService: ViewAsService,
    private spectatorService: SpectatorService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.viewAsForm = this.formBuilder.group({
      viewAs: ['', [Validators.required]],
      role: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });

    this.isAnimateShowDisplay = this.route.snapshot.queryParams['animate'] === 'true';
  }

  ngOnInit(): void {
    this.getViewAs();
  }

  getViewAs() {
    this.viewAsService.apiGetCompanyTypes().subscribe((data: { roles: IKeyValueString[] }) => {
      this.companyTypes = data.roles;
    })
  }

  activateSpectatorMode() {
    if (!this.canClickDemonstrateButton || !this.viewAsForm.valid) return;

    this.isAnimateHideDisplay = true;

    this.viewAsService.apiSpectrate(this.viewAsForm.value.user).subscribe({
      next: (spectator: IDemonstrateUserResponse) => {
        const currentUser = this.localStorageService.getCurrentUserAuthentication()
        this.spectatorService.saveCurrentUserCredentials(currentUser);
        this.spectatorService.updateCurrentUserToSpectator(spectator);

        this.spectatorService.showBanner();

        this.router.navigate([spectator.redirect]);
      }
    });
  }

  onChangeCompanyType() {
    this.companies = [];
    this.userList = [];
    this.viewAsForm.patchValue({ role: null })
    this.viewAsForm.patchValue({ user: null })

    this.viewAsService.apiGetCompanyByType(this.viewAsForm.value.viewAs).subscribe((response: IKeyValueString[]) => {
      if (!response.length) return;

      this.companies = response;
    });
  }

  onChangeCompany() {
    this.userList = [];
    this.viewAsForm.patchValue({ user: null })

    if (!this.viewAsForm.value.viewAs) return;

    this.viewAsService.apiGetUsersByCompany(this.viewAsForm.value.viewAs, this.viewAsForm.value.role).subscribe((response: IKeyValueString[]) => {
      if (!response.length) return;

      this.userList = response;
    });
  }
}