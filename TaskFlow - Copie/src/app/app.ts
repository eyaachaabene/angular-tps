import { Component } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';

@Component({
  imports: [ProjectList],
  selector: 'app-root',
  template: '<app-project-list />',
})
export class App {
}
