import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IModalParams } from './modal.controller';

@Component({
    selector: 'adm-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class CustomModalComponent {
    @Input() content: any;
    @Input() params?: IModalParams;
    @Output() onClose = new EventEmitter();

    canClose = false;
    isShow = true;

    close() {
        if (!this.canClose) {
            this.canClose = true;
            return;
        }

        this.isShow = false;

        setTimeout(() => {
            this.onClose.emit();
        }, 200);
    }
}