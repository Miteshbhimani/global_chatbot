import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Mail, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted py-20 md:py-32">
          <div className="container grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">
                    Send your questions to{' '}
                    <a href="mailto:support@webchatnav.com" className="text-primary hover:underline">
                      support@webchatnav.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Chat with our team during business hours.
                  </p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." />
                  </div>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} WebChat Navigator. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="/about" className="text-xs hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-xs hover:underline">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
