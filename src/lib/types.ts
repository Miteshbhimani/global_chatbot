export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

export interface ChatSession {
  id: string;
  url: string;
  title: string;
  messages: Message[];
  createdAt: string;
}
