import { useState } from 'react'
import './App.css'
import NaturalLanguageInput from './components/NaturalLanguageInput'
import TaskList from './components/TaskList'
import type { Task, ParsedTask } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleTasksExtracted = (parsedTasks: ParsedTask[]) => {
    const newTasks: Task[] = parsedTasks.map(parsed => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: parsed.text,
      priority: parsed.priority,
      completed: false,
      createdAt: new Date(),
      dueDate: parsed.dueDate
    }))
    
    setTasks(prev => [...prev, ...newTasks])
  }

  const handleToggleComplete = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 AI 待办助手</h1>
        <p>智能解析你的计划，让待办管理更简单</p>
      </header>
      
      <main className="app-main">
        <NaturalLanguageInput onTasksExtracted={handleTasksExtracted} />
        <TaskList 
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
