"use client"

import { cvData } from "@/cvData"
import { Github, Mail, Phone, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const { personalInfo } = cvData

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4">
            Front-End Developer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 justify-center items-center flex-wrap"
        >
          <Button variant="outline" size="lg" asChild>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${personalInfo.email}`}>
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`tel:${personalInfo.phone}`}>
              <Phone className="w-5 h-5 mr-2" />
              Call
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-12"
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToContent}
            className="animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
