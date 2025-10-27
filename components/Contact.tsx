"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Github, Mail, Phone } from "lucide-react"

export default function Contact() {
  const { personalInfo } = cvData

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="contact"
      className="scroll-mt-20 text-center py-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
      </p>

      <div className="flex gap-4 justify-center items-center flex-wrap">
        <Button size="lg" asChild>
          <a href={`mailto:${personalInfo.email}`}>
            <Mail className="w-5 h-5 mr-2" />
            Send Email
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={`tel:${personalInfo.phone}`}>
            <Phone className="w-5 h-5 mr-2" />
            {personalInfo.phone}
          </a>
        </Button>
      </div>
    </motion.section>
  )
}
