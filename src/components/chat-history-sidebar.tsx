
'use client';

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

// Mock data for chat history - now empty
const chatHistory: { id: string; title: string; date: string }[] = [];

export default function ChatHistorySidebar() {
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
                  className="w-full justify-start"
                  variant="ghost"
                >
                  <Link href={`/chat/history/${chat.id}`}>
                    <span>{chat.title}</span>
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
