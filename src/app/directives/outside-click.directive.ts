import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Directive to detect clicks outside of the element.
 * Emits an event when a click occurs outside of the element.
 *
 * Usage:
 * ```html
 * <div outsideClick (onOutsideClick)="handleOutsideClick()">...</div>
 * ```
 *
 * @output onOutsideClick - Event emitted when a click occurs outside of the element.
 */
@Directive({
    selector: '[outsideClick]'
})
export class OutsideClickDirective {
    @Output() onOutsideClick: EventEmitter<any> = new EventEmitter();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    onClick(target: any): void {
        const clickedInside = this.elementRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.onOutsideClick.emit();
        }
    }
}