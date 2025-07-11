'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const safePlaces = [
  { lat: 34.0224, lng: -118.2851, name: 'Main Library' },
  { lat: 34.0205, lng: -118.2859, name: 'Campus Security Office' },
  { lat: 34.0242, lng: -118.2884, name: 'Student Health Center' },
];

export function MapView() {
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        // Fallback to a default location if user denies permission
        setUserPosition({ lat: 34.0224, lng: -118.2851 });
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!apiKey) {
    return (
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
            <Alert variant="destructive" className="w-full max-w-lg">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Configuration Error</AlertTitle>
                <AlertDescription>
                Google Maps API key is missing. Please add it to your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to display the map.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  if (loading) {
      return <Skeleton className="h-[calc(100vh-150px)] w-full rounded-lg" />;
  }

  return (
    <div className="relative h-[calc(100vh-150px)] w-full overflow-hidden rounded-lg shadow-lg">
      {userPosition && (
        <APIProvider apiKey={apiKey}>
          <div className="absolute top-4 left-1/2 z-10 w-11/12 max-w-sm -translate-x-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Find Safe Places</CardTitle>
                <CardDescription>Search for libraries, security offices, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search..." />
              </CardContent>
            </Card>
          </div>
          <Map
            center={userPosition}
            zoom={15}
            mapId="campus-safety-map"
            className="h-full w-full"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <AdvancedMarker position={userPosition} title={'Your Location'}>
              <div className="relative">
                <div className="absolute h-6 w-6 animate-ping rounded-full bg-primary/50"></div>
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </div>
            </AdvancedMarker>
            {safePlaces.map((place, index) => (
              <AdvancedMarker key={index} position={place} title={place.name}>
                <Pin
                  background={'hsl(var(--primary))'}
                  borderColor={'hsl(var(--background))'}
                  glyphColor={'hsl(var(--primary-foreground))'}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      )}
    </div>
  );
}
