'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  color: string;
}

const initialMessages: Message[] = [
  { id: 1, user: 'Raptor', avatar: '/avatars/06.png', text: "Let's go Ghost! 🔥", color: 'text-blue-400' },
  { id: 2, user: 'Phoenix', avatar: '/avatars/05.png', text: 'Viper has the better start.', color: 'text-green-400' },
  { id: 3, user: 'Spectre', avatar: '/avatars/04.png', text: 'This is intense!', color: 'text-purple-400' },
  { id: 4, user: 'Admin', avatar: '', text: 'Welcome to the battle! Remember to be respectful.', color: 'text-primary' },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: 'You',
        avatar: '/avatars/01.png',
        text: input,
        color: 'text-white',
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <span className={`font-bold text-sm ${msg.color}`}>{msg.user}</span>
                <p className="text-sm text-muted-foreground">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            autoComplete="off"
          />
          <Button type="submit" size="icon" variant="secondary">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
