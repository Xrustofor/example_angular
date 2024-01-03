import {
    Type,
    Injector,
    Injectable,
    ComponentRef,
    ApplicationRef,
    EmbeddedViewRef,
    ComponentFactoryResolver,
    EventEmitter,
} from '@angular/core';
import { CustomModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalContainer: HTMLElement | null;
    private modals: ComponentRef<CustomModalComponent>[] = [];

    public params?: IModalParams;
    onClosing = new EventEmitter();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        setTimeout(() => this.modalContainer = document.getElementById('content'), 100);
    }

    openModal(componentType: Type<any>, params?: IModalParams) {
        if (!this.modalContainer) return;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomModalComponent);
        const modal = componentFactory.create(this.injector);
        modal.instance.content = componentType;
        modal.instance.params = params;
        modal.instance.onClose.subscribe(() => {
            this.onClosing.emit();
            this.closeModal();
        });

        this.appRef.attachView(modal.hostView);
        this.modalContainer.style.position = 'relative';
        this.modalContainer.appendChild((modal.hostView as EmbeddedViewRef<any>).rootNodes[0]);

        this.params = params;

        this.modals.push(modal);
    }

    closeModal() {
        if (!this.modalContainer) return;

        this.modals.forEach(modal => modal.destroy());

        this.modalContainer.querySelectorAll('.custom-modal')
            .forEach(element => element.remove());
    }
}

export interface IModalParams {
    name?: string,
    data: any
}