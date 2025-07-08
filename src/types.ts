export interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export interface ParsedTask {
  text: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
}