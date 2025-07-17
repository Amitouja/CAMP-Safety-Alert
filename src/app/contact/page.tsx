import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const contactDetails = [
    { icon: Mail, text: "dev.team@example.com", href: "mailto:dev.team@example.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: Linkedin, text: "LinkedIn Profile", href: "#" },
    { icon: Github, text: "GitHub Profile", href: "#" },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Contact Us
            </h1>
            <p className="mt-2 text-muted-foreground">
                Hi,I'm Amitouja and I'm here to help. Reach out with any questions or concerns.
            </p>
        </div>
        <Card className="w-full max-w-lg">
            <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                    <Image src="https://placehold.co/128x128.png" alt="Developer Team" data-ai-hint="team logo" width={128} height={128} />
                    <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-headline">Developer: Amitouja</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contactDetails.map((detail, index) =>(
                        <a key={index} href={detail.href} target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="outline" className="w-full justify-start h-12 text-base">
                                <detail.icon className="mr-4 h-5 w-5 text-primary" />
                                <span>{detail.text}</span>
                            </Button>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
