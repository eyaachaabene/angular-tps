import { Directive, ElementRef, HostListener, Renderer2, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  appHighlight = input('#fef9c3');

  private originalBackground = '';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const element = this.elementRef.nativeElement;
    this.originalBackground = getComputedStyle(element).backgroundColor;
    this.renderer.setStyle(element, 'background-color', this.appHighlight());
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.originalBackground);
  }
}
