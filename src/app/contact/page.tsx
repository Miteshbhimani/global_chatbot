import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Send, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Contact <span className="text-primary">Me</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted py-20 md:py-32">
          <div className="container max-w-5xl px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="flex flex-col items-center justify-center p-6 text-center">
                <Phone className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Call Us On</h3>
                <p className="mt-1 text-muted-foreground">6356580683</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 text-center">
                <Mail className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Email At</h3>
                <a
                  href="mailto:miteshbhimani2127@gmail.com"
                  className="mt-1 text-muted-foreground hover:text-primary"
                >
                  miteshbhimani2127@gmail.com
                </a>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 text-center">
                <LinkedInIcon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">LinkedIn Profile</h3>
                <a
                  href="https://www.linkedin.com/in/mitesh-bhimani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-muted-foreground hover:text-primary"
                >
                  Mitesh Bhimani
                </a>
              </Card>
            </div>

            <Card className="mt-12">
              <CardContent className="p-6">
                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" placeholder="Your Name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Your Email *</Label>
                    <Input id="email" type="email" placeholder="Your Email" required />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="subject">Your Subject...</Label>
                    <Input id="subject" placeholder="Your Subject" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" placeholder="Your message..." />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" /> SEND MESSAGE
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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
          <Link href="/contact" className="text-xs hover:underline">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
