"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

export default function Projects() {
  const { projects } = cvData

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="projects"
      className="scroll-mt-20"
    >
      <div className="flex items-center gap-3 mb-8">
        <projects.icon className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold">{projects.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.items.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:border-primary">
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <span>{project.role}</span>
                  <Badge variant="secondary">{project.duration}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>

                <div>
                  <p className="text-sm font-semibold mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(', ').map((tech, i) => (
                      <Badge key={i} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">Contributions:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.contributions.map((contribution, i) => (
                      <li key={i}>{contribution}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
