import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPropertyString } from "src/app/interfaces/global/global.interfaces";

@Component({
  selector: 'adm-combobox',
  templateUrl: 'combobox.component.html',
  styleUrls: ['combobox.component.scss'],
})
export class ComboboxComponent implements OnInit {
  @Input() loading = false;
  @Input() width = 300;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() items: any[];
  @Input() item: any;
  @Input() textField = '';
  @Input() valueField = '';
  @Input() disabled = false;
  @Input() valuePrimitive = false;
  @Input() valid: boolean | null = null

  @Output() select = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();

  public classIcon = 'down-arrow'

  ngOnInit() { }

  opened() { this.classIcon = 'up-arrow' }
  closed() { this.classIcon = 'down-arrow' };

  get isValid(): string {
    if (this.valid !== null) {
      return this.valid ? 'success' : 'error'
    }
    return ''

  }
}
