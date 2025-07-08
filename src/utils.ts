import type { ParsedTask } from './types';

export const parseNaturalLanguageInput = (input: string): ParsedTask[] => {
  const tasks: ParsedTask[] = [];
  
  // Split by common separators (commas, "and", "then", newlines)
  const segments = input.split(/[,\n]|(?:\s+and\s+)|(?:\s+then\s+)/).filter(s => s.trim());
  
  segments.forEach(segment => {
    const trimmed = segment.trim();
    if (!trimmed) return;
    
    // Extract priority keywords
    let priority: 'high' | 'medium' | 'low' = 'medium';
    if (/urgent|important|asap|紧急|重要/.test(trimmed.toLowerCase())) {
      priority = 'high';
    } else if (/low|later|sometime|不急|稍后/.test(trimmed.toLowerCase())) {
      priority = 'low';
    }
    
    // Extract time patterns
    let dueDate: Date | undefined;
    const timePatterns = [
      /今天|today/i,
      /明天|tomorrow/i,
      /(\d{1,2})[点时]|(\d{1,2}):(\d{2})|(\d{1,2})\s*(am|pm)/i,
      /下午|afternoon|上午|morning|晚上|evening/i
    ];
    
    timePatterns.forEach(pattern => {
      const match = trimmed.match(pattern);
      if (match) {
        const now = new Date();
        if (/今天|today/i.test(match[0])) {
          dueDate = now;
        } else if (/明天|tomorrow/i.test(match[0])) {
          dueDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        } else if (/下午|afternoon/i.test(match[0])) {
          dueDate = new Date(now.setHours(14, 0, 0, 0));
        } else if (/上午|morning/i.test(match[0])) {
          dueDate = new Date(now.setHours(9, 0, 0, 0));
        } else if (/晚上|evening/i.test(match[0])) {
          dueDate = new Date(now.setHours(19, 0, 0, 0));
        }
      }
    });
    
    // Clean up text by removing time and priority keywords
    const cleanText = trimmed
      .replace(/urgent|important|asap|紧急|重要|low|later|sometime|不急|稍后/gi, '')
      .replace(/今天|tomorrow|明天|下午|afternoon|上午|morning|晚上|evening/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanText) {
      tasks.push({
        text: cleanText,
        priority,
        dueDate
      });
    }
  });
  
  return tasks;
};