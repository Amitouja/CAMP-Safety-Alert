'use server';

import { ReportSchema, type ReportFormValues, type ReportAnalysis } from "@/lib/types";
import { analyzeReport } from '@/ai/flows/report-flow';

export async function sendPanicAlert(coords: { latitude: number, longitude: number }) {
    try {
        console.log(`PANIC ALERT: Location received at Lat: ${coords.latitude}, Lng: ${coords.longitude}`);
        // Here you would integrate with a notification service (e.g., Twilio, SendGrid)
        // to send an alert to campus security.
        return { success: true };
    } catch (error) {
        console.error("Panic alert failed:", error);
        return { success: false, error: "Could not send panic alert. Please try again." };
    }
}


export async function submitReport(data: ReportFormValues): Promise<{
    success: boolean;
    error?: string;
    analysis?: ReportAnalysis;
}> {
    const validation = ReportSchema.safeParse(data);

    if (!validation.success) {
        return { success: false, error: "Invalid data provided." };
    }

    try {
        console.log("New Incident Report:", validation.data);
        
        const analysis = await analyzeReport({
            description: validation.data.description,
            image: validation.data.image
        });
        
        console.log("AI Analysis:", analysis);
        // Here you would save the report and analysis to a database.
        
        return { success: true, analysis };
    } catch (error) {
        console.error("Report submission or analysis failed:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: `Failed to submit report. ${errorMessage}` };
    }
}
