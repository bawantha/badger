
'use client';

import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Mission } from '@/lib/data';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MissionMapProps {
  missions: Mission[];
}

export function MissionMap({ missions }: MissionMapProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <div className="h-[calc(100vh-theme(spacing.32))] w-full relative">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -74.0060,
          latitude: 40.7128,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        {missions.map((mission) => (
          <Marker
            key={mission.id}
            longitude={mission.longitude}
            latitude={mission.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedMission(mission);
            }}
          >
            <button className="transform transition-transform hover:scale-125">
                <Target className="h-8 w-8 text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" />
            </button>
          </Marker>
        ))}

        {selectedMission && (
          <Popup
            longitude={selectedMission.longitude}
            latitude={selectedMission.latitude}
            onClose={() => setSelectedMission(null)}
            closeButton={false}
            anchor="bottom"
            offset={40}
            className="w-80"
          >
             <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="p-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="secondary" className="mb-2">{selectedMission.category}</Badge>
                            <CardTitle className="font-headline text-base">{selectedMission.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="whitespace-nowrap">{selectedMission.difficulty}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{selectedMission.description}</p>
                    <Button asChild className="w-full" size="sm">
                        <Link href={`/missions/${selectedMission.id}`}>View Mission Details</Link>
                    </Button>
                </CardContent>
             </Card>
          </Popup>
        )}
      </Map>
    </div>
  );
}
