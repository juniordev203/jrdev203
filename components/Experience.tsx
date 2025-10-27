"use client"

import { cvData } from "@/cvData"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ExternalLink, ChevronDown, Building2, Calendar } from "lucide-react"
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
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="experience"
      className="scroll-mt-20"
    >
      <div className="flex items-center gap-3 mb-8">
        <experience.icon className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold">{experience.title}</h2>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Timeline Navigation */}
        <div className="space-y-2">
          {experience.items.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "w-full text-left p-4 rounded-lg transition-all duration-300 relative overflow-hidden group",
                selectedIndex === index
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm">{item.company}</p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.role}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </div>

              {/* Selection indicator */}
              {selectedIndex === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Experience Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {selectedExperience.role}
                      {selectedExperience.link && (
                        <a
                          href={selectedExperience.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </a>
                      )}
                    </CardTitle>
                    <CardDescription className="text-base flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {selectedExperience.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {selectedExperience.duration}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedExperience.description}
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                    <p className="text-sm font-semibold text-primary">Tech Stack</p>
                    <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.technologies.split(', ').map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <Badge
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tech}
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
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                      <p className="text-sm font-semibold text-primary">Key Contributions</p>
                      <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-primary transition-transform",
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
                        <ul className="space-y-3 pl-4">
                          {selectedExperience.contributions.map((contribution, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex gap-3 group/item"
                            >
                              <div className="flex-shrink-0 mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-150 transition-transform" />
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
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Timeline Dots (optional visual enhancement) */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {experience.items.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              selectedIndex === index
                ? "bg-primary w-8"
                : "bg-border hover:bg-primary/50"
            )}
          />
        ))}
      </div>
    </motion.section>
  )
}
