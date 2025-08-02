import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
    title: string
    description: string
    image: string
    technologies: string[]
    demoUrl?: string
    sourceUrl?: string
}

export default function ProjectCard({
    title,
    description,
    image,
    technologies,
    demoUrl,
    sourceUrl
}: ProjectCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    {demoUrl && (
                        <Button asChild size="sm" className="flex-1">
                            <Link href={demoUrl} target="_blank">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                            </Link>
                        </Button>
                    )}
                    {sourceUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={sourceUrl} target="_blank">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                            </Link>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}