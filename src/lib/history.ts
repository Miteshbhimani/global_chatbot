
import type { ChatSession } from './types';

const HISTORY_STORAGE_KEY = 'chat_history';

export function getChatHistory(): ChatSession[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const historyJson = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson) as ChatSession[];
    // Sort by date, newest first
    return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading chat history from localStorage:', error);
    return [];
  }
}

export function saveChatSession(session: ChatSession) {
   if (typeof window === 'undefined') {
    return;
  }
  try {
    const history = getChatHistory();
    const existingIndex = history.findIndex((s) => s.id === session.id);

    if (existingIndex > -1) {
      // Update existing session
      history[existingIndex] = session;
    } else {
      // Add new session
      history.unshift(session);
    }
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat session to localStorage:', error);
  }
}

export function getChatSession(sessionId: string): ChatSession | null {
   if (typeof window === 'undefined') {
    return null;
  }
  try {
    const history = getChatHistory();
    return history.find((session) => session.id === sessionId) || null;
  } catch (error)
  {
    console.error('Error reading chat session from localStorage:', error);
    return null;
  }
}
