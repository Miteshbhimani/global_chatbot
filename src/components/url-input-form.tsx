'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function UrlInputForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isValidUrl = (urlString: string) => {
    try {
      // Prepend https:// if no protocol is present
      const withProtocol = /^(http|https):\/\//.test(urlString)
        ? urlString
        : `https://${urlString}`;
      new URL(withProtocol);
      return withProtocol;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: 'URL is required',
        description: 'Please enter a website URL to continue.',
        variant: 'destructive',
      });
      return;
    }

    const validUrl = isValidUrl(url);
    if (!validUrl) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid website URL (e.g., example.com).',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Instead of just url, we create a new session which will have a unique ID
    router.push(`/chat?url=${encodeURIComponent(validUrl)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <Input
        type="text"
        placeholder="Enter a website URL, e.g., google.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="h-12 flex-grow bg-background text-base"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={isLoading || !url.trim()}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
        <span className="sr-only">Start Chat</span>
      </Button>
    </form>
  );
}
