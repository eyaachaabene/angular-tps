import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewToggle, type ViewMode } from './shared/components/view-toggle/view-toggle';

@Component({
  imports: [ProjectList, UserList, ViewToggle],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  view = signal<ViewMode>('tasks');

  setView(view: ViewMode): void {
    this.view.set(view);
  }
}
