import { z } from 'zod';

export const ReportAnalysisInputSchema = z.object({
  description: z.string().describe('The description of the incident report.'),
  image: z.string().optional().describe("An optional image of the incident, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ReportAnalysisInput = z.infer<typeof ReportAnalysisInputSchema>;

export const ReportAnalysisSchema = z.object({
  category: z.string().describe('Categorize the incident (e.g., Theft, Vandalism, Assault, Suspicious Activity, Other).'),
  severity: z.enum(['Low', 'Medium', 'High']).describe('Assess the severity of the incident.'),
  summary: z.string().describe('A one-sentence summary of the report.'),
});
export type ReportAnalysis = z.infer<typeof ReportAnalysisSchema>;

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export const ReportSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(500),
  image: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof ReportSchema>;
