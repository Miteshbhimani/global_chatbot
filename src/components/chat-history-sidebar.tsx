
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

// Mock data for chat history
const chatHistory = [
  { id: '1', title: 'Conversation about Next.js', date: '2024-07-29' },
  { id: '2', title: 'React best practices discussion', date: '2024-07-28' },
  { id: '3', title: 'Tailwind CSS tips and tricks', date: '2024-07-27' },
  { id: '4', title: 'Firebase integration help', date: '2024-07-26' },
];

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
      </SidebarContent>
    </Sidebar>
  );
}
