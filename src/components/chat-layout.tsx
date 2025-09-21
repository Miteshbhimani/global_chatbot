import { ArrowLeft, BookText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChatInput from '@/components/chat-input';
import ChatMessages from '@/components/chat-messages';
import type { Message } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatLayoutProps {
  url: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onSummarize: () => void;
  isSending: boolean;
}

export default function ChatLayout({ url, messages, onSendMessage, onSummarize, isSending }: ChatLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4 md:px-6">
         <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Link href="/start">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1 truncate">
          <p className="truncate text-sm font-medium text-foreground">{url}</p>
          <p className="text-xs text-accent">Online</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onSummarize} disabled={isSending}>
                <BookText className="h-4 w-4" />
                <span className="sr-only">Summarize Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Summarize Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
