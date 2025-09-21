import {cn} from '@/lib/utils';
import type {Message} from '@/lib/types';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Bot, User} from 'lucide-react';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
}

function Urlify({text}: {text: string}) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function MessageBubble({message}: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex animate-in fade-in items-end gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback
          className={cn(
            isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
          )}
        >
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'max-w-[70%] space-y-2 rounded-lg p-3 text-sm shadow-md',
          isUser
            ? 'rounded-br-none bg-primary text-primary-foreground'
            : 'rounded-bl-none bg-card text-card-foreground'
        )}
      >
        {message.imageUrl && (
          <div className="relative aspect-square w-full">
            <Image
              src={message.imageUrl}
              alt="Generated image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}
        {message.content && (
          <p className="whitespace-pre-wrap">
            <Urlify text={message.content} />
          </p>
        )}
      </div>
    </div>
  );
}
