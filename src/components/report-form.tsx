'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase'; // adjust to your path where Firestore is initialized
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ReportSchema, type ReportFormValues, type ReportAnalysis } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef } from 'react';
import { LocateFixed, CheckCircle, AlertCircle, Bot, Camera, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import Image from 'next/image';

const fileToDataUri = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function ReportForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [analysisResult, setAnalysisResult] = useState<ReportAnalysis | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      email: '',
      phone: '',
      gender: undefined,
      description: '',
      image: undefined,
    },
  });

  const handleGetLocation = () => {
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue('location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
        form.setError('location', { type: 'custom', message: 'Could not get location.' });
      }
    );
  };

  const onSubmit = async (data: ReportFormValues) => {
  setIsSubmitting(true);
  try {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
    };

    // save into "reports" collection
    await addDoc(collection(db, 'reports'), payload);

    toast({
      title: 'Report submitted!',
      description: 'Thank you for submitting the incident report.',
    });

    // Optionally reset the form & state
    form.reset();
    setImagePreview(null);
    setLocationStatus('idle');
    setAnalysisResult(null);
  } catch (error) {
    console.error('Error submitting report:', error);
    toast({
      title: 'Error',
      description: 'Could not submit the report. Please try again later.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};
  
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          if (file.size > 4 * 1024 * 1024) { // 4MB limit
              form.setError('image', { type: 'custom', message: 'Image must be less than 4MB.' });
              return;
          }
          const dataUri = await fileToDataUri(file);
          setImagePreview(dataUri);
          form.setValue('image', dataUri);
          form.clearErrors('image');
      }
  };

  const clearImage = () => {
    setImagePreview(null);
    form.setValue('image', undefined);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Incident Location</FormLabel>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={handleGetLocation} disabled={locationStatus === 'loading'}>
                    <LocateFixed className="mr-2 h-4 w-4" />
                    {locationStatus === 'loading' ? 'Getting Location...' : 'Use Current Location'}
                  </Button>
                  {locationStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {locationStatus === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
                </div>
                <FormMessage>{form.formState.errors.location?.message}</FormMessage>
              </FormItem>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the incident in detail..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attach Image (Required for proof)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                             <Input 
                                type="file" 
                                accept="image/*" 
                                capture="environment"
                                ref={fileInputRef}
                                onChange={handleImageChange} 
                                className='hidden'
                                id="camera-input"
                              />
                              <label htmlFor="camera-input" className="cursor-pointer">
                                <Button type='button' variant="outline" asChild>
                                    <div>
                                        <Camera className="mr-2 h-4 w-4" />
                                        Take a picture
                                    </div>
                                </Button>
                               </label>
                        </div>
                      </FormControl>
                      <FormDescription>You can upload an image of the incident (max 4MB).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview && (
                    <div className="relative w-full max-w-xs rounded-lg overflow-hidden border">
                        <Image src={imagePreview} alt="Incident preview" width={400} height={300} className="object-cover"/>
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={clearImage}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {analysisResult && (
        <Alert className="mt-6">
          <Bot className="h-4 w-4" />
          <AlertTitle className='font-bold'>AI Analysis</AlertTitle>
          <AlertDescription className='space-y-1'>
              <p><strong>Category:</strong> {analysisResult.category}</p>
              <p><strong>Severity:</strong> {analysisResult.severity}</p>
              <p><strong>Summary:</strong> {analysisResult.summary}</p>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
