'use client';

import { Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';
import ChatClient from '@/components/chat-client';
import MainLayout from '@/components/main-layout';

export default function ChatPage() {
  return (
    <MainLayout>
      <Suspense fallback={<ChatSkeleton />}>
        <ChatClient />
      </Suspense>
    </MainLayout>
  );
}

function ChatSkeleton() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
