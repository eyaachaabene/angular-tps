import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  NgStyle,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import type { Project } from '../../models/project.model';
import type { TaskPriority } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';

@Component({
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    HighlightDirective,
    KeyValuePipe,
    NgStyle,
    PercentPipe,
    SlicePipe,
    TaskList,
    UpperCasePipe,
  ],
  standalone: true,
  selector: 'app-project-card',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  completionRate = computed(() => {
    const tasks = this.project().tasks;
    return tasks.length > 0 ? tasks.filter((task) => task.status === 'Terminé').length / tasks.length : 0;
  });

  averageCost = computed(() => this.project().budget / this.project().tasks.length);

  counts = computed<Record<TaskPriority, number>>(() => {
    const counts: Record<TaskPriority, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    for (const task of this.project().tasks) {
      counts[task.priority] += 1;
    }
    return counts;
  });

  get barColor(): string {
    const rate = this.completionRate();
    if (rate < 0.34) {
      return '#ef4444';
    }
    if (rate <= 0.66) {
      return '#f59e0b';
    }
    return '#22c55e';
  }

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
