import { userProfileData } from '@/lib/data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Rss, BarChart2, Shield, Swords, Star, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { MissionCard } from '../../missions/_components/mission-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, you would fetch user data based on params.username
  const user = userProfileData;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 md:h-48 bg-secondary" />
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-end -mt-20">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-4xl">{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold font-headline">{user.username}</h1>
              <p className="text-muted-foreground">{user.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Follow
              </Button>
              <Button variant="secondary">
                 <Rss className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">{user.followers.toLocaleString()}</span> followers
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">{user.following.toLocaleString()}</span> following
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats and Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader><CardTitle className="font-headline">Battle Stats</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                    <span className="text-muted-foreground flex items-center gap-2"><Swords className="h-4 w-4"/> Wins</span>
                    <span className="font-bold font-mono text-lg text-green-400">{user.stats.wins}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                    <span className="text-muted-foreground flex items-center gap-2"><Shield className="h-4 w-4"/> Losses</span>
                    <span className="font-bold font-mono text-lg text-red-400">{user.stats.losses}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                    <span className="text-muted-foreground flex items-center gap-2"><BarChart2 className="h-4 w-4"/> Win Rate</span>
                    <span className="font-bold font-mono text-lg">{user.stats.winrate}</span>
                </div>
                 <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                    <span className="text-muted-foreground flex items-center gap-2"><Star className="h-4 w-4"/> Current Streak</span>
                    <span className="font-bold font-mono text-lg">{user.stats.currentStreak}</span>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="font-headline">Badges</CardTitle></CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="grid grid-cols-4 gap-4">
                        {user.badges.map(badge => (
                             <Tooltip key={badge.id}>
                                <TooltipTrigger asChild>
                                    <div className="aspect-square flex items-center justify-center bg-secondary rounded-md border border-transparent hover:border-primary transition-colors cursor-pointer">
                                        <badge.Icon className="h-8 w-8 text-primary" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-bold">{badge.name}</p>
                                    <p className="text-muted-foreground">{badge.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Tabs defaultValue="mission-history">
                <TabsList>
                    <TabsTrigger value="mission-history">Mission History</TabsTrigger>
                    <TabsTrigger value="battle-history">Battle History</TabsTrigger>
                </TabsList>
                <TabsContent value="mission-history" className="mt-4">
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {user.missionHistory.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                        ))}
                    </div>
                </TabsContent>
                 <TabsContent value="battle-history" className="mt-4">
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            <p>Battle history coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
