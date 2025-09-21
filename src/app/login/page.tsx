
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
import { LoaderCircle, Globe, Github } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.83,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.39,14.46a4.83,4.83,0,0,1-2.08,3.42,4.45,4.45,0,0,1-2.48,1,2,2,0,0,1-.62,0,5.2,5.2,0,0,1-1.66-.41,4.82,4.82,0,0,1-2.73-1.8,11.13,11.13,0,0,1-1.46-2.56,9.59,9.59,0,0,1-.56-3,5.2,5.2,0,0,1,1.81-4,5,5,0,0,1,3.48-1.78,4.5,4.5,0,0,1,2.37.71,1.4,1.4,0,0,0,1.4-.13,3.33,3.33,0,0,0,1.2-1.25,1.24,1.24,0,0,0-.4-1.5,5.28,5.28,0,0,0-4-1.84,5.49,5.49,0,0,0-4.6,2.5,9.75,9.75,0,0,0-1.7,5.59,9.33,9.33,0,0,0,1.43,5.29,5.41,5.41,0,0,0,4.36,2.7,4.86,4.86,0,0,0,3.29-.9,5,5,0,0,0,2.4-3.84,1,1,0,0,0-1-.83A2.83,2.83,0,0,0,19.39,14.46Zm-3.52-8.31a3.07,3.07,0,0,1,1.19-2.29,2.83,2.83,0,0,0-2.3-1.06,3.13,3.13,0,0,0-2.58,1.4,2.57,2.57,0,0,0-.82,2,2.6,2.6,0,0,1,2.23,1.13A3.2,3.2,0,0,1,15.87,6.15Z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSocialLogin = async () => {
    setIsLoginLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login();
    router.push('/start');
  }

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
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
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
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" onClick={handleSocialLogin} disabled={isLoginLoading}>
              <GoogleIcon className="mr-2 h-4 w-4" /> Continue with Google
            </Button>
            <Button variant="outline" onClick={handleSocialLogin} disabled={isLoginLoading}>
              <Github className="mr-2 h-4 w-4" /> Continue with GitHub
            </Button>
            <Button variant="outline" onClick={handleSocialLogin} disabled={isLoginLoading}>
              <AppleIcon className="mr-2 h-4 w-4" /> Continue with Apple
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

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
                {isLoginLoading ? <LoaderCircle className="animate-spin" /> : 'Continue with Email'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    