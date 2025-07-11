import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ClipboardEdit, Map, Phone } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Report an Incident",
    description: "Submit a detailed report about any safety concerns or incidents.",
    href: "/report",
    icon: <ClipboardEdit className="h-8 w-8 text-primary" />,
  },
  {
    title: "View Safety Map",
    description: "Find your current location and search for designated safe places on campus.",
    href: "/map",
    icon: <Map className="h-8 w-8 text-primary" />,
  },
  {
    title: "Contact Us",
    description: "Get in touch with the development team for support or feedback.",
    href: "/contact",
    icon: <Phone className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Your Safety, Our Priority
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          The Campus Safety Alert System helps you stay aware and report incidents to keep our community secure.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  Go to {feature.title.split(' ')[0]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
