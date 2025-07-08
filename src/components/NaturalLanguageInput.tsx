import React, { useState } from 'react';
import { parseNaturalLanguageInput } from '../utils';
import type { ParsedTask } from '../types';

interface NaturalLanguageInputProps {
  onTasksExtracted: (tasks: ParsedTask[]) => void;
}

const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({ onTasksExtracted }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);
    
    try {
      const tasks = parseNaturalLanguageInput(input);
      onTasksExtracted(tasks);
      setInput('');
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="natural-input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="告诉我你的计划... 例如：今天下午2点开会，明天买牛奶，紧急处理文件"
            className="natural-input"
            rows={3}
            disabled={isProcessing}
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isProcessing || !input.trim()}
          >
            {isProcessing ? '解析中...' : '添加任务'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NaturalLanguageInput;