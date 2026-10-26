import { NgClass, NgStyle, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import type { Project } from '../../../projects/models/project.model';
import type { Task } from '../../../projects/models/task.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { User, UserRole } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  imports: [EmptyState, HighlightDirective, InitialsPipe, LowerCasePipe, NgClass, NgStyle, TitleCasePipe, UserProjectGroup],
  standalone: true,
  selector: 'app-user-card',
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  roleColors: Record<UserRole, string> = {
    'Développeur': '#2563eb',
    'Designer': '#9333ea',
    'Chef de projet': '#059669',
    'Testeur': '#d97706',
  };

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
