
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { LoaderCircle, Globe } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoginLoading(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login(); // Set authenticated state
    router.push('/start');
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSignupLoading(true);

    // Simulate an API call for user creation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login(); // Log the user in after "creating" the account
    setIsSignupOpen(false); // Close the dialog
    router.push('/start');
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
         <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Globe className="h-6 w-6 text-primary" />
            <span>WebChat Navigator</span>
          </Link>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? <LoaderCircle className="animate-spin" /> : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="p-0">Sign up</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign Up</DialogTitle>
                  <DialogDescription>
                    Enter your information to create an account.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSignup} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="first-name" className="text-right">
                      First Name
                    </Label>
                    <Input id="first-name" placeholder="Max" required className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="last-name" className="text-right">
                      Last Name
                    </Label>
                    <Input id="last-name" placeholder="Robinson" required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-password" className="text-right">
                      Password
                    </Label>
                    <Input id="signup-password" type="password" required className="col-span-3" />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={isSignupLoading}>
                    {isSignupLoading ? <LoaderCircle className="animate-spin" /> : 'Create an account'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
