import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import type { Task, TaskDelete, TaskStatus, TaskStatusChange } from '../../models/task.model';

@Component({
  imports: [DatePipe, DeadlinePipe, HighlightDirective, NgClass, NgStyle, OverdueDirective, TooltipDirective, TruncatePipe],
  standalone: true,
  selector: 'app-task-item',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input<string>('Non assignée');
  editable = input(true);
  projectId = input<number>();
  taskStatusChange = output<TaskStatusChange>();
  taskDelete = output<TaskDelete>();

  deadlineColor = computed(() => {
    const task = this.task();
    if (task.status === 'Terminé' || !task.dueDate) {
      return '#22c55e';
    }

    const [year, month, day] = task.dueDate.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilDue = Math.round((dueDate.getTime() - today.getTime()) / 86_400_000);

    if (daysUntilDue < 0) {
      return '#ef4444';
    }
    if (daysUntilDue <= 3) {
      return '#f59e0b';
    }
    return '#22c55e';
  });

  nextStatus(): TaskStatus {
    switch (this.task().status) {
      case 'En attente':
        return 'En cours';
      case 'En cours':
        return 'Terminé';
      case 'Terminé':
        return 'En attente';
    }
  }

  changeStatus(): void {
    const projectId = this.projectId();
    if (projectId === undefined) {
      throw new Error('TaskItem requires a projectId to change task status.');
    }

    this.taskStatusChange.emit({
      projectId,
      taskId: this.task().id,
      newStatus: this.nextStatus(),
    });
  }

  deleteTask(): void {
    const projectId = this.projectId();
    if (projectId === undefined) {
      throw new Error('TaskItem requires a projectId to delete a task.');
    }

    this.taskDelete.emit({
      projectId,
      taskId: this.task().id,
    });
  }
}
