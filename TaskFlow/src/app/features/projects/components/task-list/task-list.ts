import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import type { Task } from '../../models/task.model';
import { UserService } from '../../../../core/services/user.service';
import type { User } from '../../../users/models/user.model';

@Component({
  imports: [TaskItem],
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  tasks = input.required<Task[]>();
  showAssignee = input(true);

  private readonly userService = inject(UserService);

  users = signal<User[]>([]);

  assigneeNameOf(task: Task): string {
    return this.users().find((user) => user.id === task.assigneeId)?.name ?? 'Non assignée';
  }

  ngOnInit(): void {
    // Subscribe to load the users used by the assignee lookup.
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
