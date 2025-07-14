import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Our Vision
          </h1>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6 text-muted-foreground text-base leading-relaxed">
            <p>
              MyCampusShield was built with a clear purpose — to protect and empower students, faculty, and staff, especially in colleges where on-campus accommodation is unavailable.
            </p>
            <p>
              In such institutions, a majority of students — particularly young girls and boys — are forced to reside in nearby private hostels, PGs, or shared rentals. These spaces, often located in loosely monitored areas, are shared with a variety of outsiders, creating an environment that can be unpredictable and, at times, unsafe.
            </p>
            <p>
              Over time, countless reports have emerged of:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Girls facing harassment or unsafe encounters on their way to or from college.
              </li>
              <li>
                Boys falling into unhealthy or dangerous influences in certain PGs or neighborhoods.
              </li>
              <li>
                Students being mentally affected, withdrawing socially, and eventually dropping out of college entirely due to continuous exposure to such risks.
              </li>
            </ul>
            <p>
              These are not isolated incidents — they represent a growing safety crisis around campuses that needs urgent attention.
            </p>
            <div className="p-6 rounded-lg bg-card border">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-3">
                <AlertTriangle className="h-7 w-7 text-primary" />
                MyCampusShield is our answer.
              </h2>
              <p>
                A smart, accessible Campus Safety Alert System designed to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                <li>
                  Let anyone report an incident instantly — from suspicious behavior to harassment or unsafe locations.
                </li>
                <li>
                  Securely store all reports in our Firebase-powered database.
                </li>
                <li>
                  Automatically forward alerts to the Designated Campus Security Officer, ensuring the right action is taken swiftly.
                </li>
              </ul>
            </div>
            <p>
              We believe that no student should ever have to choose between their education and their safety.
            </p>
            <p>
              With MyCampusShield, we aim to build a safety net that extends beyond the classroom — one where everyone on campus can thrive in security, confidence, and peace of mind.
            </p>
            <p className="font-semibold text-foreground">
              Because a campus isn’t truly complete unless it’s safe for everyone who belongs there.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
