import { missions } from '@/lib/data';
import { MissionMap } from './_components/mission-map';
import { MissionBriefings } from './_components/mission-briefings';

export default function MissionsPage() {
  const liveBattles = [
    {
      id: 'live-battle-1',
      title: 'Alpha vs Delta Battle',
      location: 'Chicago, IL',
      duration: '1h',
      viewers: 1000,
      participants: 234,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-theme(spacing.24))]">
      <div className="lg:col-span-2 xl:col-span-3 h-full flex flex-col gap-4">
        <div className="bg-card border rounded-lg p-4">
          <h1 className="text-2xl font-bold tracking-tight font-headline text-primary">TACTICAL COMMAND MAP</h1>
          <p className="text-muted-foreground mt-1">
            Global Mission Deployment • Real-time Intelligence
          </p>
        </div>
        <div className="border rounded-lg overflow-hidden flex-grow relative">
          <MissionMap missions={missions} />
        </div>
        <div className="bg-card border rounded-lg p-3 text-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <p><span className="font-bold text-primary">247</span> GLOBAL MISSIONS</p>
            <p><span className="font-bold text-primary">1,337</span> ACTIVE OPERATORS</p>
            <p><span className="font-bold text-primary">12</span> LIVE BATTLES</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 xl:col-span-1 h-full">
        <MissionBriefings missions={missions} liveBattles={liveBattles} />
      </div>
    </div>
  );
}
