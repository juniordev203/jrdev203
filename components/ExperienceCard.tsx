import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string;
  contributions: string[];
  link?: string;
}

export default function ExperienceCard({
  company,
  role,
  duration,
  description,
  technologies,
  contributions,
  link
}: ExperienceCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{role}</CardTitle>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <Badge variant="outline" className="w-fit">{duration}</Badge>
        </div>
        <CardDescription className="text-base font-medium">{company}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div>
          <p className="text-sm font-semibold mb-2">Technologies:</p>
          <p className="text-sm text-muted-foreground">{technologies}</p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Key Contributions:</p>
          <ul className="space-y-2">
            {contributions.map((contribution, index) => (
              <li key={index} className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0">
                {contribution}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
