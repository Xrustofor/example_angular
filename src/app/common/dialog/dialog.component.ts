import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'adm-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class CustomDialogComponent {
  @Input() loading = false;
  @Input() width: number = 500;
  @Output() onClose = new EventEmitter<boolean>();

  @Input() opened: boolean;

  close() {
    this.opened = false;
    setTimeout(() => this.onClose.emit(false), 200);
  }
}
