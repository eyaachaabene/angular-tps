import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Project } from '../../../projects/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { User } from '../../models/user.model';
import { UserCard } from '../user-card/user-card';

@Component({
  imports: [EmptyState, FormsModule, UserCard],
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);

  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal('');

  // Computed signal keeps name filtering in sync with users and the search term.
  filteredUsers = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    return this.users().filter((user) => user.name.toLocaleLowerCase().includes(search));
  });

  ngOnInit(): void {
    // Subscribe to both data sources to populate the user cards.
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }
}
