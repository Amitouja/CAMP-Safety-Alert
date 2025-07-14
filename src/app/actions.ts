'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function sendPanicAlert({latitude,longitude,}: {
  latitude: number;
  longitude: number;
}) {
  try {
    await addDoc(collection(db, 'alerts'), {
      latitude,
      longitude,
      createdAt: serverTimestamp(),
      status: 'pending',
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send alert:', error);
    return { success: false, error: 'Failed to send alert. Please try again.' };
  }
}