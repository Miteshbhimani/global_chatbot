export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  imageUrl?: string;
}
