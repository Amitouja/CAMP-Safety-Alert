import { ReportForm } from "@/components/report-form";

export default function ReportPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Report an Incident
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your report is confidential and helps us keep the campus safe.
          </p>
        </div>
        <ReportForm />
      </div>
    </div>
  );
}
