
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Mission } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Radio, Video, MapPin, Clock, Users, Swords } from 'lucide-react';
import Link from 'next/link';

interface MissionBriefingsProps {
  missions: Mission[];
  liveBattles: any[]; // Define a proper type for live battles
}

export function MissionBriefings({ missions, liveBattles }: MissionBriefingsProps) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredMissions = missions.filter(mission => {
    const categoryMatch = categoryFilter === 'all' || mission.category === categoryFilter;
    const difficultyMatch = difficultyFilter === 'all' || mission.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  return (
    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="border-b border-primary/20">
        <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
          <Radio className="h-5 w-5" />
          Mission Briefings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">CATEGORY</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-background/80 border-primary/30 h-9">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Intel">Intel</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
                <SelectItem value="Endurance">Endurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div>
            <label className="text-xs text-muted-foreground">DIFFICULTY</label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-background/80 border-primary/30 h-9">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Recruit">Recruit</SelectItem>
                <SelectItem value="Veteran">Veteran</SelectItem>
                <SelectItem value="Elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-around text-center">
            <div>
                <p className="text-2xl font-bold text-primary">{filteredMissions.length}</p>
                <p className="text-xs text-muted-foreground">AVAILABLE</p>
            </div>
             <div>
                <p className="text-2xl font-bold text-red-500">{liveBattles.length}</p>
                <p className="text-xs text-muted-foreground">LIVE BATTLES</p>
            </div>
        </div>
      </CardContent>
      <ScrollArea className="flex-grow">
        <div className="p-4 pt-0 space-y-4">
          {filteredMissions.map((mission, index) => (
            <Link href={`/missions/${mission.id}`} key={mission.id} className="block group">
              <div className="border-l-2 border-primary/50 pl-4 py-2 hover:bg-secondary/50 rounded-r-md transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold group-hover:text-primary">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/50 text-primary">{mission.difficulty.toUpperCase()}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco, CA</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 23h</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {mission.proof.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Progress value={45} className="h-1 bg-primary/20" />
                    <span className="text-xs font-mono text-primary font-bold">200 PTS</span>
                </div>
              </div>
               {index < filteredMissions.length -1 && <Separator className="my-2 bg-primary/20"/>}
            </Link>
          ))}
          {liveBattles.map((battle) => (
              <Link href={`/battle/${battle.id}`} key={battle.id} className="block group mt-4">
                <Separator className="my-4 bg-red-500/30"/>
                <div className="border-l-2 border-red-500/80 pl-4 py-2 hover:bg-secondary/50 rounded-r-md transition-colors">
                  <div className="flex justify-between items-start">
                      <div>
                          <h4 className="font-semibold group-hover:text-red-400 flex items-center gap-2"><Swords className="w-4 h-4" /> {battle.title}</h4>
                          <p className="text-sm text-muted-foreground">Live 1v1 combat training session</p>
                      </div>
                      <Badge className="bg-red-600 text-white">LIVE</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {battle.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {battle.duration}</span>
                      <span className="flex items-center gap-1"><Radio className="w-3 h-3" /> LIVESTREAM</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(battle.participants / battle.viewers) * 100} className="h-1 bg-red-500/20 [&>*]:bg-red-500" />
                    <span className="text-xs font-mono text-red-400 font-bold">500 PTS</span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
