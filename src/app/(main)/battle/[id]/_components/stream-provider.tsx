// This file uses server-side code.
'use server';

import type { ReactNode } from 'react';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { tokenProvider } from '../actions';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export function StreamProvider({ children }: { children: ReactNode }) {
  if (!STREAM_API_KEY) {
    throw new Error('Stream API key is missing');
  }
  
  // In a real app, you'd fetch the user from your database
  const user: User = { 
      id: 'operator-ghost',
      name: 'Ghost',
      image: '/avatars/01.png'
  };

  const client = new StreamVideoClient({ 
      apiKey: STREAM_API_KEY, 
      user,
      tokenProvider,
    });

  return (
    <StreamVideo client={client}>
        {children}
    </StreamVideo>
  );
}
