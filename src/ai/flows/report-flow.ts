'use server';
/**
 * @fileOverview An AI flow to analyze incident reports.
 *
 * - analyzeReport - A function that analyzes an incident description.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { 
  type ReportAnalysisInput, 
  type ReportAnalysis, 
  ReportAnalysisInputSchema, 
  ReportAnalysisSchema 
} from '@/lib/types';


export async function analyzeReport(input: ReportAnalysisInput): Promise<ReportAnalysis> {
  if (!process.env.GCLOUD_PROJECT) {
    throw new Error('The app is missing the GCLOUD_PROJECT. Please set it in a .env.local file.');
  }
  return analyzeReportFlow(input);
}

const analyzeReportFlow = ai.defineFlow(
  {
    name: 'analyzeReportFlow',
    inputSchema: ReportAnalysisInputSchema,
    outputSchema: ReportAnalysisSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      model: 'vertexai/gemini-1.5-flash-latest',
      prompt: `Analyze the following incident report. Provide a category, severity level, and a one-sentence summary.
      
      Report: "${input.description}"
      {{#if image}}
      Image: {{media url=image}}
      {{/if}}
      `,
      output: {
        schema: ReportAnalysisSchema,
      },
      config: {
        temperature: 0.3,
      },
    });
    return output!;
  }
);
