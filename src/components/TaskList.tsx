import React from 'react';
import type { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Sort by priority and due date
  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      // Priority order: high > medium > low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      // Then by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      
      // Finally by creation date
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  };

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">待办任务 ({pendingTasks.length})</h3>
          {sortTasks(pendingTasks).map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">已完成 ({completedTasks.length})</h3>
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div className="empty-text">
            还没有任务，开始添加你的第一个待办事项吧！
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;