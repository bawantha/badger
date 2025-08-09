'use client';

import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCallStateHooks,
  ViewerLivestreamLayout,
  LivestreamLayout,
} from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs'; // Assuming you use Clerk for user management
import { useState } from 'react';

type LivestreamPanelProps = {
  call: Call;
};

export const LivestreamPanel = ({ call }: LivestreamPanelProps) => {
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();

  // A real app would have a more robust way to determine who the host is
  const isHost = true;

  if (isHost) {
    return (
      <StreamTheme className="h-full w-full">
        <LivestreamLayout
          showParticipantCount={isLive}
          showDuration={isLive}
        />
        <CallControls />
      </StreamTheme>
    );
  }

  return (
    <StreamTheme className="h-full w-full">
      <ViewerLivestreamLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default function LivestreamWrapper({ battleId }: { battleId: string}) {
  const [call] = useState(() => {
    // This is a simplified setup. In a real app, you would fetch or create
    // the call object from your backend and pass it to the component.
    const client = new (require('@stream-io/video-react-sdk').StreamVideoClient)({ apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!});
    const newCall = client.call('livestream', battleId);
    newCall.join({ create: true });
    return newCall;
  });

  if (!call) return <div>Loading call...</div>

  return (
    <StreamCall call={call}>
      <LivestreamPanel call={call} />
    </StreamCall>
  );
}
