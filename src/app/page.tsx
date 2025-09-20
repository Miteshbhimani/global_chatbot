import { Globe } from 'lucide-react';
import UrlInputForm from '@/components/url-input-form';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="relative flex w-full max-w-2xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <div className="rounded-full bg-primary/20 p-4">
              <Globe className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            WebChat Navigator
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            Enter any website URL to start a conversation with an AI agent that knows all about it.
          </p>
        </div>
        <Card className="w-full p-2 shadow-lg">
          <UrlInputForm />
        </Card>
      </div>
    </main>
  );
}
