'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import MessageBubble from '@/components/message-bubble';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  isSending: boolean;
}

export default function ChatMessages({ messages, isSending }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  return (
    <div ref={scrollRef} className="h-full space-y-6 p-4 md:p-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isSending && <TypingIndicator />}
      <div />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-in fade-in">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-accent text-accent-foreground">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[70%] rounded-lg rounded-bl-none bg-muted p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
