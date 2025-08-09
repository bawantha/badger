import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { leaderboardData } from '@/lib/data';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Leaderboards</h1>
        <p className="text-muted-foreground mt-1">
          See who's dominating the field.
        </p>
      </div>
      <Tabs defaultValue="global">
        <TabsList>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="org">By Org</TabsTrigger>
          <TabsTrigger value="event">Event-Based</TabsTrigger>
        </TabsList>
        <TabsContent value="global" className="mt-4">
           <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[80px]">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead className="text-right">Wins</TableHead>
                        <TableHead className="text-right">Badges</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboardData.map((entry) => (
                        <TableRow key={entry.rank}>
                            <TableCell className="font-bold text-lg">
                                <div className="flex items-center justify-center">
                                    {entry.rank <= 3 ? <Trophy className={`mr-2 h-5 w-5 ${
                                        entry.rank === 1 ? 'text-yellow-400' :
                                        entry.rank === 2 ? 'text-gray-400' :
                                        'text-yellow-600'
                                    }`} /> : null}
                                    {entry.rank}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link href={`/profile/${entry.username.toLowerCase()}`} className="flex items-center gap-3 hover:underline">
                                    <Avatar>
                                        <AvatarImage src={entry.avatar} />
                                        <AvatarFallback>{entry.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{entry.username}</span>
                                </Link>
                            </TableCell>
                             <TableCell>
                                <Badge variant="outline">{entry.org}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono">{entry.wins}</TableCell>
                            <TableCell className="text-right font-mono">{entry.badges}</TableCell>
                            <TableCell className="text-right font-mono text-primary font-semibold">{entry.points.toLocaleString()}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
        <TabsContent value="org" className="mt-4 text-center text-muted-foreground">
          <p>Organization-specific leaderboards coming soon.</p>
        </TabsContent>
        <TabsContent value="event" className="mt-4 text-center text-muted-foreground">
          <p>Event-based leaderboards will be available during active events.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
