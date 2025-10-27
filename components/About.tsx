"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="about"
      className="scroll-mt-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        About Me
      </h2>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6 space-y-4">
          {cvData.introduction.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  )
}
