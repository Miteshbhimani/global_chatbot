
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Zap } from 'lucide-react';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Chat with Any Website, Instantly
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                TechnovaAI WebChat lets you start a conversation with an AI agent that has full knowledge of any website. Just enter a URL and start asking questions.
              </p>
              <div>
                <Button size="lg" asChild>
                  <Link href="/login">Start Your First Chat</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-muted py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Why You'll Love TechnovaAI WebChat
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Unlock information faster and more intuitively than ever before.
                </p>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Instant Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>No more endless searching. Our AI reads the entire website in seconds to provide you with accurate answers.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Conversational Interface</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Just chat with the AI. Ask follow-up questions and get clarifications in a natural, conversational flow.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Enter any website URL and begin your intelligent conversation today. It's that simple.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button size="lg" asChild className="w-full">
                  <Link href="/login">Launch TechnovaAI WebChat</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TechnovaAI WebChat. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="/about" className="text-xs hover:underline">
            About Us
          </Link>
           <Link href="/team" className="text-xs hover:underline">
            Our Team
          </Link>
          <Link href="/contact" className="text-xs hover:underline">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
