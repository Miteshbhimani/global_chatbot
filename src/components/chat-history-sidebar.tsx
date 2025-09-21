
'use client';

import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { ChatSession } from '@/lib/types';
import { getChatHistory } from '@/lib/history';
import { formatDistanceToNow } from 'date-fns';

export default function ChatHistorySidebar() {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);

  useEffect(() => {
    // This effect will run on the client side, where localStorage is available.
    // A listener could be added here to update the history in real-time
    // if another tab makes a change.
    setChatHistory(getChatHistory());
  }, []);


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">History</h2>
          <SidebarTrigger />
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/start">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {chatHistory.length > 0 ? (
          <SidebarMenu>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  tooltip={chat.title}
                  asChild
                  className="h-auto w-full justify-start py-2"
                  variant="ghost"
                >
                  <Link href={`/chat?sessionId=${chat.id}`} className="flex flex-col items-start">
                    <span className="truncate">{chat.title}</span>
                     <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(chat.createdAt), { addSuffix: true })}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No chat history yet.
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
