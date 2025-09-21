import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                About WebChat Navigator
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                We are on a mission to revolutionize how people interact with web content.
              </p>
            </div>
          </div>
        </section>

        <section id="mission" className="w-full bg-muted py-20 md:py-32">
          <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Making Information Accessible
              </h2>
              <p className="text-muted-foreground md:text-lg">
                WebChat Navigator was born from a simple idea: what if you could talk to a website? We believe that accessing information should be as natural as having a conversation. Our goal is to break down the barriers of traditional web browsing and create a more intuitive, efficient, and enjoyable way to find the answers you need.
              </p>
            </div>
            <div className="flex justify-center">
              <Target className="h-48 w-48 text-primary" />
            </div>
          </div>
        </section>

        <section id="team" className="w-full py-20 md:py-32">
           <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
             <div className="flex justify-center">
              <Users className="h-48 w-48 text-primary" />
            </div>
            <div className="space-y-4 text-right">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Innovators and Dreamers
              </h2>
              <p className="text-muted-foreground md:text-lg">
                We are a passionate team of developers, designers, and AI enthusiasts dedicated to pushing the boundaries of technology. We are committed to building a product that is not only powerful but also user-friendly and accessible to everyone.
              </p>
            </div>
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
