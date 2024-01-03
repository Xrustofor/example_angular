import { Component, OnInit } from "@angular/core";
import { iconsSVG } from "../../../../assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons/dist/svg-icon.interface";
import {
  IManageCodes,
  IMediaChannel, ICode,
  ITargetAudience
} from "../../../services/manage-codes/manage-codes.interface";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "../../../services/toast.service";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";
import { ManageCodesService } from "src/app/services/manage-codes/manage-codes.service";

export interface ISelected {
  title: string,
  code: string,
  key: string,
  name: string,
  index: number,
  id?: string,
}

export interface ICheckbox {
  value: string,
  id: number,
  items: {
    id: number,
    value: string,
    checkbox: boolean,
  }[]
}

@Component({
  selector: "adm-manage-codes",
  templateUrl: 'manage-codes.page.html',
  styleUrls: ['manage-codes.page.scss'],
})
export class ManageCodesPage implements OnInit {

  public TYPE_FIELD: IPropertyString = {
    'media_channel': 'Media Channel',
    'target_audience': 'Target Audience',
    'media_codes': 'Media Plan Code Format',
    'io_codes': 'Insertion Order Code Format'
  }

  public form: FormGroup;
  public showDialog: boolean = false;
  public selected: ISelected | null = null;

  public dataLevel: { id: number, value: string }[] = [
    { id: 0, value: 'Agency' },
    { id: 1, value: 'Client' },
    { id: 2, value: 'Year' },
    { id: 3, value: 'Campaign' },
    { id: 4, value: 'Media Channel' },
    { id: 5, value: 'Target Audience' },
    { id: 6, value: 'Media Plan' },
    { id: 7, value: 'Insertion Order' },
    { id: 8, value: 'Media Outlet' },
    { id: 9, value: 'Placement' }
  ]

  get media_channel(): FormArray {
    return this.form.get('media_channel') as FormArray;
  }
  get target_audience(): FormArray {
    return this.form.get('target_audience') as FormArray;
  }
  get media_codes(): FormArray {
    return this.form.get('media_codes') as FormArray;
  }
  get io_codes(): FormArray {
    return this.form.get('io_codes') as FormArray;
  }

  constructor(
    private manageCodesService: ManageCodesService,
    protected toastService: ToastService
  ) {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      media_channel: new FormArray([]),
      target_audience: new FormArray([]),
      media_codes: new FormArray([]),
      io_codes: new FormArray([]),
    });
  }

  ngOnInit() {
    this.getManageCodesData();
  }

  getManageCodesData() {
    this.manageCodesService.apiGetManageCodes().subscribe({
      next: (res: IManageCodes) => {
        if (Array.isArray(
          res.media_channel
          && res.media_channel
          && res.media_codes
          && res.io_codes
        )) {
          this.toFormGroup(
            res.media_channel,
            res.target_audience,
            res.media_codes,
            res.io_codes,
          )
        }
      }
    })
  }

  toFormGroup(
    mediaChannels: IMediaChannel[],
    targetAudiences: ITargetAudience[],
    mediaCodes: ICode[],
    ioCodes: ICode[]
  ) {
    mediaChannels.forEach((mediaChannel: IMediaChannel): void => {
      this.addFormGroup('media_channel', mediaChannel.name, mediaChannel.code, mediaChannel.id);
    });
    targetAudiences.forEach((targetAudience: ITargetAudience): void => {
      this.addFormGroup('target_audience', targetAudience.name, targetAudience.code, targetAudience.id);
    });
    mediaCodes.forEach((mediaCode: ICode): void => {
      (this.form.get('media_codes') as FormArray).push(new FormGroup({
        code: new FormControl(mediaCode.code, Validators.required),
        id: new FormControl(mediaCode.id, Validators.required),
        active: new FormControl(mediaCode.active),
      }))
    });
    ioCodes.forEach((ioCode: ICode): void => {
      (this.form.get('io_codes') as FormArray).push(new FormGroup({
        code: new FormControl(ioCode.code, Validators.required),
        id: new FormControl(ioCode.id, Validators.required),
        active: new FormControl(ioCode.active),
      }))
    })
  }

  addFormGroup(
    key: string,
    name: string = '',
    code: string = '',
    index: string
  ): void {
    const formControl = {
      name: new FormControl(name, Validators.required),
      code: new FormControl(code, Validators.required),
    };

    (this.form.get(key) as FormArray).push(new FormGroup({
      ...formControl,
      id: new FormControl(index, Validators.required),
    }))
  }
  addNew(key: string = '') {
    if (!this.form.get(key)) { return }
    (this.form.get(key) as FormArray).insert(0, new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
    }, { updateOn: 'change' }))
  }

  deleteField(controlName: string, index: number = 0) {
    if (!controlName && !index) { return }
    if (!this.form.get(controlName)) { return }

    const control = (this.form.get(controlName) as FormArray).at(index);
    if (!control) { return }

    const { name, code } = control.value;
    if (name === '' || code === '') {
      (this.form.get(controlName) as FormArray).removeAt(index)
      return;
    }

    this.selected = {
      title: this.TYPE_FIELD[controlName] || '',
      key: controlName,
      ...control.value,
      index,
    }
    this.showDialog = true;
  }

  deleteItem() {
    if (this.selected === null) { return }
    if (!Object.keys(this.selected).length) { return }

    const { key, id } = this.selected;
    const payload: { type: string, id: string } = {
      type: key || '',
      id: id || ''
    };

    this.manageCodesService.apiDeleteManageCodes(payload).subscribe({
      next: (response) => {
        if (this.selected) {
          (this.form.get(this.selected.key as string) as FormArray).removeAt(this.selected.index);
        }
        this.resetSelectedData();
        this.toastService.show(response.message, 'success');
      },
      error: () => {
        this.resetSelectedData();
      },
      complete: () => {
        this.resetSelectedData();
      }
    });
  }

  resetSelectedData() {
    this.showDialog = false;
    this.selected = null
  }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.toastService.show('Some fields are not filled. Please fill them out', "warning");
      return;
    }
    const data = this.form.value;
    this.manageCodesService.apiPostManageCodes(data).subscribe({
      next: (response) => {
        this.toastService.show(response.message, "success");
      },
    })
  }

  reset() {
    this.form = this.initForm();
    this.getManageCodesData();
  }
}
