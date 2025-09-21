
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo from '@/components/logo';

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href={isAuthenticated ? "/start" : "/"} className="flex items-center gap-2 font-bold">
            <Logo className="h-6 w-6 text-primary" />
            <span>TechnovaAI WebChat</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
               <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
