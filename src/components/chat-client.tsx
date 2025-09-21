'use client';

import { useState, useEffect, useId, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Message, ChatSession } from '@/lib/types';
import { getAgentResponse } from '@/lib/actions';
import ChatLayout from '@/components/chat-layout';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { getChatSession, saveChatSession } from '@/lib/history';


export default function ChatClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const componentId = useId();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
      return;
    }

    if (isAuthenticated === true) {
      const sessionId = searchParams.get('sessionId');
      const urlParam = searchParams.get('url');

      if (sessionId) {
        const existingSession = getChatSession(sessionId);
        if (existingSession) {
          setSession(existingSession);
          setMessages(existingSession.messages);
        } else {
           // This was causing the issue. Redirect without a toast.
           router.push('/start');
           return; // Prevent further execution
        }
      } else if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam);
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          url: decodedUrl,
          title: `Conversation about ${decodedUrl}`,
          messages: [{
            id: `${componentId}-initial-message`,
            role: 'agent',
            content: `Hello! I'm your AI agent for ${decodedUrl}. How can I help you explore this site?`,
          }],
          createdAt: new Date().toISOString(),
        };
        setSession(newSession);
        setMessages(newSession.messages);
        // Navigate to the new session's URL
        router.replace(`/chat?sessionId=${newSession.id}`);
      } else {
        router.push('/start');
        return; // Prevent further execution
      }

      setIsAuthenticating(false);
    }
  }, [searchParams, router, isAuthenticated, componentId, toast]);

  const updateSession = useCallback((newMessages: Message[]) => {
    if (!session) return;
    
    // Find if any message in the session is from the user.
    const hasUserMessage = session.messages.some(m => m.role === 'user');
    let newTitle = session.title;
  
    // Only update the title if a user message has NOT been sent before in this session.
    if (!hasUserMessage) {
      const firstUserMessage = newMessages.find(m => m.role === 'user');
      if (firstUserMessage) {
        const potentialTitle = firstUserMessage.content.substring(0, 40);
        newTitle = potentialTitle.length === 40 ? `${potentialTitle}...` : potentialTitle;
      }
    }
    
    const updatedSession = { 
      ...session, 
      messages: newMessages,
      title: newTitle,
    };
    
    setSession(updatedSession);
    saveChatSession(updatedSession);
  }, [session]);


  const handleSendMessage = async (content: string) => {
    if (isSending || !content.trim() || !session) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    updateSession(updatedMessages); // Save user message immediately
    setIsSending(true);

    try {
      const response = await getAgentResponse(session.url, content, updatedMessages);
      const newAgentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: response,
      };
      
      const finalMessages = [...updatedMessages, newAgentMessage];
      setMessages(finalMessages);
      updateSession(finalMessages);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get a response from the agent.',
        variant: 'destructive',
      });
       // Restore previous messages if API fails
      setMessages(messages);
    } finally {
      setIsSending(false);
    }
  };

  if (isAuthenticating || !session) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ChatLayout url={session.url} messages={messages} onSendMessage={handleSendMessage} isSending={isSending} />
  );
}
