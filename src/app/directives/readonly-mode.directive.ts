import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SpectatorService } from '../services/view-as/spectator.service';

/**
 * Directive that disables interaction with elements by reducing their opacity,
 * disabling user selection, and disabling pointer events based on the readonly mode setting.
 * It is applied to elements using the attribute selector '[disabledForReadonlyMode]'.
 */
@Directive({
    selector: '[disabledForReadonlyMode]',
})
export class ReadonlyModeDirective implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private spectatorService: SpectatorService,
    ) { }

    ngOnInit() {
        this.spectatorService.spectator$.subscribe(spectator => {
            if (spectator) {
                this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '0.7');
                this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'none');
                this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
            }
            else {
                this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', null);
                this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', null);
                this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', null);
            }
        });
    }
}
