
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Globe, LogOut } from 'lucide-react';

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const showHeader = isAuthenticated && !pathname.startsWith('/chat');

  return (
    <>
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Link href="/start" className="flex items-center gap-2 font-bold">
              <Globe className="h-6 w-6 text-primary" />
              <span>WebChat Navigator</span>
            </Link>
            <nav className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </header>
      )}
      {children}
    </>
  );
}
