
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { LoaderCircle, Github } from 'lucide-react';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});


type SocialProvider = 'Google' | 'GitHub' | 'Apple';
type AuthStep = 'login' | 'signup' | 'verify';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginProvider, setSocialLoginProvider] = useState<SocialProvider | null>(null);
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "m@example.com", password: "password" },
  });
  
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSocialLoginProvider(provider);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login();
    router.push('/start');
  };

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, you'd verify credentials here.
    // We'll check for a mock "verified" user.
    const user = localStorage.getItem(`user_${values.email}`);
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isVerified) {
        login();
        router.push('/start');
      } else {
        setAuthStep('verify');
        setIsLoading(false);
      }
    } else {
       toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulate user creation and store it in local storage
    const newUser = {
      email: values.email,
      firstName: values.firstName,
      isVerified: false, // Start as unverified
    };
    localStorage.setItem(`user_${values.email}`, JSON.stringify(newUser));
    
    signupForm.reset();
    setAuthStep('verify'); // Move to verification step
    setIsLoading(false);
    toast({
      title: "Account Created",
      description: "Please check your email to verify your account.",
    });
  };

  const handleVerification = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // This is where you would typically handle a token from an email link.
    // For now, we find the "unverified" user and mark them as verified.
    const unverifiedUserEmail = Object.keys(localStorage).find(key => key.startsWith('user_') && !JSON.parse(localStorage.getItem(key)!).isVerified);
    if (unverifiedUserEmail) {
        const key = unverifiedUserEmail;
        const userData = JSON.parse(localStorage.getItem(key)!);
        userData.isVerified = true;
        localStorage.setItem(key, JSON.stringify(userData));
        login();
        router.push('/start');
    } else {
         toast({
            title: "Verification Failed",
            description: "Could not find user to verify.",
            variant: "destructive",
        });
        setAuthStep('login');
        setIsLoading(false);
    }
  }
  
  const isSocialLoginLoading = (provider: SocialProvider) => socialLoginProvider === provider;

  const renderLogin = () => (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>
          Don&apos;t have an account?{' '}
          <Button variant="link" className="p-0" onClick={() => setAuthStep('signup')}>Sign up</Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" onClick={() => handleSocialLogin('Google')} disabled={isLoading}>
            {isSocialLoginLoading('Google') ? <LoaderCircle className="animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
             Continue with Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin('GitHub')} disabled={isLoading}>
            {isSocialLoginLoading('GitHub') ? <LoaderCircle className="animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
             Continue with GitHub
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin('Apple')} disabled={isLoading}>
            {isSocialLoginLoading('Apple') ? <LoaderCircle className="animate-spin" /> : <AppleIcon className="mr-2 h-4 w-4" />}
             Continue with Apple
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="grid gap-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="animate-spin" /> : 'Continue with Email'}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );

  const renderSignup = () => (
     <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => setAuthStep('login')}>Sign in</Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={signupForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={signupForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Robinson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="animate-spin" /> : 'Create an account'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );

  const renderVerify = () => (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            A verification link has been sent to your email address. Click the button below to simulate verification.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleVerification} disabled={isLoading} className="w-full">
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Complete Verification'}
          </Button>
           <Button variant="link" className="p-0 mt-4" onClick={() => setAuthStep('login')}>Back to Sign in</Button>
        </CardContent>
      </Card>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
         <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="h-6 w-6 text-primary" />
            <span>TechnovaAI WebChat</span>
          </Link>
      </div>
      {authStep === 'login' && renderLogin()}
      {authStep === 'signup' && renderSignup()}
      {authStep === 'verify' && renderVerify()}
    </div>
  );
}

    