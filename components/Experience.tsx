"use client"

import { cvData } from "@/cvData"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "./ui/badge"
import { ExternalLink, ChevronDown, Building2, Calendar, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Experience() {
  const { experience } = cvData
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expandedContributions, setExpandedContributions] = useState(true)

  const selectedExperience = experience.items[selectedIndex]

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="experience"
      className="scroll-mt-20"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-cyan/30" />
        <div className="flex items-center gap-3">
          <experience.icon className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyan">{experience.title}</h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-purple/30" />
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Timeline Navigation */}
        <div className="space-y-3 relative">
          {/* Vertical glowing line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan/20 via-neon-purple/20 to-transparent hidden lg:block" />

          {experience.items.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "w-full cursor-pointer text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group lg:ml-4",
                selectedIndex === index
                  ? "bg-gradient-to-r from-neon-cyan/10 to-neon-purple/5 border border-neon-cyan/30"
                  : "bg-card/50 border border-white/5 hover:border-neon-cyan/20 hover:bg-card"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Timeline dot */}
              <div className={cn(
                "absolute -left-[22px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 hidden lg:block transition-all duration-300",
                selectedIndex === index
                  ? "bg-neon-cyan border-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                  : "bg-card border-white/20 group-hover:border-neon-cyan/50"
              )} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className={cn(
                    "w-4 h-4 transition-colors",
                    selectedIndex === index ? "text-neon-cyan" : "text-muted-foreground"
                  )} />
                  <p className="font-semibold text-sm">{item.company}</p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 ml-6">{item.role}</p>
                <div className="flex items-center gap-1 mt-2 ml-6">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-mono">{item.duration}</p>
                </div>
              </div>

              {/* Active glow */}
              {selectedIndex === index && (
                <motion.div
                  layoutId="exp-glow"
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(0, 245, 255, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Experience Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="gradient-border">
              <div className="bg-card rounded-lg p-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      {selectedExperience.role}
                      {selectedExperience.link && (
                        <a
                          href={selectedExperience.link.startsWith("http") ? selectedExperience.link : `https://${selectedExperience.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="w-5 h-5 text-neon-cyan" />
                        </a>
                      )}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-neon-purple" />
                      {selectedExperience.company}
                    </p>
                  </div>
                  <Badge className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-mono">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {selectedExperience.duration}
                  </Badge>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground leading-relaxed"
                >
                  {selectedExperience.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-neon-cyan" />
                    <p className="text-sm font-semibold text-neon-cyan">Tech Stack</p>
                    <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/20 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.technologies.split(', ').map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <Badge className="bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-white/10 hover:border-neon-cyan/30 transition-all text-foreground">
                          {tech.replace('.', '')}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Contributions Accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <button
                    onClick={() => setExpandedContributions(!expandedContributions)}
                    className="flex items-center justify-between w-full group"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-neon-purple" />
                      <p className="text-sm font-semibold text-neon-purple">Key Contributions</p>
                      <div className="h-px flex-1 bg-gradient-to-r from-neon-purple/20 to-transparent" />
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-neon-purple transition-transform",
                        expandedContributions && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedContributions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-4 pl-2">
                          {selectedExperience.contributions.map((contribution, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex gap-3 group/item"
                            >
                              <div className="flex-shrink-0 mt-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple group-hover/item:shadow-[0_0_8px_rgba(0,245,255,0.5)] transition-shadow" />
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                                {contribution}
                              </p>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Timeline Dots */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {experience.items.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "bg-gradient-to-r from-neon-cyan to-neon-purple w-8 shadow-[0_0_8px_rgba(0,245,255,0.4)]"
                : "bg-white/10 w-2 hover:bg-white/20"
            )}
          />
        ))}
      </div>
    </motion.section>
  )
}
