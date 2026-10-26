import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Project } from '../../models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ProjectCard } from '../project-card/project-card';

@Component({
  imports: [EmptyState, FormsModule, ProjectCard],
  standalone: true,
  selector: 'app-project-list',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');
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
}
