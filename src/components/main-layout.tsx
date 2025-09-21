
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import ChatHistorySidebar from '@/components/chat-history-sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ChatHistorySidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
