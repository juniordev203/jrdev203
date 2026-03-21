"use client"

import { cvData, skillLinks } from "@/cvData"
import { motion } from "framer-motion"
import { Badge } from "./ui/badge"

export default function Skills() {
  const { skills } = cvData

  // Define bento grid sizes for visual variety
  const bentoSizes = [
    "md:col-span-2 md:row-span-1",  // Languages - wider
    "md:col-span-2 md:row-span-1",  // Technologies - wider
    "md:col-span-2 md:row-span-1",  // UI Libraries - wider
    "md:col-span-2 md:row-span-1",  // State Management - wider
    "md:col-span-1 md:row-span-1",  // Database - small
    "md:col-span-1 md:row-span-1",  // English - small
  ]

  const accentColors = [
    { border: "from-neon-cyan to-neon-purple", text: "text-neon-cyan", bg: "bg-neon-cyan" },
    { border: "from-neon-purple to-neon-pink", text: "text-neon-purple", bg: "bg-neon-purple" },
    { border: "from-neon-pink to-[#FFD60A]", text: "text-neon-pink", bg: "bg-neon-pink" },
    { border: "from-neon-green to-neon-cyan", text: "text-neon-green", bg: "bg-neon-green" },
    { border: "from-[#FFD60A] to-neon-pink", text: "text-[#FFD60A]", bg: "bg-[#FFD60A]" },
    { border: "from-neon-cyan to-neon-green", text: "text-neon-cyan", bg: "bg-neon-cyan" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="skills"
      className="scroll-mt-20"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-cyan/30" />
        <div className="flex items-center gap-3">
          <skills.icon className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyan">{skills.title}</h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-purple/30" />
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {skills.categories.map((category, index) => {
          const Icon = category.icon
          const color = accentColors[index % accentColors.length]
          const size = bentoSizes[index % bentoSizes.length]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`${size} group`}
            >
              <div className="relative h-full rounded-xl overflow-hidden bg-card border border-white/5 hover:border-neon-cyan/30 transition-all duration-500">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.border} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Top accent line */}
                <div className={`h-[2px] bg-gradient-to-r ${color.border}`} />

                <div className="p-6 relative z-10">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.border} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-background" />
                    </motion.div>
                    <h3 className="text-lg font-bold">{category.name}</h3>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, i) => {
                      const link = skillLinks[skill]
                      const SkillBadge = (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.08, y: -2 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-white/5 hover:bg-gradient-to-r hover:from-neon-cyan/20 hover:to-neon-purple/20 border border-white/10 hover:border-neon-cyan/30 transition-all duration-300 cursor-pointer text-sm py-1.5 px-3"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      )

                      return link ? (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          {SkillBadge}
                        </a>
                      ) : (
                        SkillBadge
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
