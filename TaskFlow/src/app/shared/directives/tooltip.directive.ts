import { Directive, ElementRef, HostListener, Renderer2, input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input('');

  private tooltipElement: HTMLElement | null = null;
  private originalPosition = '';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipElement) {
      return;
    }

    const host = this.elementRef.nativeElement;
    this.originalPosition = host.style.position;
    this.renderer.setStyle(host, 'position', 'relative');

    const tooltip = this.renderer.createElement('span') as HTMLSpanElement;
    const text = this.renderer.createText(this.appTooltip());
    this.renderer.setAttribute(
      tooltip,
      'class',
      'absolute left-0 top-full z-10 mt-1 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow',
    );
    this.renderer.appendChild(tooltip, text);
    this.renderer.appendChild(host, tooltip);
    this.tooltipElement = tooltip;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (!this.tooltipElement) {
      return;
    }

    const host = this.elementRef.nativeElement;
    this.renderer.removeChild(host, this.tooltipElement);
    if (this.originalPosition) {
      this.renderer.setStyle(host, 'position', this.originalPosition);
    } else {
      this.renderer.removeStyle(host, 'position');
    }
    this.tooltipElement = null;
  }
}
