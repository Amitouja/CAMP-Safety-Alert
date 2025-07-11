'use client';

import { useState } from 'react';
import { Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { sendPanicAlert } from '@/app/actions';

export function PanicButton() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePanic = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await sendPanicAlert({ latitude, longitude });
        setLoading(false);
        setDialogOpen(false);
        if (result.success) {
          toast({
            title: 'Alert Sent!',
            description: `Your location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) has been sent to campus security.`,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error,
          });
        }
      },
      () => {
        setLoading(false);
        setDialogOpen(false);
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: 'Could not get your location. Please enable location services in your browser settings.',
        });
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="font-bold shadow-lg animate-pulse hover:animate-none">
          <Siren className="mr-0 h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">PANIC</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you in an emergency?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will immediately send your current location to campus security. Only use this in a genuine emergency.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePanic} disabled={loading} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
            {loading ? 'Sending...' : 'Yes, Send Alert'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
