
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
    <div className="h-full w-full absolute inset-0">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -98.5795,
          latitude: 39.8283,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />
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
              <div className="w-6 h-6 bg-green-500/50 rounded-full flex items-center justify-center border-2 border-green-400">
                <Target className="h-4 w-4 text-green-200 drop-shadow-[0_0_3px_#34d399]" />
              </div>
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
            offset={30}
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
