import { missions } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Shield, Trophy } from 'lucide-react';
import { MissionSubmissionForm } from './_components/mission-submission-form';
import { Separator } from '@/components/ui/separator';

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const mission = missions.find((m) => m.id === params.id);

  if (!mission) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
         <Badge variant="secondary">{mission.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight font-headline">{mission.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Sponsored by {mission.sponsor}</span>
            </div>
             <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Reward: {mission.reward}</span>
            </div>
             <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Deadline: {new Date(mission.deadline).toLocaleDateString()}</span>
            </div>
        </div>
      </div>
       <Image
          src={mission.image}
          alt={mission.title}
          width={1280}
          height={720}
          className="aspect-video rounded-lg object-cover border mb-8"
          data-ai-hint={`${mission.category.toLowerCase()} mission`}
        />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Mission Briefing</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{mission.brief}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Submit Proof</CardTitle>
                </CardHeader>
                <CardContent>
                    <MissionSubmissionForm />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <h4 className="font-semibold">Proof Type</h4>
                            <p className="text-sm text-muted-foreground capitalize">{mission.proof} Required</p>
                        </div>
                    </div>
                     <Separator />
                     <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <h4 className="font-semibold">Difficulty</h4>
                            <p className="text-sm text-muted-foreground">{mission.difficulty}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
