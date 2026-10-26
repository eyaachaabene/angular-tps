import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
})
export class EmptyState {
  message = input('Aucun projet trouvé.');
}
