import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
  standalone: true,
})
export class DeadlinePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return 'Pas d’échéance';
    }

    const [year, month, day] = value.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.round((dueDate.getTime() - today.getTime()) / 86_400_000);

    if (days === 0) {
      return 'Aujourd’hui';
    }
    if (days === 1) {
      return 'Demain';
    }
    if (days > 1) {
      return `Dans ${days} jours`;
    }
    return `En retard de ${Math.abs(days)} jour${days === -1 ? '' : 's'}`;
  }
}
