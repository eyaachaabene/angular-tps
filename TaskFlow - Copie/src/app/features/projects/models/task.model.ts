export type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';
export type Status = 'En attente' | 'En cours' | 'Terminé';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: Status;
}
