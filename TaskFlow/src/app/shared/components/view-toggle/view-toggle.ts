import { Component, input, output } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  standalone: true,
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  // Input signal for the active view.
  view = input.required<ViewMode>();
  // Output event for view changes.
  viewChange = output<ViewMode>();
}
