import { Component, input, output } from '@angular/core';
import type { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  imports: [TaskList],
  standalone: true,
  selector: 'app-project-card',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
