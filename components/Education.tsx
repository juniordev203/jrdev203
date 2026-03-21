"use client"

import { cvData } from "@/cvData"
import { motion } from "framer-motion"
import { Badge } from "./ui/badge"
import { MapPin, BookOpen } from "lucide-react"

export default function Education() {
  const { education } = cvData

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="education"
      className="scroll-mt-20"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-cyan/30" />
        <div className="flex items-center gap-3">
          <education.icon className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyan">{education.title}</h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-purple/30" />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="gradient-border group">
          <div className="bg-card rounded-lg p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-cyan/5 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neon-purple/5 to-transparent rounded-tr-full" />

            <div className="relative z-10 space-y-6">
              {/* University */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center"
                    >
                      <education.icon className="w-6 h-6 text-background" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">{education.university}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        Hanoi, Vietnam
                      </p>
                    </div>
                  </div>
                </div>

                <Badge className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-mono whitespace-nowrap">
                  {education.duration}
                </Badge>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Major */}
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-neon-purple" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Major</p>
                  <p className="font-semibold text-lg">{education.major}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
