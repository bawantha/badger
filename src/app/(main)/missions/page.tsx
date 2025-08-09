import { missions } from '@/lib/data';
import { MissionMap } from './_components/mission-map';

export default function MissionsPage() {
  return (
    <div className="space-y-4">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mission Command</h1>
        <p className="text-muted-foreground mt-1">
          Select your objective from the global operations map.
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <MissionMap missions={missions} />
      </div>
    </div>
  );
}
