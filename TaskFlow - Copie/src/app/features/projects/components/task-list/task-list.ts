import { Component, input } from '@angular/core';
import type { Task } from '../../models/task.model';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
}
