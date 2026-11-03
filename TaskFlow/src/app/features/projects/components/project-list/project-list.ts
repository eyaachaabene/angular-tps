import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Project } from '../../models/project.model';
import type { TaskDelete, TaskFilter, TaskStatusChange } from '../../models/task.model';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ProjectCard } from '../project-card/project-card';

@Component({
  imports: [EmptyState, FormsModule, NgClass, ProjectCard],
  standalone: true,
  selector: 'app-project-list',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');
  taskFilter = signal<TaskFilter>('Toutes');
  filters: TaskFilter[] = ['Toutes', 'En cours', 'Terminé'];
  filteredProjects = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    return this.projects().filter((project) =>
      project.name.toLocaleLowerCase().includes(search),
    );
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    console.log(project);
  }

  onTaskStatusChange(change: TaskStatusChange): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== change.projectId
          ? project
          : {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === change.taskId ? { ...task, status: change.newStatus } : task
              ),
            }
      )
    );
  }

  onTaskDelete(change: TaskDelete): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== change.projectId
          ? project
          : { ...project, tasks: project.tasks.filter(task => task.id !== change.taskId) }
      )
    );
  }
}
