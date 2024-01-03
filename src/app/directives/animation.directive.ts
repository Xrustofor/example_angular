import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Directive that adds 'show', 'showAnimation', 'hide', and 'hideAnimation' classes to any component or element
 * to enable animating their appearance or disappearance.
 * This directive allows for smooth transitions, such as fading in or fading out, by adding specific classes to the component.
 * It is applied to components or elements using the attribute selector '[animateComponent]'.
 * 
 * @Input animationShowTransitionMS: The duration in milliseconds for the show animation.
 * @Input animationHideTransitionMS: The duration in milliseconds for the hide animation.
 * 
 * @Input animateToggle: Determines whether to show or hide the component based on the specified condition.
 * If true, the show animation classes will be added; if false, the hide animation classes will be added.
 */
@Directive({
    selector: '[animate]'
})
export class AnimationDirective {
    private loadingTimeout!: ReturnType<typeof setTimeout>;

    isLoading = false;
    showAnimation = false;
    hideAnimation = false;

    @Input() animationShowTransitionMS = 500;
    @Input() animationHideTransitionMS = 500;

    @Input() set animateToggle(value: boolean | null) {
        if (value === null) return;

        if (value) {
            this.startAnimation();

            this.loadingTimeout =
                setTimeout(() => this.start(), this.animationShowTransitionMS);
        }
        else {
            clearTimeout(this.loadingTimeout);

            if (!this.isLoading && !this.showAnimation) return;

            this.endAnimation();

            setTimeout(() => this.end(), this.animationHideTransitionMS);
        }
    }

    private start() {
        this.showAnimation = false;
        this.hideAnimation = false;
        this.isLoading = true;

        this.renderer.addClass(this.elementRef.nativeElement, 'show');
        this.renderer.removeClass(this.elementRef.nativeElement, 'showAnimation');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hide');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hideAnimation');
    }

    private startAnimation() {
        this.showAnimation = true;
        this.hideAnimation = false;
        this.isLoading = false;

        this.renderer.removeClass(this.elementRef.nativeElement, 'show');
        this.renderer.addClass(this.elementRef.nativeElement, 'showAnimation');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hide');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hideAnimation');
    }

    private end() {
        this.showAnimation = false;
        this.hideAnimation = false;
        this.isLoading = false;

        this.renderer.removeClass(this.elementRef.nativeElement, 'show');
        this.renderer.removeClass(this.elementRef.nativeElement, 'showAnimation');
        this.renderer.addClass(this.elementRef.nativeElement, 'hide');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hideAnimation');
    }

    private endAnimation() {
        this.showAnimation = false;
        this.hideAnimation = true;
        this.isLoading = true;

        this.renderer.removeClass(this.elementRef.nativeElement, 'show');
        this.renderer.removeClass(this.elementRef.nativeElement, 'showAnimation');
        this.renderer.removeClass(this.elementRef.nativeElement, 'hide');
        this.renderer.addClass(this.elementRef.nativeElement, 'hideAnimation');
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) { }
}