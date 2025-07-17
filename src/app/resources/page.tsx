import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ShieldCheck, Siren } from "lucide-react";

const resources = [
  {
    title: "Campus Emergency Procedures",
    description: "Official guidelines for various emergency situations.",
    icon: Siren,
    href: "https://www.mha.gov.in/sites/default/files/2022-08/NERSGuideline_2100815%5B1%5D.pdf",
  },
  {
    title: "Silent Witness Program",
    description: "Anonymously report criminal activity.",
    icon: ShieldCheck,
    href: "https://cybercrime.gov.in/Webform/Crime_ReportAnonymously.aspx",
  },
  {
    title: "Campus Safety Escort Service",
    description: "Request a safety escort on campus after dark.",
    icon: List,
    href: "https://www.oxy.edu/offices-services/campus-safety/our-services/safety-escorts",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Safety Resources
        </h1>
        <p className="mt-2 text-muted-foreground">
          Quick links to important campus safety services and information.
        </p>
      </div>
      <div className="w-full max-w-2xl space-y-4">
        {resources.map((resource) => (
          <a key={resource.title} href={resource.href} target="_blank" rel="noopener noreferrer">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <resource.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
