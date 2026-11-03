export type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';
export type Status = 'En attente' | 'En cours' | 'Terminé';
export type TaskStatus = Status;
export type TaskFilter = 'Toutes' | 'En cours' | 'Terminé';

export interface TaskStatusChange {
  projectId: number;
  taskId: number;
  newStatus: TaskStatus;
}

export interface TaskDelete {
  projectId: number;
  taskId: number;
}

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: Status;
  assigneeId?: number;
  dueDate?: string;
  description?: string;
}
