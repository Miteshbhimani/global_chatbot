import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChatInput from '@/components/chat-input';
import ChatMessages from '@/components/chat-messages';
import type { Message } from '@/lib/types';

interface ChatLayoutProps {
  url: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  isSending: boolean;
}

export default function ChatLayout({ url, messages, onSendMessage, isSending }: ChatLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4 md:px-6">
        <Link href="/" aria-label="Back to home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1 truncate">
          <p className="truncate text-sm font-medium text-foreground">{url}</p>
          <p className="text-xs text-accent">Online</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} isSending={isSending} />
      </main>
      <footer className="border-t bg-card p-2 md:p-4">
        <ChatInput onSendMessage={onSendMessage} isSending={isSending} />
      </footer>
    </div>
  );
}
