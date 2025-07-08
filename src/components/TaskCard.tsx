import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa726';
      case 'low': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (taskDate.getTime() === today.getTime()) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (taskDate.getTime() === today.getTime() + 24 * 60 * 60 * 1000) {
      return `明天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleString('zh-CN', { 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div 
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          />
          <span className="priority-text">{task.priority}</span>
        </div>
        
        <div className="task-text">
          {task.text}
        </div>
        
        {task.dueDate && (
          <div className="task-due-date">
            📅 {formatDate(task.dueDate)}
          </div>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          className="action-btn complete-btn"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? '↩️' : '✅'}
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;