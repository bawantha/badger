import { missions } from '@/lib/data';
import { MissionCard } from './_components/mission-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

export default function MissionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mission Feed</h1>
        <p className="text-muted-foreground mt-1">
          Select your next objective. Filter by category, difficulty, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input placeholder="Search missions..." className="flex-grow" />
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="intel">Intel</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="endurance">Endurance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recruit">Recruit</SelectItem>
              <SelectItem value="veteran">Veteran</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="hidden md:flex">
            <ListFilter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}
