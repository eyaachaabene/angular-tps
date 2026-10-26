import type { User } from '../models/user.model';

export const USERS: User[] = [
  { id: 1, name: 'Amira Ben Salah', email: 'amira@taskflow.tn', role: 'Développeur', active: true },
  { id: 2, name: 'Sarra Trabelsi', email: 'sarra@taskflow.tn', role: 'Designer', active: false },
  { id: 3, name: 'Yassine Gharbi', email: 'yassine@taskflow.tn', role: 'Testeur', active: true },
  { id: 4, name: 'Karim Mansour', email: 'karim@taskflow.tn', role: 'Chef de projet', active: true },
];
