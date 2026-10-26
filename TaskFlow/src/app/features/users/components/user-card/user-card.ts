import { Component, computed, input } from '@angular/core';
import type { Project } from '../../../projects/models/project.model';
import type { Task } from '../../../projects/models/task.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { User } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  imports: [EmptyState, UserProjectGroup],
  standalone: true,
  selector: 'app-user-card',
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  // Computed values derive this user's task groups and status counters.
  groups = computed(() =>
    this.projects()
      .map((project) => ({
        project,
        tasks: project.tasks.filter((task) => task.assigneeId === this.user().id),
      }))
      .filter((group) => group.tasks.length > 0),
  );

  waitingCount = computed(() => this.countTasks('En attente'));
  inProgressCount = computed(() => this.countTasks('En cours'));
  completedCount = computed(() => this.countTasks('Terminé'));

  private countTasks(status: Task['status']): number {
    return this.groups().reduce(
      (total, group) => total + group.tasks.filter((task) => task.status === status).length,
      0,
    );
  }
}
