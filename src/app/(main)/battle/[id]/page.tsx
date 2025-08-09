import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatPanel } from './_components/chat-panel';
import { Clock, Target, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { StreamProvider } from './_components/stream-provider';
import LivestreamWrapper from './_components/livestream-panel';

export default function BattleViewPage({ params }: { params: { id: string } }) {
  const player1 = { name: 'Ghost', avatar: '/avatars/01.png' };

  return (
    <StreamProvider>
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-theme(spacing.24))]">
        {/* Main Content: Streams and Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Battle Info Bar */}
          <Card>
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-primary font-bold text-lg flex items-center gap-2">
                  <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                  LIVE
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-5 w-5" />
                  <span className="font-semibold">Mission: Speed Run</span>
                </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="font-mono font-semibold">14:23</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">1,204</span>
              </div>
            </CardContent>
          </Card>

          {/* Livestream */}
          <div className="relative w-full h-full min-h-[300px] bg-secondary rounded-lg overflow-hidden border flex-1">
             <LivestreamWrapper battleId={params.id} />
          </div>
        </div>

        {/* Side Panel: Chat */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <Card className="h-full flex flex-col">
              <CardHeader>
                  <CardTitle className="font-headline">Live Chat</CardTitle>
              </CardHeader>
              <ChatPanel />
          </Card>
        </div>
      </div>
    </StreamProvider>
  );
}
