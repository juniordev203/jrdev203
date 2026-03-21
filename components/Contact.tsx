"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Github, Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react"

export default function Contact() {
  const { personalInfo } = cvData

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="contact"
      className="scroll-mt-20 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 rounded-3xl bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      <div className="relative py-16 text-center space-y-8">
        {/* Floating decorations */}
        <motion.div
          className="absolute top-8 left-8 w-20 h-20 rounded-full bg-neon-cyan/5 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-neon-purple/5 blur-xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center animate-float">
            <Sparkles className="w-8 h-8 text-background" />
          </div>
        </motion.div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-gradient-cyan">Let&apos;s Create</span>{" "}
            <span className="text-foreground">Something</span>{" "}
            <span className="text-gradient-cyan">Amazing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center items-center flex-wrap"
        >
          {/* Primary CTA */}
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold hover:opacity-90 transition-all group glow-cyan px-8"
            asChild
          >
            <a href={`mailto:${personalInfo.email}`}>
              <Mail className="w-5 h-5 mr-2" />
              Send Email
              <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all group"
            asChild
          >
            <a href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2 text-neon-cyan" />
              GitHub
              <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/10 transition-all"
            asChild
          >
            <a href={`tel:${personalInfo.phone}`}>
              <Phone className="w-5 h-5 mr-2 text-neon-purple" />
              {personalInfo.phone}
            </a>
          </Button>
        </motion.div>

        {/* Email display */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground font-mono"
        >
          or reach me at{" "}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-neon-cyan hover:underline underline-offset-4"
          >
            {personalInfo.email}
          </a>
        </motion.p>
      </div>
    </motion.section>
  )
}
