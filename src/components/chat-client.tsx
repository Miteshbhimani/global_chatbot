'use client';

import {useState, useEffect, useId} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import type {Message} from '@/lib/types';
import {getAgentResponse, getSummary} from '@/lib/actions';
import ChatLayout from '@/components/chat-layout';
import {useToast} from '@/hooks/use-toast';
import {LoaderCircle} from 'lucide-react';
import {useAuth} from '@/context/auth-context';

export default function ChatClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {toast} = useToast();
  const {isAuthenticated} = useAuth();

  const [url, setUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const componentId = useId();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
      return;
    }

    if (isAuthenticated === true) {
      const urlParam = searchParams.get('url');

      if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam);
        setUrl(decodedUrl);
        setMessages([
          {
            id: `${componentId}-initial-message`,
            role: 'agent',
            content: `Hello! I'm your AI agent for ${decodedUrl}. How can I help you explore this site?`,
          },
        ]);
        setIsLoading(false);
      } else {
        // If no URL is provided, redirect to the start page.
        router.push('/start');
      }
    }
  }, [searchParams, router, isAuthenticated, componentId]);

  const handleSendMessage = async (content: string) => {
    if (isSending || !content.trim() || !url) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      // Pass the full message history, including the new user message
      const response = await getAgentResponse(url, content, updatedMessages);
      const newAgentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: response.answer,
        imageUrl: response.imageUrl,
      };

      setMessages(prevMessages => [...prevMessages, newAgentMessage]);
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

  const handleSummarize = async () => {
    if (isSending || !url) return;

    setIsSending(true);
    try {
      const response = await getSummary(url);
      const newAgentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: response,
      };

      setMessages(prevMessages => [...prevMessages, newAgentMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get a summary from the agent.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading || !url) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ChatLayout
      url={url}
      messages={messages}
      onSendMessage={handleSendMessage}
      onSummarize={handleSummarize}
      isSending={isSending}
    />
  );
}
