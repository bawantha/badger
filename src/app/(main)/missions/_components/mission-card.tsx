import Link from 'next/link';
import Image from 'next/image';
import type { Mission } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const difficultyColor = {
    Recruit: 'bg-green-500/20 text-green-400 border-green-500/30',
    Veteran: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Elite: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  const deadline = new Date(mission.deadline);
  const timeLeft = formatDistanceToNow(deadline, { addSuffix: true });

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="relative h-40 w-full mb-4">
           <Image
            src={mission.image}
            alt={mission.title}
            fill
            className="object-cover rounded-md"
            data-ai-hint={`${mission.category.toLowerCase()} mission`}
          />
        </div>
        <div className="flex justify-between items-start">
            <div>
                 <Badge variant="secondary" className="mb-2">{mission.category}</Badge>
                <CardTitle className="font-headline text-lg">{mission.title}</CardTitle>
            </div>
            <Badge variant="outline" className={cn("whitespace-nowrap", difficultyColor[mission.difficulty])}>
                {mission.difficulty}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{mission.description}</p>
        <div className="mt-4 flex flex-col space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4 text-primary" />
                <span>{mission.reward}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Ends {timeLeft}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/missions/${mission.id}`}>
            View Mission <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
