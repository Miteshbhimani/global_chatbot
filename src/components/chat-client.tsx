'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Message } from '@/lib/types';
import { getAgentResponse } from '@/lib/actions';
import ChatLayout from '@/components/chat-layout';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

export default function ChatClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const [url, setUrl] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const urlParam = searchParams.get('url');
    if (!urlParam) {
      router.push('/');
      return;
    }

    const decodedUrl = decodeURIComponent(urlParam);
    setUrl(decodedUrl);

    // Prevents adding initial message multiple times on re-renders
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: `Hello! I'm your AI agent for ${decodedUrl}. How can I help you explore this site?`,
      };
      setMessages([initialMessage]);
    }
  }, [searchParams, router, messages.length]);

  const handleSendMessage = async (content: string) => {
    if (isSending || !content.trim()) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      const response = await getAgentResponse(url, content, updatedMessages);
      const newAgentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: response,
      };
      setMessages((prev) => [...prev, newAgentMessage]);
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

  if (!url) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ChatLayout url={url} messages={messages} onSendMessage={handleSendMessage} isSending={isSending} />
  );
}
