import { Button } from "@/components/ui/button";
import { cvData } from "@/cvData";
import { Mail, Phone, Github } from "lucide-react";

export default function Header() {
  const { personalInfo, introduction } = cvData;

  return (
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">
          {personalInfo.name}
        </h1>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Phone</span>
            </a>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-3 text-muted-foreground">
        {introduction.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}
