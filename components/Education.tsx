"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

export default function Education() {
  const { education } = cvData

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="education"
      className="scroll-mt-20"
    >
      <div className="flex items-center gap-3 mb-8">
        <education.icon className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold">{education.title}</h2>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <CardTitle className="text-xl">{education.university}</CardTitle>
            <Badge variant="secondary">{education.duration}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            <span className="font-semibold">Major:</span> {education.major}
          </p>
        </CardContent>
      </Card>
    </motion.section>
  )
}
