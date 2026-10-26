import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
})
export class OverdueDirective {
  @Input('appOverdue') dueDate?: string;
  @Input() done = false;

  @HostBinding('class')
  get hostClass(): string {
    if (this.done || !this.dueDate) {
      return '';
    }

    const [year, month, day] = this.dueDate.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dueDate < today ? 'border-red-500 bg-red-50' : '';
  }
}
