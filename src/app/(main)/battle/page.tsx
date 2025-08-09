import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords, Trophy, Shield, Users } from 'lucide-react';

export default function BattlePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Battle Hub</h1>
        <p className="text-muted-foreground mt-1">
          Challenge other operators in live 1v1 duels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Trophy className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">Ranked Battle</CardTitle>
                <CardDescription>Compete for leaderboard points and glory.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">Put your skills to the test in our competitive matchmaking queue. Win to climb the ranks and earn exclusive badges.</p>
          </CardContent>
          <CardContent>
            <Button className="w-full" asChild>
                <Link href="/battle/live-battle-1">
                    <Swords className="mr-2 h-4 w-4" /> Queue for Ranked
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">Casual Match</CardTitle>
                <CardDescription>Hone your skills without the pressure.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">Jump into a casual battle to practice, complete mission objectives, or just have fun. No impact on your rank.</p>
          </CardContent>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
                 <Link href="/battle/live-battle-2">
                    <Swords className="mr-2 h-4 w-4" /> Find Casual Match
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle className="font-headline">Live Battles</CardTitle>
            <CardDescription>Spectate ongoing duels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/battle/live-battle-1" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="text-primary font-bold">LIVE</div>
                    <div>
                        <p className="font-semibold">Ghost vs. Viper</p>
                        <p className="text-sm text-muted-foreground">Mission: Speed Run</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>1,204 Spectators</span>
                </div>
            </Link>
             <Link href="/battle/live-battle-2" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="text-primary font-bold">LIVE</div>
                    <div>
                        <p className="font-semibold">Phoenix vs. Wolverine</p>
                        <p className="text-sm text-muted-foreground">Mission: Max Reps</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>876 Spectators</span>
                </div>
            </Link>
          </CardContent>
        </Card>
    </div>
  );
}
