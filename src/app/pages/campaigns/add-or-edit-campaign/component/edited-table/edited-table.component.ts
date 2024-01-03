import { Component, forwardRef, Provider, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from "@progress/kendo-angular-grid";
import { SVGIcon } from "@progress/kendo-svg-icons";
import { iconsSVG } from "../../../../../../assets/icons/svg-icons";
import { STATUS_COLOR } from "../../../../../constants/statuses";
import { IPropertyString } from "../../../../../interfaces/global/global.interfaces";

import { IApiAMediaPlan } from "../../../../../services/campaign/campaign.interface";
import { ToastService } from "../../../../../services/toast.service";
import { IMediaPlan } from "./interface";
import { MASK_CURRENCY } from "../../../../../constants/masks"
const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditedTableComponent),
  multi: true
}

@Component({
  selector: 'adm-campaign-edited-table',
  styleUrls: ['edited-table.component.scss'],
  templateUrl: 'edited-table.component.html',
  providers: [VALUE_ACCESSOR],
})

export class EditedTableComponent implements ControlValueAccessor {
  @Input() options: IApiAMediaPlan;
  @Input() data: IMediaPlan[] = [];
  @Input() campaignPlanId: IPropertyString = {};
  @Input() externalRequiredFields = true
  @Output() actionCreateRow: EventEmitter<any> = new EventEmitter<void>();
  onChange: any = () => { }
  public formGroup: FormGroup | undefined;
  private editedRowIndex: number | undefined;
  public statusColor = STATUS_COLOR;

  public showTableDialog: boolean = false;
  public selectedRowIndex: number | null = null;
  public items: IMediaPlan[] = [];
  constructor(
    private toast: ToastService
  ) { }

  ngOnInit(): void { }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);
    this.formGroup = createFormGroup({
      actualized_amount: null,
      media_channel: null,
      audience_segment: null,
      budget: null,
      purchased_amount: null,
      status: this.options.statuses[0],
      uuid: null,
    });
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);
    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
    this.onChange(this.data);
    this.formGroup.valueChanges.subscribe(this.callbackForm.bind(this))
  }

  public callbackForm = this.getMediaPlanId

  public cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  get invalid(): boolean {
    return this.formGroup?.invalid ? this.formGroup.invalid : false
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    if (this.formGroup?.invalid) {
      this.formGroup.markAllAsTouched();
      this.toast.show('Not all fields are filled. Please fill them out.', "warning")
      return;
    }
    const item: IMediaPlan = formGroup.value as IMediaPlan;
    if (isNew) {
      this.data.splice(0, 0, item);
    } else {
      Object.assign(this.data[rowIndex], item);
    }
    sender.closeRow(rowIndex);
    this.onChange(this.data);
  }

  public removeHandler({ rowIndex }: RemoveEvent): void {
    this.showTableDialog = true;
    this.selectedRowIndex = rowIndex;
  }

  deleteRow() {
    if (typeof this.selectedRowIndex !== 'number') { return }
    this.data = this.data.filter((item: IMediaPlan, index: number) => index !== this.selectedRowIndex);
    this.showTableDialog = false;
    this.onChange(this.data);
  }
  closeTableDialog() {
    this.selectedRowIndex = null;
    this.showTableDialog = false
  }

  getStatusColor(statusName: string) {
    return this.statusColor[statusName.toLowerCase()]
  }

  getMediaPlanId(item: IMediaPlan) {
    let data = {
      ...this.campaignPlanId
    }
    const media_channel_key = item['media_channel']?.key;
    const audience_segment_key = item['audience_segment']?.key;
    const media_channel_code = this.options.channels.find(el => el.key === media_channel_key)?.code;
    const audience_segment_code = this.options.audience_segments.find(el => el.key === audience_segment_key)?.code;
    if (media_channel_code) {
      data['media_channel_code'] = media_channel_code as string
    }
    if (audience_segment_code) {
      data['audience_segment_code'] = audience_segment_code as string
    }
    return data
  }

  get addNewIcon(): SVGIcon | undefined { return this.getIcon('addNew') }
  get saveIcon(): SVGIcon | undefined { return this.getIcon('save') }
  get editIcon(): SVGIcon | undefined { return this.getIcon('edit') }
  get trashIcon(): SVGIcon | undefined { return this.getIcon('trash') }
  get roundCancelIcon(): SVGIcon | undefined { return this.getIcon('roundCancel') }
  get roundSuccessIcon(): SVGIcon | undefined { return this.getIcon('roundSuccess') }
  getIcon(name: string) {
    if (!name) { return }
    const candidate: string | undefined = Object.keys(iconsSVG).find(key => key === name);
    if (!candidate) { return }
    return iconsSVG[candidate] as SVGIcon;
  }

  addZeroBlur(item: FormGroup, key: string) {
    const value = item.get(key)?.value;
    item.get(key)?.setValue(value);
  }

  registerOnChange(fn: any): void { this.onChange = fn }
  registerOnTouched(fn: any): void { }
  writeValue(items: []): void { this.data = items }

  get MASK_CURRENCY() {
    return MASK_CURRENCY;
  }

  public customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]') } };

}

const createFormGroup = (item: IMediaPlan) => new FormGroup({
  actualized_amount: new FormControl(item.actualized_amount),
  media_channel: new FormControl(item.media_channel, Validators.required),
  audience_segment: new FormControl(item.audience_segment, Validators.required),
  budget: new FormControl(item.budget, Validators.required),
  purchased_amount: new FormControl(item.purchased_amount),
  status: new FormControl(item.status, Validators.required),
  uuid: new FormControl(item.uuid),
});
