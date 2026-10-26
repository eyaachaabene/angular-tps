import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import type { Task } from '../../models/task.model';

@Component({
  imports: [DatePipe, DeadlinePipe, HighlightDirective, NgClass, OverdueDirective, TooltipDirective, TruncatePipe],
  standalone: true,
  selector: 'app-task-item',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input<string>('Non assignée');
}
